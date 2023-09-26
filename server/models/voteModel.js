import mongoose from 'mongoose'

const voteSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    voteType: { type: String, enum: ['upvote', 'downvote'] },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Vote', voteSchema)