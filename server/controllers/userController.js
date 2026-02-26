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




































import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

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

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Google login failed" });
  }
};

// ==============================
// CHECK AUTH
// ==============================
export const isAuth = async (req, res) => {
  try {
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
      sameSite: "none",
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false });
  }
};