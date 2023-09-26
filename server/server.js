
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import authRoute from './Routes/authRoute.js';
import postRoute from './Routes/postRoute.js'
import questionRoute from './Routes/questionRoute.js'
import voteRoute from './Routes/voteRoute.js'
import spaceRoute from './Routes/spaceRoute.js'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary';
import 'dotenv/config'

// configure dotenv
dotenv.config();

// Connecting MongoDB
connectDB();


const app = express();
const PORT = process.env.PORT || 8080;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


// All routes to use my app
app.use('/quora/v1/auth', authRoute);
app.use('/quora/v1/post', postRoute);
app.use('/quora/v1/question', questionRoute);
app.use('/quora/v1/vote', voteRoute);
app.use('/quora/v1/space', spaceRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta.white);
});
