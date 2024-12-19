import express from 'express'
import { registerController,updateProfileController,countEnrolledCoursesByEmail,UpdateScoreLabel,getEnrolledCourses,loginController,testController,getAllUsers,createUser,DeleteUsers,GetUserByEmail } from '../controllers/authController.js'
import { requireSignIn,isAdmin  } from '../middlewears/authMiddleWear.js';

// below I router objects
const router = express.Router()
router.post('/create',createUser)
router.delete('/deleteuser/:userId',DeleteUsers)
router.post('/register',registerController)
router.get('/getall',getAllUsers)
router.get('/getuserbyid/:email',requireSignIn,GetUserByEmail)
router.post('/profile',updateProfileController)
router.post('/updatescoreandlabel',UpdateScoreLabel)
router.post('/login',loginController)
router.post('/test',requireSignIn,isAdmin,testController)
router.get('/enrolled-course/:userEmail',getEnrolledCourses)
router.get('/countenrolled/:email',countEnrolledCoursesByEmail)
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
// protected route auth admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
export default router
