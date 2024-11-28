import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import uploadOnCloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { email, fullname, password, avatar } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(500).json({
        success: false,
        message: "All Fields Required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already exiest" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();

    generateToken(email, fullname, newUser._id, res);

    return res.status(201).json({
      success: true,
      _id: newUser._id,
      email: newUser.email,
      fullname: newUser.fullname,
      avatar: newUser.avatar,
    });
  } catch (error) {
    console.log("Error Occured while Signup User", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateToken(user.email, user.fullname, user._id, res);

    return res.status(200).json({
      success: true,
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.error("Error Occured while logout :", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateProfile = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  if (!avatar) {
    return res.status(400).json({
      success: false,
      message: "Profile picture is required",
    });
  }
  try {
    const response = await uploadOnCloudinary(avatar);
    if (response) {
      console.log("File uploaded to Cloudinary:", response.url);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatar: response.secure_url },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Send success response
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary.",
      });
    }
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const check = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: "Internal servesr error" });
  }
};
