import jwt from "jsonwebtoken";
export const generateToken = (email, fullname, userId, res) => {
  try {
    // Generate the token
    const token = jwt.sign({ email, fullname, userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expiry set to 7 days
    });

    // Ensure the `res` object exists and has a `cookie` method
    if (!res || typeof res.cookie !== "function") {
      throw new Error("Response object is invalid or missing");
    }

    // Set the token as a cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: "strict", // Enforce strict SameSite policy
      secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate token");
  }
};