export async function sendVendorEmailNotifications(analysisResults) {
    const targetEmail = 'alleshop210494@gmail.com';
    console.log(`[Notification Service] Mode Simulasi Cerdas Aktif untuk: ${targetEmail}`);
  
    const sentLogs = [];
  
    for (const item of analysisResults) {
      const emailContent = {
        to: targetEmail,
        subject: `[${item.urgency}] Pengingat Kontrak Vendor: ${item.name}`,
        body: `Halo Admin Procurement,\n\nSistem automasi mendeteksi kontrak vendor berikut memerlukan perhatian:\n\n` +
              `- Nama Vendor: ${item.name}\n` +
              `- Layanan: ${item.service}\n` +
              `- Tanggal Berakhir: ${item.endDate} (${item.daysRemaining} hari lagi)\n` +
              `- Tingkat Urgensi: ${item.urgency}\n\n` +
              `Rekomendasi Tindakan:\n${item.recommendedAction}\n\n` +
              `--- Draf Email ke Vendor ---\n${item.emailDraft}\n\n` +
              `Salam,\nn8n AI Workflow Automation Engine`
      };
  
      // Menampilkan simulasi pengiriman email secara rapi di terminal
      console.log(`\n----------------------------------------`);
      console.log(`📧 [SIMULASI PENGIRIMAN BERHASIL KE: ${targetEmail}]`);
      console.log(`Subject: ${emailContent.subject}`);
      console.log(`Isi Pesan:\n${emailContent.body}`);
      console.log(`----------------------------------------\n`);
  
      sentLogs.push({
        vendor: item.name,
        recipient: targetEmail,
        status: 'SUCCESS (Simulation Mode)',
        timestamp: new Date().toISOString()
      });
    }
  
    return {
      success: true,
      mode: 'smart-simulation',
      targetEmail: targetEmail,
      logs: sentLogs
    };
  }