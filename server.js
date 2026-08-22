import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 5000);
const dataDir = path.join(__dirname, 'data');
const applicationsFile = path.join(dataDir, 'applications.json');

app.use(express.json({ limit: '1mb' }));
const sessionSecret = process.env.SESSION_SECRET || 'development-only-session-secret';
const adminPassword = process.env.ADMIN_PASSWORD;

function adminToken() {
  return crypto.createHmac('sha256', sessionSecret).update(adminPassword || '').digest('hex');
}

function requireAdmin(req, res, next) {
  const supplied = req.headers.authorization?.replace('Bearer ', '') || req.headers.cookie?.match(/admin_session=([^;]+)/)?.[1];
  if (!adminPassword || !supplied || supplied.length !== adminToken().length ||
      !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(adminToken()))) {
    return res.status(401).json({ error: 'Admin authentication required.' });
  }
  next();
}

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
    status: 'New',
  };
  applications.push(application);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(applicationsFile, JSON.stringify(applications, null, 2));
  res.status(201).json({ ok: true, applicationId: application.id });
});

app.post('/api/admin/login', (req, res) => {
  if (!adminPassword) return res.status(503).json({ error: 'Admin access is not configured.' });
  const supplied = String(req.body?.password || '');
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(adminPassword);
  const valid = suppliedBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(suppliedBuffer, expectedBuffer);
  if (!valid) return res.status(401).json({ error: 'Incorrect password.' });
  res.cookie('admin_session', adminToken(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
  });
  res.json({ ok: true });
});

app.post('/api/admin/logout', (_req, res) => {
  res.clearCookie('admin_session');
  res.json({ ok: true });
});

app.get('/api/admin/applications', requireAdmin, async (_req, res) => {
  const applications = await readApplications();
  res.json(applications.map((application) => ({ ...application, status: application.status || 'New' })));
});

app.patch('/api/admin/applications/:id', requireAdmin, async (req, res) => {
  const allowedStatuses = ['New', 'Reviewing', 'Interview', 'Hired', 'Rejected'];
  if (!allowedStatuses.includes(req.body?.status)) {
    return res.status(400).json({ error: 'Invalid application status.' });
  }
  const applications = await readApplications();
  const index = applications.findIndex((application) => application.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Application not found.' });
  applications[index].status = req.body.status;
  await fs.writeFile(applicationsFile, JSON.stringify(applications, null, 2));
  res.json(applications[index]);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Technumen API listening on port ${port}`);
});