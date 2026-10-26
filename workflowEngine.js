import { getVendorContracts } from './sheetsService.js';
import { analyzeExpiringContracts } from './agentService.js';
import { sendVendorEmailNotifications } from './notificationService.js';

export async function executeWorkflow(workflow) {
  console.log(`[Workflow Engine] Memulai eksekusi alur: ${workflow.name}`);

  let currentData = null;

  for (const node of workflow.nodes) {
    console.log(`[Executing Node]: ${node.name} (${node.type})`);

    switch (node.type) {
      case 'trigger-cron':
        // Simulasi pemicu waktu
        currentData = { triggeredAt: new Date().toISOString() };
        break;

      case 'google-sheets-read':
      case 'data-normalizer':
        // Membaca data dari Google Sheets publik
        currentData = await getVendorContracts();
        break;

      case 'ai-contract-analyzer':
        // Menganalisis kontrak menggunakan AI Gemini
        currentData = await analyzeExpiringContracts(currentData, 30);
        break;

      case 'risk-filter':
        // Menyaring kontrak yang masuk kategori kritikal/warning
        currentData = currentData.filter(v => v.urgency === 'CRITICAL' || v.urgency === 'WARNING');
        break;

      case 'notification-sender':
        // Mengirim email nyata ke alleshop210494@gmail.com
        console.log('📬 Menyiapkan pengiriman notifikasi email...');
        const emailResult = await sendVendorEmailNotifications(currentData);
        currentData = {
          notificationStatus: emailResult,
          analyzedContracts: currentData
        };
        break;

      default:
        console.warn(`⚠️ Tipe node tidak dikenal: ${node.type}`);
    }
  }

  return {
    status: 'SUCCESS',
    executedAt: new Date().toISOString(),
    result: currentData
  };
}