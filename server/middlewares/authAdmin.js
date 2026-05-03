import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  const { adminToken } = req.cookies;

  if (!adminToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (decoded.admin === true) {
      req.adminAuth = true;
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
