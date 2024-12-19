import express from 'express'
import {getShuffledQuestions} from '../controllers/userTest.js'
const router = express.Router()
router.get('/getshuffled',getShuffledQuestions);
export default router;