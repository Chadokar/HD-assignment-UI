import toast from "react-hot-toast";
import {
  SavePasswordType,
  SendOTPType,
  SetStepType,
  VerifyOTPType,
} from "@/lib/functiontypes";
import { SignUpForm, Step, VerifyResponseType } from "@/lib/types";
import axios from "axios";
import { config } from "@/lib/utils";

const sendOTP: SendOTPType = async (
  url,
  body,
  setStep,
  setToken,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const res = await axios.post(url, body, config());
    setToken(res.data.token);
    toast.success("OTP sent successfully");
    setStep(Step.OTP);
  } catch (error: any) {
    // console.error(error);
    toast.error(
      error?.response?.data?.message || error?.message || "Failed to send OTP"
    );
    // return it as error
    setStep(Step.DETAILS);
    return error;
  } finally {
    setIsLoading(false);
  }
};

const verifyOTP: VerifyOTPType = async (
  url,
  body,
  setStep,
  setToken,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const { data }: { data: VerifyResponseType } = await axios.post(
      url,
      body,
      config()
    );
    setStep(Step.PASSWORD);
    toast.success("OTP verified successfully");
    setToken(data.token);
    return data;
  } catch (error: any) {
    // console.error(error);
    setStep(Step.OTP);
    toast.error(error?.message || "Failed to verify OTP");
  } finally {
    setIsLoading(false);
  }
};

const savePassword: SavePasswordType = async (
  url,
  body,
  navigate,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const res = await axios.post(url, body, config());
    toast.success("Password set successfully");
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/");
  } catch (error: any) {
    // console.error(error);
    toast.error(error?.message || "Failed to set password");
  } finally {
    setIsLoading(false);
  }
};

const onSubmit = async (
  data: SignUpForm,
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
      sendOTP(
        "signup",
        {
          email: data.email,
          name: data.name,
          dob: data.dateOfBirth,
        },
        setStep,
        setToken,
        setIsLoading
      );
      break;

    case Step.OTP:
      // TODO: Verify OTP
      verifyOTP(
        "signup-verify",
        {
          otp: Number(data.otp),
          token: currtoken,
        },
        setStep,
        setToken,
        setIsLoading
      );
      break;

    case Step.PASSWORD:
      // TODO: Complete signup
      await savePassword(
        "save-password",
        {
          password: data.password as string,
          token: currtoken,
        },
        navigate,
        setIsLoading
      );
      break;

    default:
      throw new Error("Invalid step");
  }
};

export { onSubmit };
