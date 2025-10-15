import nodemailer from 'nodemailer';
import redisClient from "./redis-client";
import { randomInt } from 'crypto';
import { config } from 'dotenv';
import { error } from 'console';

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
 * @returns {Promise<{
 *  isSuccess: boolean, 
 *  message: string
 * }>} 是否发送成功
 */
export async function sendAndStoreCode(email: string): Promise<{
  isSuccess: boolean,
  message: string
}> {
  // 存储到Redis的key  
  const redisKey = `${REDIS_KEY}${email}`;

  try {
    // 生成验证码
    const code = generateCode();

    // 存储验证码到Redis
    const setResult = await redisClient.set(redisKey, code, {
      EX: CODE_EXPIRE, // 过期时间（秒）
      NX: true         // 仅key不存在时才存储
    });
    if (!setResult) {
      throw new Error('请勿反复获取验证码, 5分钟后尝试');
    }

    const isSent = await sendVerificationCode(email, code);
    if (!isSent) {
      // 邮件发送失败：删除已存储的验证码（允许用户重试）
      await redisClient.del(redisKey);
      throw new Error('邮件发送失败, 请检查邮箱是否有效');
    }

    return {
      isSuccess: true,
      message: '发送成功, 验证码5分钟内有效'
    };
  } catch (err) {
    // 异常时删除可能残留的验证码（避免死锁）
    await redisClient.del(redisKey);

    // 异常时返回错误消息
    const message = err instanceof Error ? err.message : '服务器出错';
    return {
      isSuccess: false,
      message
    }
  }
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
