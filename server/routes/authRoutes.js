import express from 'express';
import { getUser, login, logout, signup } from '../controllers/authController.js';
import auth from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout);
router.get("/getUser",auth,getUser);

export default router;
