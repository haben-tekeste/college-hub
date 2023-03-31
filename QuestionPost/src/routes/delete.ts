import express from 'express'

const router = express.Router()

router.delete('/api/questions/:questionId')

export {router as deleteQuestionRouter}