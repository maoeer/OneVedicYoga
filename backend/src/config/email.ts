import nodemailer from 'nodemailer';
import redisClient from "./redis-client";
import { randomInt } from 'crypto';
import { config } from 'dotenv';

config();

// 验证码过期时间（5分钟）
const CODE_EXPIRE = 5 * 60;
// Redis前缀
const REDIS_KEY = 'code:';

// 配置邮件 transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ?? 'smtp.qq.com',
  port: Number(process.env.EMAIL_PORT) ?? 465,
  secure: Boolean(process.env.EMAIL_SECURE === 'true') ?? true,
  auth: {
    user: process.env.EMAIL_USER ?? '', // 发送者邮箱
    pass: process.env.EMAIL_PASS ?? ''  // 邮箱SMTP授权码
  }
})

/**
 * 发送验证码邮件
 * @param email 接收验证码的邮箱
 * @param code 验证码
 * @returns {Promise<boolean>} 是否发送成功
 */
async function sendVerificationCode(email: string, code: string): Promise<boolean> {
  const mailOptions = {
    from: `注册验证码 <${process.env.EMAIL_USER || ''}>`,
    to: email,
    subject: '您的验证码',
    html: `
      <p>您的验证码为：${code}</p>
      <p>有效期为5分钟</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('邮件发送失败:', err);
    return false;
  }
}

/**
 * 生成6位随机验证码
 * @returns {string} 验证码
 */
function generateCode(): string {
  return randomInt(100000, 999999).toString();
}

/**
 * 发送验证码邮件并存储到Redis
 * @param email 接收验证码的邮箱
 * @returns {Promise<boolean>} 是否发送成功
 */
export async function sendAndStroeCode(email: string): Promise<boolean> {
  // 生成验证码
  const code = generateCode();

  // 发送邮件
  const isSent = await sendVerificationCode(email, code);
  if (!isSent) {
    return false;
  }

  // 存储到Redis
  const redisKey = `${REDIS_KEY}${email}`;
  await redisClient.setEx(redisKey, CODE_EXPIRE, code);

  return true;
}

/**
 * 验证验证码是否正确
 * @param email 接收验证码的邮箱
 * @param code 验证码
 * @returns {Promise<boolean>} 是否验证成功
 */
export async function verifyCode(email: string, code: string): Promise<boolean> {
  const redisKey = `${REDIS_KEY}${email}`;

  // 从Redis获取验证码
  const storeCode = await redisClient.get(redisKey);

  // 校验验证码
  if (storeCode && storeCode === code) {
    // 验证成功删除验证码
    await redisClient.del(redisKey);
    return true;
  }

  return false;
}
