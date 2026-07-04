import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { contactRouter } from './routes/contact.ts';
import { applicationsRouter } from './routes/applications.ts';
import { teamRouter } from './routes/team.ts';
import { requestLogger, securityHeaders } from './middleware/security.ts';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT) || 3001;
const isProd = process.env.NODE_ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('trust proxy', 1);
app.use(securityHeaders);
app.use(requestLogger);
app.use(express.json({ limit: '2mb' }));
app.use('/api', contactRouter);
app.use('/api', applicationsRouter);
app.use('/api', teamRouter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

if (isProd) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath, { maxAge: '1d', etag: true }));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
