// user.route.js
import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { signupUser, loginUser, logoutUser ,checkLoginStatus} from '../controllers/user.controller.js';

const router = Router();


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get('/auth',checkLoginStatus)

export default router;
