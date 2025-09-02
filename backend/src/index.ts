import { config } from './config'
import express, { Express } from "express"
import cors from 'cors'
import routes from './routes'


// 创建 Express 应用
const app: Express = express()

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由
app.use(config.apiBaseUrl, routes)

// 启动服务器
app.listen(config.port, () => {
  console.log(`服务器启动于 http://localhost:${config.port}`)
})