// import User from "../models/User.js";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // Register User : /api/user/register
// export const register = async (req, res)=>{
//     try {
//         const { name, email, password } = req.body;

//         if(!name || !email || !password){
//             return res.json({success: false, message: 'Missing Details'})
//         }

//         const existingUser = await User.findOne({email})

//         if(existingUser)
//             return res.json({success: false, message: 'User already exists'})

//         const hashedPassword = await bcrypt.hash(password, 10)

//         const user = await User.create({name, email, password: hashedPassword})

//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

//         res.cookie('token', token, {
//             httpOnly: true, // Prevent JavaScript to access cookie
//             secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
//             maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
//         })

//         return res.json({success: true, user: {email: user.email, name: user.name}})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// // Login User : /api/user/login

// export const login = async (req, res)=>{
//     try {
//         const { email, password } = req.body;

//         if(!email || !password)
//             return res.json({success: false, message: 'Email and password are required'});
//         const user = await User.findOne({email});

//         if(!user){
//             return res.json({success: false, message: 'Invalid email or password'});
//         }

//         const isMatch = await bcrypt.compare(password, user.password)

//         if(!isMatch)
//             return res.json({success: false, message: 'Invalid email or password'});

//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

//         res.cookie('token', token, {
//             httpOnly: true, 
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//         })

//         return res.json({success: true, user: {email: user.email, name: user.name}})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }


// // Check Auth : /api/user/is-auth
// export const isAuth = async (req, res)=>{
//     try {
//         const { userId } = req.body;
//         const user = await User.findById(userId).select("-password")
//         return res.json({success: true, user})

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// // Logout User : /api/user/logout

// export const logout = async (req, res)=>{
//     try {
//         res.clearCookie('token', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//         });
//         return res.json({ success: true, message: "Logged Out" })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }























// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // ==============================
// // REGISTER USER
// // ==============================
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,        // 🔥 REQUIRED FOR RENDER
//       sameSite: "none",    // 🔥 REQUIRED FOR CROSS-ORIGIN
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: { email: user.email, name: user.name },
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // LOGIN USER
// // ==============================
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,        // 🔥 REQUIRED FOR RENDER
//       sameSite: "none",    // 🔥 REQUIRED FOR CROSS-ORIGIN
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: { email: user.email, name: user.name },
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // CHECK AUTH
// // ==============================
// export const isAuth = async (req, res) => {
//   try {
//     const userId = req.userId; // 👈 auth middleware se aata hai
//     const user = await User.findById(userId).select("-password");
//     return res.json({ success: true, user });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // LOGOUT USER
// // ==============================
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });

//     return res.json({ success: true, message: "Logged Out" });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };
























// -----------google aunthication----------------

// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";

// // 🔥 GOOGLE CLIENT INIT
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // ==============================
// // REGISTER USER
// // ==============================
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: { email: user.email, name: user.name },
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // LOGIN USER
// // ==============================
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: { email: user.email, name: user.name },
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // 🔥 GOOGLE LOGIN
// // ==============================
// export const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.json({ success: false, message: "No token provided" });
//     }

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name } = payload;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         password: "google-auth",
//       });
//     }

//     const jwtToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", jwtToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: { email: user.email, name: user.name },
//     });

//   } catch (error) {
//     console.log("Google Login Error:", error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // CHECK AUTH
// // ==============================
// export const isAuth = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId).select("-password");
//     return res.json({ success: true, user });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // LOGOUT USER
// // ==============================
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });

//     return res.json({ success: true, message: "Logged Out" });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };




































// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";
// import axios from "axios";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // 🔥 Temporary OTP Store (Memory)
// const otpStore = {};

// // ==============================
// // SEND OTP (MSG91)
// // ==============================
// export const sendOtp = async (req, res) => {
//   try {
//     const { phone } = req.body;

//     if (!phone) {
//       return res.json({ success: false, message: "Phone required" });
//     }

//     const otp = Math.floor(1000 + Math.random() * 9000);

//     otpStore[phone] = {
//       otp,
//       expires: Date.now() + 5 * 60 * 1000,
//     };

//     await axios.post(
//       "https://control.msg91.com/api/v5/otp",
//       {
//         mobile: "91" + phone,
//         template_id: process.env.MSG91_TEMPLATE_ID,
//         otp: otp,
//       },
//       {
//         headers: {
//           authkey: process.env.MSG91_AUTH_KEY,
//         },
//       }
//     );

//     return res.json({ success: true });
//   } catch (error) {
//     console.log(error.response?.data || error.message);
//     return res.json({ success: false, message: "SMS failed" });
//   }
// };

// // ==============================
// // VERIFY OTP
// // ==============================
// export const verifyOtp = async (req, res) => {
//   try {
//     const { phone, otp } = req.body;

//     const data = otpStore[phone];

//     if (!data) {
//       return res.json({ success: false, message: "No OTP sent" });
//     }

