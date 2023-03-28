import express from 'express'
import { body } from 'express-validator'
import { NotAuthorizedError } from '@hthub/common'

const router = express.Router()

router.delete('/api/answers/:answerId')


export {router as deleteAnswerRouter}