import { create } from "zustand";
import axioseInstance from "../lib/axios.js";
import  toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLoggedIn: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = axioseInstance.get("/auth/check");
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
      const res = await axioseInstance.post("/auth/signup",data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignUp: false });
    }
  },
}));
