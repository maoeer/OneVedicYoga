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
