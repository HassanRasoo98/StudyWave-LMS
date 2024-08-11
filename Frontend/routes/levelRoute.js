import express from 'express'
import {CreateLevel,GetAllLevelTitle,GetAllLevels,GetLevelById,UpdateLevel,DeleteLevel} from '../controllers/levelController.js'
const router = express.Router()
router.delete('/deletelevel/:id',DeleteLevel)
router.get('/getlevelbyid/:id',GetLevelById)
router.put('/updatelevel/:id',UpdateLevel)
router.get('/getallleveldetails',GetAllLevels)
router.post('/create-level',CreateLevel)
router.get('/getalllevels',GetAllLevelTitle)
export default router