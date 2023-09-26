import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },
}, { timestamps: true });

export default mongoose.model('post', postSchema);

