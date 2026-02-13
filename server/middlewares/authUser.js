// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next)=>{
//     const {token} = req.cookies;

//     if(!token){
//         return res.json({ success: false, message: 'Not Authorized' });
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id;
//         }else{
//             return res.json({ success: false, message: 'Not Authorized' });
//         }
//         next();

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export default authUser;






// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.json({ success: false, message: 'Not Authorized' });
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if (tokenDecode.id) {
//             req.userId = tokenDecode.id;   // ✅ FIXED (important)
//             next();
//         } else {
//             return res.json({ success: false, message: 'Not Authorized' });
//         }


        
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };

// export default authUser;
























import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({
        success: false,
        message: "Invalid token"
      });
    }

    // 🔥 FETCH USER FROM DB (SECURITY)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    // 🟢 BEST PRACTICE
    req.user = user;          // full user object
    req.userId = user._id;    // optional shortcut

    next();

  } catch (error) {
    console.log("authUser error:", error.message);
    return res.json({
      success: false,
      message: "Invalid token"
    });
  }
};

export default authUser;
