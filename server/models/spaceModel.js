import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('space', spaceSchema);

