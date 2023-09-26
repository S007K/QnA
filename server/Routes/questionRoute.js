import express from 'express';
import { requireSignIn } from '../midlewares/authenticate.js';
import { createQuestionController, getQuestionController } from '../controllers/questionController.js';




const router = express.Router();

// Create Question || POST Method
router.post('/create-question', requireSignIn, createQuestionController)

// get all question ||GET Method
router.get('/get-question', getQuestionController)


export default router;