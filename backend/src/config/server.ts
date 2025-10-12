import { config } from 'dotenv';

config();

export const serverConfig = {
  // 确保端口为数字
  port: process.env.PORT ?? 3000,
  apiBaseUrl: process.env.API_BASE_URL ?? '/api'
}