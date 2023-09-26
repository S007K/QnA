import voteModel from '../models/voteModel.js';



// vote controller
export const votePost = async (req, res) => {
    const { postId, voteType } = req.body;
    const userId = req.user._id;

    try {
        const existingVote = await voteModel.findOne({ postId, userId });

        if (existingVote) {
            if (existingVote.voteType === voteType) {
                await voteModel.deleteOne({ _id: existingVote._id });
            } else {
                existingVote.voteType = voteType;
                await existingVote.save();
            }
        } else {
            const newVote = new voteModel({ postId, userId, voteType });
            await newVote.save();
        }

        res.status(200).send({ message: 'Vote updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating vote', error: error.message });
    }
};


// get vote controller
export const getUserVote = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
        const vote = await voteModel.findOne({ postId, userId });

        const totalVotes = await voteModel.countDocuments({ postId });
        if (vote) {
            res.status(200).json({ voteType: vote.voteType, totalVotes });
        } else {
            res.status(200).json({ voteType: null, totalVotes });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user vote', error: error.message });
    }
};





