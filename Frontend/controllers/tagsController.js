/*
import Tags from '../models/addtagsmodel.js'
export const CreateTags = async(req,res)=>{
    try{
        const {tag_title} = new Tags(req.body);
        const saveTags = new Tags({tag_title}).save();
        res.status(201).send({
            success:true,
            message: 'Tags Created Successfully',
            saveTags:{tag_title}
        });
        if(!tag_title)
        {
            return res.send({message:'Title is required'})
        }
        
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating Tag",
            error
        })
    }
}
export const GetAllTagsTitle = async(req,res)=>{
    try {
        const tags = await Tags.find({}, 'tag_title');
        res.status(200).json({
            success:true,
            message:"Successfully Get All Tags",
            tags
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Tags titles.',
            error: error.message,
        });
    }
}
export const GetAllTagsDetails = async(req,res)=>{
    try {
        const tags = await Tags.find({});
        res.status(200).json({
            success:true,
            message:"Successfully Get All Tags",
            tags
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Tags titles.',
            error: error.message,
        });
    }
}
export const DeleteTag = async (req, res) => {
    try {
        const tagId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID and delete it
        const tag = await Tags.findByIdAndDelete(tagId);

        if (!tag) {
            return res.status(404).send({ message: 'Tag not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Tags deleted successfully',
            deletedTag: tag,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Tags subject',
            error: error.message,
        });
    }
};

export const GetTagById = async (req, res) => {
    try {
        const tagId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID
        const tag = await Tags.findById(tagId);

        if (!tag) {
            return res.status(404).send({ message: 'Tag not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Tag retrieved successfully',
            tag,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving Tag',
            error: error.message,
        });
    }
};
export const UpdateTag = async (req, res) => {
    try {
        const tagId = req.params.id; // Assuming you pass the category ID in the URL
        const { tag_title} = req.body;

        if (!tag_title) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Find the category by ID and update it
        const tag = await Tags.findByIdAndUpdate(tagId, {
            tag_title,
           
        });

        if (!tag) {
            return res.status(404).send({ message: 'Tag not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Tag updated successfully',
            updatedTag: tag,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating Tag',
            error: error.message,
        });
    }
};
*/