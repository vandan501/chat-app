import express from "express"
import { login, logout, signup ,updateProfile,check } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
import multer from "multer"
const router = express.Router();
const upload = multer({
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,check)

// module.exports = router; (another way for export)
export default router;