import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const envUser = String(process.env.ADMIN_USER_ID ?? "").trim();
    const envPass = String(process.env.ADMIN_PASSWORD ?? "");

    const okUser = String(userId ?? "").trim() === envUser && envUser.length > 0;
    const okPass = String(password ?? "") === envPass && envPass.length > 0;

    if (okUser && okPass) {
      const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Logged In" });
    }

    return res.json({ success: false, message: "Invalid Credentials" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const adminIsAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
