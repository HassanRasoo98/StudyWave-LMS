import express from 'express'
import {upload} from '../middlewears/courseMiddleWear.js'
import {createCourse,createvideosandimages,updateFeedback,getallCourses,deleteCourseById,getCourseById,updateCourseById,countCourse} from '../controllers/courseController.js'
import { requireSignIn,isAdmin  } from '../middlewears/authMiddleWear.js';
const router = express.Router()
router.post('/createcourse',requireSignIn,isAdmin,createCourse);
router.get('/getall',requireSignIn,getallCourses)
router.delete('/deletecourse/:id',requireSignIn,isAdmin,deleteCourseById)
router.get('/getcoursebyid/:id',getCourseById);
router.put('/updatecoursebyid/:id',requireSignIn,isAdmin,updateCourseById);
router.get('/countcourse',countCourse)
router.put('/feedbackcourses/:courseId',updateFeedback)
router.post('/coursedata',upload.fields([{ name: 'courseimg' }, { name: 'coursevideos' }]),createvideosandimages);
export default router;