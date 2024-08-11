import CourseModel from '../models/coursemodel.js'
export const createCourse = async(req,res)=>{
    try{
        const {coursecode,coursename,coursecategory, courselanguage,coursesubject,courselevel,courseinstructor,courseprice,courseduration,coursetages,coursedescription,courseshortdescription} = req.body;
        console.log(coursecode)
        if (!coursecode)
        {
            return res.status(400).json({ message: "Please enter course code" });

        } 
        if (!coursename)
        {
            return res.status(400).json({ message: "Please enter course name" });
        }
        if (!coursecategory)
        {
            return res.status(400).json({ message: "Please enter course category" });
        }
        if (!courselanguage)
        {
            return res.status(400).json({ message: "Please enter course language" });
        }
        // if (!coursesubject)
        // {
        //     return res.status(400).json({ message: "Please enter course subject" });
        // }
        if (!courselevel)
        {
            return res.status(400).json({ message: "Please enter course level" });
        }
        if (!courseinstructor)
        {
            return res.status(400).json({ message: "Please enter course instructor" });
        }
        if (!courseprice)
        {
            return res.status(400).json({ message: "Please enter course price" });
        }
        if (!courseduration)
        {
            return res.status(400).json({ message: "Please enter course duration" });
        }
        // if (!coursetages)
        // {
        //     return res.status(400).json({ message: "Please enter course tages" });
        // }
        if (!coursedescription)
        {
            return res.status(400).json({ message: "Please enter course description" });
        }
        // if (!courseshortdescription)
        // {
        //     return res.status(400).json({ message: "Please enter course short description" });
        // }
        
        const existingcoursecode = await CourseModel.findOne({coursecode})
        if (existingcoursecode)
        {
            return res.status(200).send({
                success:false,
                message:'Already Register Please Login'
            })
        }
        const fullcourse =  new CourseModel({coursecode,coursename,coursecategory, courselanguage,coursesubject,courselevel,courseinstructor,courseprice,courseduration,coursetages,coursedescription,courseshortdescription});
        await fullcourse.save();
        res.status(201).send({
            success:true,
            message:"Course Created Successfully",
            fullcourse:{coursecode,coursename,coursecategory, courselanguage,coursesubject,courselevel,courseinstructor,courseprice,courseduration,coursetages,coursedescription,courseshortdescription}
        })
    }catch(error)
    {
      console.log(error);
      res.status(500).json({ message: "Server error to create course" });
    }

}
export const createvideosandimages = async(req,res)=>{
    try{
        const {coursecode} = req.body;
        const existingcourse = await CourseModel.findOne({coursecode});
      
        const courseimg = req.files.courseimg ? req.files.courseimg[0].filename : '';
        const coursevideos = [];
        if (req.files && req.files.coursevideos) {
            const files = req.files.coursevideos;
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              coursevideos.push({
                title: req.body[`videotitle${i + 1}`],
                url: `${file.filename}`,
                //./media/uploads/ use this in url
              });
            }
          }
          if (!courseimg || !coursevideos.length) {
            return res.status(400).json({ message: 'Course image and videos are required' });
          }
          if (!existingcourse)
          {
              return res.status(404).json({
                  success: false,
                  message: 'Course not found',
                });
          }
          await CourseModel.updateOne({coursecode},
              {
                  $set:{courseimg,coursevideos}
              });
        res.status(200).json({
            success: true,
            message: "Course Creation Completed",
        })
    }catch(error)
    {
      console.log(error);
      res.status(500).json({ message: "Server error to create course" });
    }
}
export const getallCourses = async(req,res)=>{
    try{
        const GetAllCourses = await CourseModel.find({});
        
        res.status(201).send({
            success: true,
            message: "Api Execute Successfully",
            GetAllCourses
        })
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Invalid Api Making in Get All Courses"
        })
    }
}
export const deleteCourseById = async (req, res) => {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        res.status(404).send({
          success: false,
          message: "Course not found"
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: "Course deleted successfully"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Invalid API for deleteCourseById"
      });
    }
  };
  export const getCourseById = async(req,res)=>{
    try{
        const GetCourseById = await CourseModel.findById(req.params.id);
        res.status(201).send({
            success: true,
            message: "Api of GetCourseById is Executed Successfully",
            GetCourseById
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Invalid Api for getcoursebyid"
        })
    }
}
export const updateCourseById = async(req,res)=>{
    try{
        const updateCourse = await CourseModel.findById(req.params.id)
        if (!updateCourse)
        {
            res.status(404).send({
                success: false,
                message: "Course Not Found"
            })
        }
        const findupdateCourse = await CourseModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).send({
            success: true,
            message: "Api of UpdateCourse Executed Successfully",
            findupdateCourse
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Invalid Api for updatecoursebyid"
        })
    }
}
export const countCourse = async(req,res)=>{
    try {
        const totalCourses = await CourseModel.countDocuments();
        res.json({ totalCourses });
      } catch (error) {
        res.status(500).json({ error: 'Could not count courses' });
      }
}
export const updateFeedback = async(req,res)=>{
    try{
        const courseId = req.params.courseId;
        const { rating, comment } = req.body;
    
        // Find the course by its ID
        const course = await CourseModel.findById(courseId);
    
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
    
        // Create a new feedback object
        const feedback = {
          rating: rating,
          comment: comment,
        };
    
        // Add the feedback to the course's feedback array
        course.coursefeedback.push(feedback);
    
        // Save the updated course with the new feedback
        await course.save();
    
        res.json({ message: 'Feedback updated successfully' });
    }catch(error)
    {
        res.status(500).json({ error: 'Failed to update feedback' });

    }
}