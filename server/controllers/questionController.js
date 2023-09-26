import questionModel from "../models/questionModel.js";



export const createQuestionController = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) throw new Error('Please add your proper Question');

        const newQuestion = await questionModel.create({
            question,
            author: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Your question is now live',
            questions: newQuestion,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in post a question',
            error: error.message,
        });
    }
}




// Get question || GET Method
export const getQuestionController = async (req, res) => {
    try {
        const allquestion = await questionModel.find().sort({ createdAt: -1 }).populate({
            path: "author",
            select: "name photo"
        });;
        res.status(200).json({
            success: true,
            message: "All question fetched successfully",
            question: allquestion,
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