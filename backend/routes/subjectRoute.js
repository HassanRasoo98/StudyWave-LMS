import express from 'express'
import {CreateSubject,GetAllSubjectTitle,GetAllSubject,DeleteSubject,GetSubjectById,UpdateCategory  } from '../controllers/subjectController.js'
const router = express.Router()
router.get('/getallSubjectdetails',GetAllSubject)
router.put('/updatesubject/:id',UpdateCategory )
router.get('/getsubjectbyid/:id',GetSubjectById )
router.delete('/deletesubject/:id',DeleteSubject)
router.post('/create-subject',CreateSubject);
router.get('/getallSubjects',GetAllSubjectTitle)
export default router
