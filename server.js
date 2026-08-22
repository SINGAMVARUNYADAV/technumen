import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 5000);
const dataDir = path.join(__dirname, 'data');
const applicationsFile = path.join(dataDir, 'applications.json');

app.use(express.json({ limit: '1mb' }));

async function readApplications() {
  try {
    return JSON.parse(await fs.readFile(applicationsFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'technumen-careers-api' });
});

app.post('/api/applications', async (req, res) => {
  const { jobTitle, firstName, lastName, email, phone, linkedin = '', resumeName = '' } = req.body;
  if (!jobTitle || !firstName || !lastName || !email || !phone || !resumeName) {
    return res.status(400).json({ error: 'Job title, name, email, phone, and resume are required.' });
  }

  const applications = await readApplications();
  const application = {
    id: crypto.randomUUID(),
    jobTitle,
    firstName,
    lastName,
    email,
    phone,
    linkedin,
    resumeName,
    submittedAt: new Date().toISOString(),
  };
  applications.push(application);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(applicationsFile, JSON.stringify(applications, null, 2));
  res.status(201).json({ ok: true, applicationId: application.id });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Technumen API listening on port ${port}`);
});