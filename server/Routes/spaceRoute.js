import express from 'express'
import { createSpaceController, getOtherUsersSpace, getSpace } from '../controllers/spaceController.js';
import { requireSignIn } from '../midlewares/authenticate.js';


const router = express.Router();

// create space || POST Method
router.post('/create-space', requireSignIn, createSpaceController)

// Get all space || GET Method
router.get('/get-space', requireSignIn, getSpace)


// other user space excluding current user
router.get('/get-other-space', requireSignIn, getOtherUsersSpace)

export default router;