import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // 确保端口为数字
  port: process.env.PORT ?? 3000,
  apiBaseUrl: process.env.API_BASE_URL ?? '/api'
}