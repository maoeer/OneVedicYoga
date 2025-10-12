import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3306,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? '',
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 测试链接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Mysql数据库连接成功');
    connection.release();
  } catch (err) {
    console.error('数据库连接失败:', err);
  }
}
testConnection();

export default pool;
