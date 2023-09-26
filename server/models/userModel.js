import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobno: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    }

}, { timestamps: true })


export default mongoose.model('users', userSchema)