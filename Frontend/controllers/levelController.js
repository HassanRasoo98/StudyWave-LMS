import Level from '../models/levelmodel.js'
export const CreateLevel = async(req,res)=>{
    try{
        const {level_title} = new Level(req.body);
        if(!level_title)
        {
            return res.send({message:'Title is required'})
        }
        const saveLevel = new Level({level_title}).save();
        res.status(201).send({
            success:true,
            message: 'Level Created Successfully',
            savelevel:{level_title}
        });
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating Level",
            error
        })
    }
}
export const GetAllLevelTitle = async(req,res)=>{
    try {
        const levels = await Level.find({}, 'level_title');
        res.status(200).json({
            success:true,
            message:"Successfully Get All Levels",
            levels
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Level titles.',
            error: error.message,
        });
    }
}
export const GetAllLevels = async(req,res)=>{
    try {
        const levels = await Level.find({});
        res.status(200).json({
            success:true,
            message:"Successfully Get All Levels",
            levels
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Level titles.',
            error: error.message,
        });
    }
}

export const GetLevelById = async (req, res) => {
    try {
        const levelId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID
        const level = await Level.findById(levelId);

        if (!level) {
            return res.status(404).send({ message: 'Level not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Level retrieved successfully',
            level,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving Level',
            error: error.message,
        });
    }
};
export const UpdateLevel = async (req, res) => {
    try {
        const levelId = req.params.id; // Assuming you pass the category ID in the URL
        const { level_title} = req.body;

        if (!level_title) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Find the category by ID and update it
        const level = await Level.findByIdAndUpdate(levelId, {
            level_title,
           
        });

        if (!level) {
            return res.status(404).send({ message: 'Level not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Level updated successfully',
            updatedLevel: level,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating Level',
            error: error.message,
        });
    }
};
export const DeleteLevel = async (req, res) => {
    try {
        const levelId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID and delete it
        const level = await Level.findByIdAndDelete(levelId);

        if (!level) {
            return res.status(404).send({ message: 'Level not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Level deleted successfully',
            deletedLevel: level,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Level subject',
            error: error.message,
        });
    }
};