//     if (Date.now() > data.expires) {
//       return res.json({ success: false, message: "OTP expired" });
//     }

//     if (data.otp != otp) {
//       return res.json({ success: false, message: "Wrong OTP" });
//     }

//     delete otpStore[phone];

//     let user = await User.findOne({ phone });

//     if (!user) {
//       user = await User.create({
//         name: "User",
//         phone,
//         email: phone + "@otp.com",
//         password: "otp-login",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 15 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: {
//         name: user.name,
//         phone: user.phone,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };












// // ==============================
// // EMAIL LOGIN
// // ==============================
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({ success: false, message: "All fields required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 15 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });

//   } catch (error) {
//     return res.json({ success: false, message: "Login failed" });
//   }
// };



// // ==============================
// // REGISTER USER
// // ==============================
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success: false, message: "All fields required" });
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 15 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });

//   } catch (error) {
//     return res.json({ success: false, message: "Register failed" });
//   }
// };














// // ==============================
// // GOOGLE LOGIN
// // ==============================
// export const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name } = payload;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         password: "google-auth",
//       });
//     }

//     const jwtToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15d" }
//     );

//     res.cookie("token", jwtToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 15 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: { name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success: false, message: "Google login failed" });
//   }
// };

// // ==============================
// // CHECK AUTH
// // ==============================
// export const isAuth = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     return res.json({ success: true, user });
//   } catch (error) {
//     return res.json({ success: false });
//   }
// };

// // ==============================
// // LOGOUT
// // ==============================
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });

//     return res.json({ success: true });
//   } catch (error) {
//     return res.json({ success: false });
//   }
// };








































import fs from "fs/promises";
import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { pruneAndPersistUserRewards } from "../utils/rewardGrants.js";
import { pointsEarnedFromPurchase } from "../utils/rewardPoints.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ COMMON COOKIE CONFIG (PRODUCTION SAFE)
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",              // ✅ change this
  domain: ".desibazar.online",  // ✅ VERY IMPORTANT
  maxAge: 15 * 24 * 60 * 60 * 1000,
};

// 🔥 Temporary OTP Store (Memory)
const otpStore = {};


// ==============================
// SEND OTP (MSG91)
// ==============================
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.json({ success: false, message: "Phone required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    otpStore[phone] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        mobile: "91" + phone,
        template_id: process.env.MSG91_TEMPLATE_ID,
        otp: otp,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    return res.json({ success: true });

  } catch (error) {
    console.log(error.response?.data || error.message);
    return res.json({ success: false, message: "SMS failed" });
  }
};


// ==============================
// VERIFY OTP
// ==============================
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const data = otpStore[phone];

    if (!data) {
      return res.json({ success: false, message: "No OTP sent" });
    }

    if (Date.now() > data.expires) {
      return res.json({ success: false, message: "OTP expired" });
    }

    if (data.otp != otp) {
      return res.json({ success: false, message: "Wrong OTP" });
    }

    delete otpStore[phone];

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        name: "User",
        phone,
        email: phone + "@otp.com",
        password: "otp-login",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.json({
      success: true,
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


// ==============================
// EMAIL LOGIN
// ==============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return res.json({ success: false, message: "Login failed" });
  }
};


// ==============================
// REGISTER USER
// ==============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return res.json({ success: false, message: "Register failed" });
  }
};


// ==============================
// GOOGLE LOGIN
// ==============================
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-auth",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.cookie("token", jwtToken, cookieOptions);

    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Google login failed" });
  }
};


// ==============================
// UPDATE PROFILE (name)
// ==============================
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !String(name).trim()) {
      return res.json({ success: false, message: "Name required" });
    }

    await pruneAndPersistUserRewards(User, req.userId);

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: String(name).trim() },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: "Update failed" });
  }
};

const PROFILE_PHOTO_TRANSFORMATION = [
    { width: 320, height: 320, crop: "fill", gravity: "auto", fetch_format: "auto", quality: "auto" }
];

/** Extract Cloudinary public_id from a stored secure_url (our uploads only). */
const cloudinaryPublicIdFromUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    const trimmed = url.trim();
    if (!trimmed.includes("res.cloudinary.com")) return null;
    const noQuery = trimmed.split("?")[0];
    const marker = "/upload/";
    const idx = noQuery.indexOf(marker);
    if (idx === -1) return null;
    const tail = noQuery.slice(idx + marker.length);
    const segments = tail.split("/").filter(Boolean);
    if (segments.length === 0) return null;
    let start = 0;
    if (/^v\d+$/i.test(segments[0])) {
        start = 1;
    }
    const pathWithExt = segments.slice(start).join("/");
    if (!pathWithExt) return null;
    return pathWithExt.replace(/\.[a-z0-9]+$/i, "") || null;
};

