import { Router } from 'express'
import userRouter from './user'


const apiRouter = Router()

// 业务路由聚合：/api/user
apiRouter.use('/user', userRouter)

export default apiRouter