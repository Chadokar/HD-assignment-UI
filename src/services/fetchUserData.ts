import { config } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

export async function fetchUserData(navigate: NavigateFunction): Promise<void> {
  const pathname = window.location.pathname;
  try {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      const response = await axios.get(`/user`, config());
      const data = response.data.user;
      localStorage.setItem("user", JSON.stringify(data));
      if (pathname === "/signin" || pathname === "/signup") navigate("/");

      // createToast("welcome back", "success");
    } else if (token === "undefined") {
      toast.error("Please Login");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  } catch (error: any) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.error(
      error?.response?.data?.error ||
        "Failed to fetch user data please login again"
    );
    if (pathname !== "/googleauth") navigate("/signin");
  }
}
