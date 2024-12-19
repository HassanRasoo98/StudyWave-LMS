import express from 'express'
import {CreateCategory,GetAllCategoryTitle,DeleteCategory,GetAllCategory,UpdateCategory,GetCategoryById} from '../controllers/categoryController.js'
const router = express.Router()
router.get('/getbyspecific/:id',GetCategoryById)
router.put('/update-category/:id',UpdateCategory)
router.delete('/delete-category/:id',DeleteCategory)
router.post('/create-category',CreateCategory)
router.get('/getcategory',GetAllCategoryTitle)
router.get('/getallcategory',GetAllCategory)
export default router