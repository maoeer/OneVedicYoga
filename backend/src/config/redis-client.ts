import { createClient } from 'redis';
import { config } from 'dotenv';

// 加载环境变量
config();

// 连接Redis
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

// 错误处理
redisClient.on('error', (err) => {
  console.error('Redis 连接错误: ', err);
});

// 连接Redis
async function testConnection() {
  await redisClient.connect();
  console.log('Redis数据库连接成功');
}
testConnection();

export default redisClient;
