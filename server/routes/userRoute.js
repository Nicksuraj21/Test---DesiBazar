// import express from 'express';
// import { isAuth, login, logout, register } from '../controllers/userController.js';
// import authUser from '../middlewares/authUser.js';

// const userRouter = express.Router();

// userRouter.post('/register', register)
// userRouter.post('/login', login)
// userRouter.get('/is-auth', authUser, isAuth)
// userRouter.get('/logout', authUser, logout)

// export default userRouter






// import express from 'express';
// import { 
//   isAuth, 
//   login, 
//   logout, 
//   register, 
//   googleLogin 
// } from '../controllers/userController.js';
// import authUser from '../middlewares/authUser.js';

// const userRouter = express.Router();

// userRouter.post('/register', register);
// userRouter.post('/login', login);
// userRouter.post('/google-login', googleLogin);
// userRouter.get('/is-auth', authUser, isAuth);
// userRouter.get('/logout', authUser, logout);

// export default userRouter;















import express from "express";
import {
  googleLogin,
  sendOtp,
  verifyOtp,
  isAuth,
  logout,
  registerUser,
  loginUser,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/google-login", googleLogin);
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtp);

userRouter.get("/is-auth", authUser, isAuth);
userRouter.patch("/profile", authUser, updateProfile);
userRouter.get("/logout", authUser, logout);

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
