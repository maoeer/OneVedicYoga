import { Router } from 'express'

const router = Router()

router.get('/', (req, resp) => {
  resp.json({
    message: 'test success!'
  })
})

export default router