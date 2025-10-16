import { Request } from 'express';
import { RowDataPacket } from 'mysql2/promise';

// 定义用户表结构（与数据库字段对应）
export interface User extends RowDataPacket {
  id: number;
  email: string;
  username?: string;
  password?: string; // 存储的是加密后的哈希，不是明文
}

// 登录请求类型
export interface LoginReq extends Request {
  body: {
    email: string;
    password: string;
  }
}

// 注册请求类型
export interface RegisterReq extends Request {
  body: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  }
}

// 定义状态码枚举
export enum ResponseCode {
  SUCCESS = 200, // 成功
  BAD_REQUEST = 400, // 客户端参数错误
  SERVER_ERROR = 500, // 服务器错误
}

// 基础响应类型
export interface ApiResponse<T = unknown> {
  code?: ResponseCode;
  message?: string;
  data?: T;
}



