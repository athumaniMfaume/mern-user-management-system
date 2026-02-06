import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------- Middleware --------------------
app.use(express.json());
app.use(cookieParser());

// ✅ FIX CORS: Allow Render URL and Local Dev
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://mern-user-management-system.onrender.com'
  ],
  credentials: true,
}));

// -------------------- API Routes --------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// -------------------- Connect Database --------------------
connectDB();

// -------------------- Serve React Frontend --------------------
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // ✅ FIX PathError: Express 5 requires named parameters for wildcards
  app.get('/:any*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

