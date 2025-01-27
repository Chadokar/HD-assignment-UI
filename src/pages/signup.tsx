import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
import { onSubmit } from "@/services/signupcalls";
import { SignUpForm, Step } from "@/lib/types";
import renderStepContent from "@/components/renderStepContent";
import containerimg from "@/img/container.png";
import axios from "axios";
import googleIcon from "@/img/google.svg";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function SignUp() {
  const [step, setStep] = useState<Step>(Step.DETAILS);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [currtoken, setToken] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignUpForm>();

  async function submitForm(data: SignUpForm) {
    await onSubmit(
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
  // const simulateAsyncOperation = (duration = 1000) => new Promise((resolve) => setTimeout(resolve, duration));
  if ((isGoogleLoading || isLoading) && !localStorage.getItem("first")) {
    return <Loader text="For first time loading it will take 50-60 seconds" />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-start justify-center p-4 lg:w-2/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="flex flex-col gap-2 lg:items-start items-center">
            <h1 className="text-xl font-bold">Sign up</h1>
            <p className="text-sm text-secondary dark:text-gray-400">
              Sign up to enjoy the feature of HD
            </p>
          </div>

          <form onSubmit={handleSubmit(submitForm)} className="space-y-6 gap-4">
            {renderStepContent(step, { register, errors, getValues })}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : step === Step.DETAILS ? (
                "Continue"
              ) : step === Step.OTP ? (
                "Verify OTP"
              ) : (
                "Complete Sign Up"
              )}
            </Button>
          </form>

          {step === Step.DETAILS && (
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
                    Continue with Google
                    <img
                      src={googleIcon}
                      alt="Google"
                      className="ml-2 h-6 w-6"
                    />
                  </>
                )}
              </Button>
            </>
          )}

          <p className="text-center text-[14px] text-gray-600 dark:text-gray-400">
            Already have an account??{"   "}
            <Link
              to="/signin"
              className="font-semibold text-blue-500 underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:block lg:w-3/5 h-[calc(100vh+48px)] absolute top-2 right-2 font-semibold">
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
