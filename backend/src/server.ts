import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from '@/routes/productRoutes';
import categoryRoutes from '@/routes/categoryRoutes';
import rfqRoutes from '@/routes/rfqRoutes';
import authRoutes from '@/routes/authRoutes';
import adminProductRoutes from '@/routes/adminProductRoutes';
import adminCategoryRoutes from '@/routes/adminCategoryRoutes';
import adminDashboardRoutes from '@/routes/adminDashboardRoutes';
import adminRfqRoutes from '@/routes/adminRfqRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check Route
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Ghulam Safety Hub API Server is operational',
    timestamp: new Date().toISOString(),
  });
});

// Module B.1 Routes
app.use('/api/v1/products', productRoutes);

// Module B.2 Routes
app.use('/api/v1/categories', categoryRoutes);

// Module B.3 Routes
app.use('/api/v1/rfq', rfqRoutes);

// Module B.5 Routes
app.use('/api/v1/admin/auth', authRoutes);

// Module B.6 & Production Admin Management Routes
app.use('/api/v1/admin/products', adminProductRoutes);
app.use('/api/v1/admin/categories', adminCategoryRoutes);
app.use('/api/v1/admin/dashboard', adminDashboardRoutes);
app.use('/api/v1/admin/rfqs', adminRfqRoutes);

// Centralized Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Error]:', err.message || err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});

// Start Server in dev or test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server]: Ghulam Safety Hub API running on port ${PORT}`);
  });
}

export default app;
