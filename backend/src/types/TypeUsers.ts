import { Request } from 'express';
import { RowDataPacket } from 'mysql2/promise';

// 定义用户表结构（与数据库字段对应）
export interface User extends RowDataPacket {
  id: number;
  username?: string;
  email: string;
  password: string; // 存储的是加密后的哈希，不是明文
}

// 登录请求类型
export interface LoginReq extends Request {
  body: {
    email: string;
    password: string;
  }
}

// 登录响应类型
export interface LoginResponse {
  message?: string;
  user?: Omit<User, 'password'>; // 排除密码字段
}