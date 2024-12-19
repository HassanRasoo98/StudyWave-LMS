import express from 'express'
import {CreateTest,GetQuiz,UpdateQuiz,GetallQuiz,DeleteQuiz } from '../controllers/basetestController.js'
const router = express.Router()
router.post('/createtest',CreateTest)
router.get('/gettest/:id',GetQuiz )
router.put('/updatequiz/:id',UpdateQuiz)
router.get('/getallquiz',GetallQuiz)
router.delete('/deletequiz/:id',DeleteQuiz)
export default router;