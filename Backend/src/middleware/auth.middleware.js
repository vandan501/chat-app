import jwt from "jsonwebtoken";
import User from "../models/user.mode.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No token provided",
        });
      }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised - token is Invalid",
      });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in protectRoute Middleware: ${error.message}`,
    });
  }
};