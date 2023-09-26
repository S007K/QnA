import postModel from "../models/postModel.js";
import cloudinary from 'cloudinary';


export const createPostController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'quora/',
        });

        const { title, description } = req.body;
        if (!title || !description) throw new Error('Please fill all fields');

        const newPost = await postModel.create({
            title,
            description,
            photo: result.url,
            author: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Your post has been created',
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in creating post',
            error: error.message,
        });
    }
};


// get all place anyone can see
export const getAllPostController = async (req, res) => {
    try {
        const allPost = await postModel.find().sort({ createdAt: -1 }).populate({
            path: "author",
            select: "name photo"
        });;
        res.status(200).json({
            success: true,
            message: "All places fetched successfully",
            post: allPost,
        });
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}



// Get post added by particullar user
export const getPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const post = await postModel.find({ author: userId }).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "your added post",
            post
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}



// Delete Post 
export const deletePostController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await postModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "No Post found given ID",
            });
        }
        return res.json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the place",
            error,
        });
    }
};




// Search post using keyword
export const searchPostController = async (req, res) => {
    try {
        const { keyword } = req.query;

        const posts = await postModel.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } },
            ],
        });

        res.status(200).json({
            success: true,
            message: "Posts found",
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while searching for posts",
            error: error.message,
        });
    }
};