import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER || 'bulk@ghulamsafety.com',
    pass: process.env.SMTP_PASS || '',
  },
});
