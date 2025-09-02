import { Router } from 'express'
import userRouter from './user'


const apiRouter = Router()

// 健康检查
apiRouter.get('/', (req, resp) => {
  resp.json({
    message: 'test success!'
  })
})

// 业务路由聚合：/api/user
apiRouter.use('/user', userRouter)

export default apiRouter