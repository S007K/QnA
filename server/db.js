import mongoose from "mongoose";
import colors from 'colors'
import 'dotenv/config'


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected successfully please let's go to project`.bgYellow.bold);

    } catch (error) {
        console.log(`Error in connecting ${error}`)
    }
}