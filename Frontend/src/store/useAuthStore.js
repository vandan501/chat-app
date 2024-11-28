import { create } from "zustand";
import axioseInstance from "../lib/axios.js";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLoggedIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axioseInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("Error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axioseInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignUp: false });
    }
  },
  login: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axioseInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignUp: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axioseInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Update Successfully");
    } catch (error) {
      console.error("Error while uploading Profile Image", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  logout: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axioseInstance.post("/auth/logout");
      set({ authUser: res.data });
      toast.success("Logout Successfully");
      set({ isSignUp: false });
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignUp: false });
    }
  },
}));
