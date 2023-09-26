import express from 'express';
import { getUserVote, votePost } from '../controllers/voteController.js';
import { requireSignIn } from '../midlewares/authenticate.js';


const router = express.Router();

// vote for post || POST Method
router.post('/update-vote', requireSignIn, votePost);

// get userVote
router.get('/update-vote/:postId', requireSignIn, getUserVote);

export default router;
