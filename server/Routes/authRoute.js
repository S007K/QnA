import express from 'express';
import multer from 'multer';
import { loginController, registerController } from '../controllers/authController.js';
import { requireSignIn } from './../midlewares/authenticate.js';


const router = express.Router();

const upload = multer({ dest: 'profile/' });

// Register Routes  || POST Method
router.post('/register', upload.single('photo'), registerController)

// Login Routes || POST Method
router.post('/login', loginController)

// Protected Routes || GET Method
router.get('/protected', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})


export default router;
