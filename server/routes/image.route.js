// image.route.js
import { Router } from 'express';
import { createImage, deleteImage, getImage } from '../controllers/image.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();

router.get('/show', getImage);
router.post('/upload', verifyJWT,
    upload.single('image'),
 createImage);
router.post('/delete/:id', verifyJWT, deleteImage);

export default router;
