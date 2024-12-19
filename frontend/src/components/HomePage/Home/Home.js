import React, { useRef } from 'react'
import Header from '../Header/Header.js'
import LandingPage from '../LandingPage/LandingPage.js'
import CoursePage from '../CoursesPage/CoursePage.js'
import PageDetail from '../PageDetail/PageDetail.js'

import Contactus from '../ContactUs/Contactus.js'
const Home = () => {

  const coursePageRef = useRef(null);
  const pageDetailRef = useRef(null);

  const scrollToCoursePage = () => {
    coursePageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  
  const scrollToPageDetails = () => {
    pageDetailRef.current.scrollIntoView({behavior: 'smooth'});
  };

  return <>
   <Header scrollToCoursePage={scrollToCoursePage} scrollToPageDetails={scrollToPageDetails}/>
  <LandingPage/>
  <CoursePage ref={coursePageRef} />
  <PageDetail ref={pageDetailRef}/>
  
  <Contactus/>
  </>
}

export default Home