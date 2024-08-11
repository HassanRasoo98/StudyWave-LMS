import Category from '../models/addcategorymodel.js'
export const CreateCategory = async(req,res)=>{
    try{
        const {category_title,category_order,category_language,category_slug} = new Category(req.body);
        if (!category_title)
        {
            return res.send({message:'Category Title is required'})

        }
        if (!category_order)
        {
            return res.send({message:'Category Order is required'})

        }
        if (!category_language)
        {
            return res.send({message:'Category Language is required'})

        }
        if (!category_slug)
        {
            return res.send({message:'Category Slug is required'})

        }
        const savecategory = new Category({category_title,category_order,category_language,category_slug}).save();
        res.status(201).send({
            success:true,
            message: 'Category  Created Successfully',
            savecategory:{category_title,category_order,category_language,category_slug}
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
export const DeleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID and delete it
        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            deletedCategory: category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting category',
            error: error.message,
        });
    }
};
export const GetAllCategory = async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).json({
            success:true,
            message:"Successfully Get All Categories",
            categories
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching category titles.',
            error: error.message,
        });
    }
}
export const GetAllCategoryTitle = async(req,res)=>{
    try {
        const categories = await Category.find({}, 'category_title');
        res.status(200).json({
            success:true,
            message:"Successfully Get All Categories",
            categories
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching category titles.',
            error: error.message,
        });
    }
}
export const GetCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id; // Assuming you pass the category ID in the URL

        // Find the category by ID
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Category retrieved successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in retrieving category',
            error: error.message,
        });
    }
};
export const UpdateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; // Assuming you pass the category ID in the URL
        const { category_title, category_order, category_language, category_slug } = req.body;

        if (!category_title || !category_order || !category_language || !category_slug) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Find the category by ID and update it
        const category = await Category.findByIdAndUpdate(categoryId, {
            category_title,
            category_order,
            category_language,
            category_slug,
        });

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            updatedCategory: category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating category',
            error: error.message,
        });
    }
};
