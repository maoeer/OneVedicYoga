import { Router } from 'express';
import { Response } from 'express';
import { User, LoginReq, LoginResponse } from '../types/TypeUsers';
import bcrypt from 'bcryptjs';
import pool from '../config/db';

const router = Router();

/**
 * 登录接口
 * @param req - 登录请求体，包含邮箱和密码
 * @param resp - 登录响应体，包含错误信息或用户信息
 */
router.post('/login', async (req: LoginReq, resp: Response<LoginResponse>) => {
  try {
    const { email, password } = req.body;
    // 校验邮箱和密码
    validateLoginParams(email, password);

    // 查询用户
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error('邮箱或密码错误');
    }

    // 校验密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('邮箱或密码错误');
    }

    // 登录成功
    resp.json({
      user: {
        id: user.id,
        username: user.username || '用户',
        email: user.email,
      }
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : '服务器出错';
    resp.json({ errMsg });
  }
});

/**
 * 校验登录参数
 * @param email - 用户邮箱
 * @param password - 用户密码
 */
function validateLoginParams(email: string, password: string) {
  const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  if (!email || !password) {
    throw new Error('邮箱或密码不能为空');
  } else if (!emailReg.test(email)) {
    throw new Error('邮箱格式错误');
  } else if (password.length < 6) {
    throw new Error('密码长度不能小于6位');
  }
}

/**
 * 根据邮箱查询用户
 * @param email - 用户邮箱
 * @returns 用户信息或null
 */
async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<User[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
}

export default router