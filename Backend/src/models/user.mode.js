import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      reqired: true,
      unique: true,
      minlength: [10, "Email should be atleast 10 letters"],
    },
    fullname: {
      type: String,
      reqired: true,
      unique: true,
      minlength: [5, "Fullame should be atleast 5 letters"],
    },
    password: {
      type: String,
      reqired: true,
      minlength: [5, "Password should be atleast 5 letters"],
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
