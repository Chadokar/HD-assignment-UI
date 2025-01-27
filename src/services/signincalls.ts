import { SetStepType } from "@/lib/functiontypes";
import { SignInForm, Step } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

const signin = async (
  url: string,
  body: object,
  setIsLoading: SetStepType,
  navigate: any
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(url, body);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success("Signed in successfully");
    localStorage.setItem("first", "true");
    navigate("/");
    return response.data;
  } catch (error: any) {
    toast.error(error?.message || "Failed to sign in");
    return error;
  } finally {
    setIsLoading(false);
  }
};

const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const signinOtp = async (
  url: string,
  body: object,
  setStep: SetStepType,
  setToken: SetStepType,
  setIsLoading: SetStepType
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(url, body);
    setStep(Step.OTP);
    setToken(response.data.token);

    toast.success("OTP sent successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error?.message || "Failed to send OTP");
    return error;
  } finally {
    setIsLoading(false);
  }
};

const verifyOTP = async (
  url: string,
  body: object,
  setIsLoading: SetStepType,
  navigate: any
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(url, body);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success("OTP verified successfully");
    navigate("/");
    return response.data;
  } catch (error: any) {
    toast.error(error?.message || "Failed to verify OTP");
    return error;
  } finally {
    setIsLoading(false);
  }
};

const onSubmit = async (
  data: SignInForm,
  step: Step,
  setStep: SetStepType,
  currtoken: string,
  setToken: SetStepType,
  setIsLoading: SetStepType,
  navigate: (path: string) => void
) => {
  switch (step) {
    case Step.DETAILS:
      // TODO: Send OTP to email
      signinOtp(
        "signin-otp",
        {
          email: data.email,
        },
        setStep,
        setToken,
        setIsLoading
      );
      break;

    case Step.OTP:
      // TODO: Verify OTP
      verifyOTP(
        "verify-otp",
        {
          otp: Number(data.otp),
          token: currtoken,
        },
        setIsLoading,
        navigate
      );
      break;

    case Step.PASSWORD:
      // TODO: Complete signup
      await signin(
        "signin",
        {
          email: data.email,
          password: data.password as string,
        },
        setIsLoading,
        navigate
      );
      break;

    default:
      throw new Error("Invalid step");
  }
};

export { signin, signout, signinOtp, verifyOTP, onSubmit as signinSubmit };
