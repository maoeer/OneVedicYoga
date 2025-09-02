import { config } from './config/index'
import express, { Express } from "express"
import cors from 'cors'
import apiRouter from './routes'


// 创建 Express 应用
const app: Express = express()

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由：统一基础路径 /api
app.use(config.apiBaseUrl, apiRouter)

// 启动服务器
app.listen(config.port, () => {
  console.log(`服务器启动于 http://localhost:${config.port}`)
})