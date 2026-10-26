import 'dotenv/config'; // Memicu pembacaan file .env
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeWorkflow } from './workflowEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Menyajikan file statis UI dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint API untuk menjalankan workflow dari UI Canvas
app.post('/api/workflow/execute', async (req, res) => {
  try {
    const workflow = req.body;
    const result = await executeWorkflow(workflow);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server n8n AI-Agent running at http://localhost:${PORT}`);
});