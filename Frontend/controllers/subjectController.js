import Subject from '../models/addsubject.js'
export const CreateSubject = async(req,res)=>{
    try{
        const {subject_title,subject_order,subject_language,/*subject_slug*/} = new Subject(req.body);
        if (!subject_title)
        {
            return res.send({message:'Subject Title is required'})

        }
        if (!subject_order)
        {
            return res.send({message:'Subject Order is required'})

        }
        if (!subject_language)
        {
            return res.send({message:'Subject Language is required'})

        }
        // if (!subject_slug)
        // {
        //     return res.send({message:'Subject Slug is required'})

        // }
        const savesubject = new Subject({subject_title,subject_order,subject_language,/*subject_slug*/}).save();
        res.status(201).send({
            success:true,
            message: 'Subject  Created Successfully',
            savesubject:{subject_title,subject_order,subject_language,/*subject_slug*/}
        });
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating category",
            error
        })
    }
}

export const GetAllSubjectTitle = async(req,res)=>{
    try {
        const subjects = await Subject.find({}, 'subject_title');
        res.status(200).json({
            success:true,
            message:"Successfully Get All Subjects",
            subjects
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Subjects titles.',
            error: error.message,
        });
    }
}
export const GetAllSubject = async(req,res)=>{
    try {
        const subjects = await Subject.find({});
        res.status(200).json({
            success:true,
            message:"Successfully Get All Subjects",
            subjects
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Subjects titles.',
            error: error.message,
        });
    }
}
export const DeleteSubject = async (req, res) => {
    try {
        const subjectId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID and delete it
        const subject = await Subject.findByIdAndDelete(subjectId);

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Subject deleted successfully',
            deletedSubject: subject,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting subject',
            error: error.message,
        });
    }
};
export const GetSubjectById = async (req, res) => {
    try {
        const subjectId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID
        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Subject retrieved successfully',
            subject,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving Subject',
            error: error.message,
        });
    }
};
export const UpdateCategory = async (req, res) => {
    try {
        const subjectId = req.params.id; // Assuming you pass the category ID in the URL
        const { subject_title, subject_order, subject_language, /*subject_slug*/ } = req.body;

        if (!subject_title || !subject_order || !subject_language )/*|| !subject_slug*/ {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Find the category by ID and update it
        const subject = await Subject.findByIdAndUpdate(subjectId, {
            subject_title,
            subject_order,
            subject_language,
            /*subject_slug*/
        });

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Subject updated successfully',
            updatedSubject: subject,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating Subject',
            error: error.message,
        });
    }
};