// ==============================
// UPDATE PROFILE PHOTO (Cloudinary)
// POST /api/user/profile-image  (multipart field name: image)
// ==============================
export const updateProfileImage = async (req, res) => {
    const localPath = req.file?.path;

    try {
        if (!localPath) {
            return res.json({ success: false, message: "Image file required" });
        }

        await pruneAndPersistUserRewards(User, req.userId);

        const existing = await User.findById(req.userId).select("profileImage");
        const oldUrl = existing?.profileImage;
        const oldPublicId = cloudinaryPublicIdFromUrl(oldUrl);

        const result = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
            folder: "desibazar/profiles",
            transformation: PROFILE_PHOTO_TRANSFORMATION
        });

        const newPublicId = result.public_id;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { profileImage: result.secure_url },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (oldPublicId && oldPublicId !== newPublicId) {
            try {
                await cloudinary.uploader.destroy(oldPublicId, { resource_type: "image" });
            } catch (delErr) {
                console.log("Cloudinary delete old profile image:", delErr.message);
            }
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message || "Upload failed" });
    } finally {
        if (localPath) {
            try {
                await fs.unlink(localPath);
            } catch {
                /* ignore */
            }
        }
    }
};

// ==============================
// THIS MONTH SPEND (same rules as Star shoppers: delivered orders only)
// GET /api/user/spend-this-month
// ==============================
export const getUserSpendThisMonth = async (req, res) => {
    try {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const monthStart = new Date(y, m - 1, 1, 0, 0, 0, 0);
        const monthEnd = new Date(y, m, 0, 23, 59, 59, 999);
        const monthLabel = monthStart.toLocaleString("en-IN", { month: "long", year: "numeric" });

        const agg = await Order.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(String(req.userId)),
                    createdAt: { $gte: monthStart, $lte: monthEnd },
                    $or: [{ paymentType: "COD" }, { isPaid: true }],
                    status: "Delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalSpent: { $sum: "$amount" },
                    orderCount: { $sum: 1 }
                }
            }
        ]);

        const totalSpent = agg[0]?.totalSpent ?? 0;
        const orderCount = agg[0]?.orderCount ?? 0;

        return res.json({
            success: true,
            totalSpent,
            orderCount,
            monthLabel
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ==============================
// REWARD TRANSACTIONS
// ==============================
export const getRewardTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    await pruneAndPersistUserRewards(User, userId);

    const user = await User.findById(userId).select("rewardPoints rewardGrants");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const orders = await Order.find({ userId })
      .select("paymentType isPaid status rewardPointsUsed amount createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    const tx = [];

    for (const order of orders) {
      const redeem = Math.max(0, Math.floor(Number(order.rewardPointsUsed) || 0));
      const earned = pointsEarnedFromPurchase(order.amount);
      const applied =
        order.paymentType === "COD" || (order.paymentType === "UPI" && order.isPaid);
      const cancelled = order.status === "Cancelled" || order.status === "Canceled";
      const shortId = String(order._id).slice(-6);

      if (!applied) continue;

      if (redeem > 0) {
        tx.push({
          id: `redeem-${order._id}`,
          type: "debit",
          points: redeem,
          title: `Redeemed on order #${shortId}`,
          date: order.createdAt,
        });
      }

      if (earned > 0) {
        tx.push({
          id: `earned-${order._id}`,
          type: "credit",
          points: earned,
          title: `Earned from order #${shortId}`,
          date: order.createdAt,
        });
      }

      if (cancelled) {
        if (redeem > 0) {
          tx.push({
            id: `refund-redeem-${order._id}`,
            type: "credit",
            points: redeem,
            title: `Refunded redeemed points (cancelled #${shortId})`,
            date: order.updatedAt,
          });
        }
        if (earned > 0) {
          tx.push({
            id: `reverse-earned-${order._id}`,
            type: "debit",
            points: earned,
            title: `Reversed earned points (cancelled #${shortId})`,
            date: order.updatedAt,
          });
        }
      }
    }

    tx.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Add admin-granted credits (seller panel) into the user's points history.
    // Both single add and bulk add generate `rewardGrants.source === "admin"`.
    const adminGrants = Array.isArray(user.rewardGrants) ? user.rewardGrants : [];
    for (let i = 0; i < adminGrants.length; i++) {
      const g = adminGrants[i];
      if (!g || g.source !== "admin") continue;
      const points = Math.max(0, Math.floor(Number(g.amount) || 0));
      if (points <= 0) continue;

      tx.push({
        id: `admin-credit-${String(g.adminBatchId || "single")}-${String(g.createdAt || "").slice(-10)}-${i}`,
        type: "credit",
        points,
        title: "Credited from DesiBazar",
        date: g.createdAt || new Date(),
      });
    }

    tx.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return res.json({
      success: true,
      rewardPoints: user.rewardPoints || 0,
      transactions: tx,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ==============================
// CHECK AUTH
// ==============================
export const isAuth = async (req, res) => {
  try {
    await pruneAndPersistUserRewards(User, req.userId);
    const user = await User.findById(req.userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false });
  }
};


// ==============================
// LOGOUT
// ==============================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      domain: ".desibazar.online",
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false });
  }
};