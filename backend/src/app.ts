import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';

const app = express();

app.use(
  cors({
    origin: 'https://service-hive-assignment-client.vercel.app',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'ServiceHive API Running 🚀',
  });
});

export default app;
