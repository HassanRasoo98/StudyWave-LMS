import userModel from "../models/usermodel.js";
import { hashPassword,comparePassword } from "../helpers/authHelper.js"
import JWT from 'jsonwebtoken'
export const DeleteUsers = async(req,res)=>{
    const { userId } = req.params;
    try{
       const deletedUser = await userModel.findByIdAndDelete(userId);
       if(!deletedUser)
       {
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
       }
       res.status(200).send({
        success:true,
        message:"User Deleted Successfully",
        deletedUser
       })
        
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Deleting user",
            error
        })

    }
}
export const createUser = async(req,res)=>{
    try{
        const {name,email,password,phone} = new userModel(req.body);
        if (!name)
        {
            return res.send({message:'Name is required'})
        }
        if (!email)
        {
            return res.send({message:'Email is required'})
        }
        if (!password)
        {
            return res.send({message:'Password is required'})
        }
        if (!phone)
        {
            return res.send({message:'Phone is required'})
        }
        const existingUser = await userModel.findOne({email})
        if (existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Already Register Please Login'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = new userModel({name,email,phone,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message: 'User Created Successfully',
            user:{name,email,password,phone}
        });
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating user",
            error
        })
    }
}
export const getAllUsers = async(req,res)=>{
    try{
        const user = await userModel.find({ role: 0 });
        res.status(201).send({
            success:true,
            message: 'All user get Successfully',
            user
        });

    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting All User',
            error
        })
    }
}
export const registerController  = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        //Validation
        if (!name)
        {
            return res.send({message:'Name is required'})
        }
        if (!email)
        {
            return res.send({message:'Email is required'})
        }
        if (!password)
        {
            return res.send({message:'Password is required'})
        }
       
        //existing user
        const existingUser = await userModel.findOne({email})
        if (existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Already Register Please Login'
            })
        }

        //registered a user
        const hashedPassword = await hashPassword(password)
        //save
        const user = new userModel({name,email,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message: 'User Register Successfully',
            user:{name,email,password}
        });
        
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error
        })
    }
}


export const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body
        //validation
        if (!email||!password)
        {
            return res.status(404).send({
                success:false,
                message:"Invalid Credientials"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if (!user)
        {
            return res.status(400).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if (!match)
        {
            return res.status(400).send({
                success:false,
                message: "Invalid Password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
            },
            token,
        });
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}
//test controller
export const testController = (req,res)=>{
    res.send("Protectetd Routes")
}
export const UpdateScoreLabel = async(req,res)=>{
    try{
      const {email,score,label} = req.body;
      if (!email||!score||!label)
      {
        return res.status(400).json({ message: 'Email, score, and label are required' });
      }
      const existingUser = await userModel.findOne({email})
      if (!existingUser)
      {
        return res.status(404).send({ message: 'User not found' });
      }
      existingUser.score = score;
      existingUser.label = label;
      await existingUser.save();
      res.status(200).send({
        success: true,
        message: 'Score and Label updated successfully',
        updatedUser: existingUser,
    });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Updating Score and Label",
            error
        })
    }
  

  }
  export const updateProfileController = async (req, res) => {
    try {
        const { email, phone, location, bio } = req.body;

        if (!email || !phone || !location || !bio) {
            return res.status(400).json({ message: 'Email, phone, location, and bio are required' });
        }

        // First, find the user by their email address
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's fields
        user.phone = phone;
        user.location = location;
        user.bio = bio;

        // Save the updated user
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            updatedUser: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error in updating profile',
            error: error.message,
        });
    }
};

export const GetUserByEmail = async (req, res) => {
    try {
      const email = req.params.email; // Get the email from the URL parameter
      const user = await userModel.findOne({ email }); // Query the database for a user with the specified email
  
      if (user) {
        // User with the specified email was found
        res.status(200).send({
          success: true,
          message: "User found",
          user,
        });
      } else {
        // User with the specified email was not found
        res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  };
export const countEnrolledCoursesByEmail = async (req, res) => {
    try {
      const userEmail = req.params.email; // Assuming you pass the user's email as a URL parameter
  
      if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
      }
  
      const user = await userModel.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const numberOfEnrolledCourses = user.enrolledCourses.length;
  
      res.status(200).json({ count: numberOfEnrolledCourses });
    } catch (error) {
      console.error('Error counting enrolled courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


export const getEnrolledCourses = async (req, res) => {
  try {
    const { userEmail } = req.params; // You can change this depending on your route configuration

    const user = await userModel.findOne({ email: userEmail })
      .populate('enrolledCourses') // Adjust the fields you want to populate
      .exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const enrolledCourses = user.enrolledCourses;

    res.json({ enrolledCourses });
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
