import spaceModel from "../models/spaceModel.js";


// Create space controller
export const createSpaceController = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) throw new Error('Please add your space name');

        const newSpace = await spaceModel.create({
            name,
            description,
            author: req.user._id,
        });

        res.status(201).send({
            success: true,
            message: 'Your question is now live',
            questions: newSpace,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in post a question',
            error: error.message,
        });
    }
}




// Get post added by particullar user
export const getSpace = async (req, res) => {
    try {
        const userId = req.user._id;
        const space = await spaceModel.find({ author: userId }).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "your added space",
            space
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}




// exluding space by particullar
export const getOtherUsersSpace = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const space = await spaceModel.find({ author: { $ne: currentUserId } }).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "space added by other users",
            space
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}






