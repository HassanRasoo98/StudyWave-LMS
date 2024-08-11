import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home/Home';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import ProfileComplete from './components/ProfileComplete/ProfileComplete.js';
import AdminRoute from '../src/components/Route/AdminRoute.js';
import { useNavigate, useParams } from 'react-router-dom';
import PrivateRoute from '../src/components/Route/Private.js';
import AdminPage from './components/AdminComponents/AdminPage/AdminPage.js';
import UserPage from './components/UserComponents/UserPage/UserPage.js';
import AddCourse from './components/AdminComponents/AddCourse/AddCourse.js';
import AddCategory from './components/AdminComponents/AddCategory/AddCategory.js';
import AddSubject from './components/AdminComponents/AddSubject/AddSubject.js';
import AddTag from './components/AdminComponents/AddTag/AddTag.js';
import AddLevel from './components/AdminComponents/AddLevel/AddLevel.js';
import MediaAndImages from './components/AdminComponents/AddCourse/MediaAndImages.js';
import Courselist from './components/AdminComponents/Courselist/Courselist.js';
import UpdateCourse from './components/AdminComponents/AddCourse/UpdateCourse.js';
import Categorylist from './components/AdminComponents/Categorylist/Categorylist.js';
import UpdateCategory from './components/AdminComponents/Categorylist/UpdateCategory.js';
import Subjectlist from './components/AdminComponents/Subjectlist/Subjectlist.js';
import UpdateSubject from './components/AdminComponents/Subjectlist/UpdateSubject.js';
import TagList from './components/AdminComponents/TagsList/TagList.js';
import UpdateTag from './components/AdminComponents/TagsList/UpdateTag.js';
import LevelList from './components/AdminComponents/LevelList/LevelList.js';
import UpdateLevel from './components/AdminComponents/LevelList/UpdateLevel.js';
import AddTest from './components/AdminComponents/AddTest/AddTest.js';
import TestList from './components/AdminComponents/AddTest/TestList.js';
import ViewTest from './components/AdminComponents/AddTest/ViewTest.js';
import UpdateTest from './components/AdminComponents/AddTest/UpdateTest.js';
import UserBaseExam from './components/UserComponents/UserBaseExam/UserBaseExam.js';
import CourseCatalogue from './components/UserComponents/CourseCatalogue/CourseCatalogue.js';
import Whishlist from './components/UserComponents/Whishlist/Whishlist.js';
import AddToCart from './components/UserComponents/AddToCart/AddToCart.js';
import Success from './components/UserComponents/Success/Success.js';
import Cancel from './components/UserComponents/Cancel/Cancel.js';
import MyCourses from './components/UserComponents/MyCourses/MyCourses.js';
import ViewCourse from './components/UserComponents/MyCourses/ViewCourse.js';
import ViewCourseContent from './components/UserComponents/MyCourses/ViewCourseContent.js';
import ETest from './components/AdminComponents/ETest/ETest.js'
import PageDetail from './components/HomePage/PageDetail/PageDetail.js';
import VideoUpload from './components/UserComponents/MyCourses/transcript.js';
function App() {
  return <>
   <BrowserRouter>
  <Routes>
  <Route path="/" element={ <Home/>}/>
  <Route path="/login" element={<Login />} />
  <Route path="/Signup" element={<Signup/>}/>
  <Route path="/profilecompletion/:email/:password/:name" element={<ProfileComplete />} />
  <Route path="/test/:email" element={<UserBaseExam/>}/>
  <Route path="/user-dashboard" element={<PrivateRoute/>}>
  <Route path="" element={<UserPage />} />
  <Route path="/user-dashboard/coursecatalogue" element={<CourseCatalogue/>}/>
  <Route path="/user-dashboard/whishlist" element={<Whishlist/>}/>
  <Route path = "/user-dashboard/add-to-cart" element={<AddToCart/>}/>
  <Route path='/user-dashboard/success' element={<Success/>}/>
  <Route path='/user-dashboard/cancel' element={<Cancel/>}/>
  <Route path = '/user-dashboard/mycourses' element={<MyCourses/>}/>
  <Route path = '/user-dashboard/viewcourse/:courseId'element={<ViewCourse/>}/>
  <Route path = '/user-dashboard/viewcourse/content/:courseId' element={<ViewCourseContent/>}/>
  </Route>
  <Route path="/admin-dashboard" element={<AdminRoute/>}>
  <Route path="" element={<AdminPage />} />
  <Route path="/admin-dashboard/add-course" element={<AddCourse/>}/>
  <Route path="/admin-dashboard/add-category" element={<AddCategory/>}/>
  <Route path="/admin-dashboard/add-subject" element={<AddSubject/>}/>
  <Route path="/admin-dashboard/add-tags" element={<AddTag/>}/>
  <Route path="/admin-dashboard/add-level" element={<AddLevel/>}/>
  <Route path="/admin-dashboard/media-images/:coursecode" element={<MediaAndImages/>}/>
  <Route path="/admin-dashboard/courselist" element={<Courselist/>}/>
  <Route path="/admin-dashboard/courselist/:courseId" element={<UpdateCourse/>}/>
  <Route path="/admin-dashboard/categorylist" element={<Categorylist/>}/>
  <Route path="/admin-dashboard/updatecategorylist/:categoryId" element={<UpdateCategory/>}/>  
  <Route path='/admin-dashboard/subjectlist' element={<Subjectlist/>}/>
  <Route path = "/admin-dashboard/updatesubjectlist/:subjectId" element={<UpdateSubject/>}/>
  <Route path = "/admin-dashboard/taglist" element={<TagList/>}/>
  <Route path = "/admin-dashboard/updatetaglist/:tagId" element={<UpdateTag/>}/>
  <Route path="/admin-dashboard/levellist" element={<LevelList/>}/>
  <Route path = "/admin-dashboard/updatelevellist/:levelId" element={<UpdateLevel/>}/>
  <Route path = "/admin-dashboard/addtest" element={<AddTest/>}/>
  <Route path='/admin-dashboard/test-list' element={<TestList/>}/>
  <Route path='/admin-dashboard/test-list/:id' element={<ViewTest/>}/>
  <Route path = '/admin-dashboard/update-test/:id' element={<UpdateTest/>}/>
  <Route path = '/admin-dashboard/E-Test' element = {<ETest/>}/>
  </Route>

  <Route path = '/upload' element = {<VideoUpload/>}/>
  </Routes>
  </BrowserRouter>
   
 
  </>
}

export default App;
