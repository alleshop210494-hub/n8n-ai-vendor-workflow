import dotenv from 'dotenv';
dotenv.config();

import { executeWorkflow } from './workflowEngine.js';

// Simulasi struktur JSON Workflow (seperti yang dikirim oleh UI Drag-and-Drop nantinya)
const sampleWorkflow = {
  name: "Monitoring Kontrak Vendor Otomatis",
  nodes: [
    {
      id: "node_1",
      type: "trigger-cron",
      label: "Pemicu Jadwal Harian"
    },
    {
      id: "node_2",
      type: "google-sheets-read",
      label: "Ambil Data Kontrak Vendor"
    },
    {
      id: "node_3",
      type: "ai-contract-analyzer",
      label: "Analisis AI Gemini (Threshold 30 Hari)",
      config: {
        thresholdDays: 30
      }
    },
    {
      id: "node_4",
      type: "notification-sender",
      label: "Kirim Notifikasi / Email Draft"
    }
  ]
};

async function runTest() {
  console.log("🚀 Memulai simulasi uji coba Workflow Engine...\n");
  try {
    const result = await executeWorkflow(sampleWorkflow);
    console.log("\n✅ Simulasi Workflow Berhasil Dieksekusi!");
    console.log("Hasil Akhir:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("\n❌ Gagal menjalankan workflow:", error.message);
  }
}

runTest();