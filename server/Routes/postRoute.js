import express from "express";
import multer from 'multer';
import { createPostController, deletePostController, getAllPostController, getPost, searchPostController } from "../controllers/postController.js";
import { requireSignIn } from "../midlewares/authenticate.js";


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create Post ||POST Method
router.post("/create-post", requireSignIn, upload.single('photo'), createPostController)

// Gel All Post See Anyone ||GET Method
router.get('/all-post', getAllPostController);

// Get All post added by particullar user || GET Method
router.get('/get-post', requireSignIn, getPost)

// Delete post using id || DELETE Method
router.delete('/delete/:id', requireSignIn, deletePostController)

// Search posts using keyword
router.get("/search", searchPostController);


export default router;