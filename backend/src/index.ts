import { serverConfig } from './config/server'
import express, { Express } from "express"
import cors from 'cors'
import routes from './routes'

// 创建 Express 应用
const app: Express = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use(serverConfig.apiBaseUrl, routes);

// 启动服务器
app.listen(serverConfig.port, () => {
  console.log(`服务器启动于 http://localhost:${serverConfig.port}`);
});