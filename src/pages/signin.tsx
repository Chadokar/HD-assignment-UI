import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
import { SignInForm, Step } from "@/lib/types";
import { signinSubmit } from "@/services/signincalls";
import axios from "axios";
import containerimg from "@/img/container.png";
import googleIcon from "@/img/google.svg";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [step, setStep] = useState(Step.PASSWORD);
  const [currtoken, setToken] = useState("");
  const navigate = useNavigate();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
    reset,
  } = useForm<SignInForm>({
    defaultValues: {
      rememberMe: false,
    },
  });

  async function submitForm(data: SignInForm) {
    await signinSubmit(
      data,
      step,
      setStep,
      currtoken,
      setToken,
      setIsLoading,
      navigate
    );
    reset();
  }

  async function redirectURL() {
    setIsGoogleLoading(true);
    try {
      const res = await axios.get("google/redirect");

      window.location.href = res.data.url;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to redirect to Google"
      );
    } finally {
      setIsGoogleLoading(false);
    }
  }

  if ((isGoogleLoading || isLoading) && !localStorage.getItem("first")) {
    return <Loader text="For first time loading it will take 50-60 seconds" />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-start justify-center p-4 lg:w-2/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex flex-col gap-2 lg:items-start items-center">
            <h1 className="text-xl font-bold">Sign In</h1>
            <p className="text-sm text-secondary dark:text-gray-400">
              Please login to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(submitForm)} className="space-y-6 gap-4">
            {step !== Step.OTP && (
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>
            )}

            {step === Step.PASSWORD && (
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  error={errors.password?.message}
                />
                <div className="flex flex-col gap-2 pt-2 justify-between">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-xs font-semibold text-blue-500 underline w-fit"
                  >
                    Forgot password?
                  </button>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-xs text-primary dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </label>
                </div>
              </div>
            )}
            {step === Step.OTP && (
              <Input
                id="otp"
                label="Enter OTP"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid OTP format",
                  },
                })}
                error={errors.otp?.message}
              />
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : step === Step.PASSWORD ? (
                "Sign in"
              ) : step === Step.OTP ? (
                "Verify OTP"
              ) : (
                "Continue"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  setStep(step === Step.PASSWORD ? Step.DETAILS : Step.PASSWORD)
                }
                className="text-xs text-blue-500 hover:underline"
              >
                {step !== Step.PASSWORD
                  ? "Sign in with password instead"
                  : "Sign in with OTP instead"}
              </button>
            </div>
          </form>

          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-aclline" />
              </div>
              <div className="relative flex justify-center text-[1rem]">
                <span className="bg-white px-2 text-aclline2 text-muted-foreground dark:bg-gray-900">
                  or
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                redirectURL();
                // toast.error("Google sign up not implemented yet")
              }}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In with Google
                  <img src={googleIcon} alt="Google" className="ml-2 h-6 w-6" />
                </>
              )}
            </Button>
          </>

          <>
            {isForgotPassword ? (
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-blue-500 hover:underline"
              >
                Back to sign in
              </button>
            ) : (
              <p className="text-center text-[14px] text-gray-600 dark:text-gray-400">
                Need an account?? {"   "}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-500 underline"
                >
                  Create one
                </Link>
              </p>
            )}
          </>
        </motion.div>
      </div>

      <div className="hidden lg:block lg:w-3/5 h-[calc(100vh+48px)] absolute top-2 right-2">
        <div className="relative h-full w-full">
          <img
            // src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
            src={containerimg}
            alt="Abstract waves"
            className="h-full w-full object-cover border-0 rounded-3xl"
          />
          {/* <div className="absolute inset-0 bg-blue-500/10" /> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(SignIn);
