import { Router } from 'express'

const router = Router()

router.get('/', (req, resp) => {
  const body = req.body
  console.log(body)
  resp.json({
    message: 'user api success!'
  })
})

export default router