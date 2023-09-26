import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    question: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model('question', questionSchema);