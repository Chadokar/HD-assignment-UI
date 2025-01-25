import { Step } from "@/lib/types";
import Input from "./ui/input";
import { RenderStepContentType } from "@/lib/functiontypes";
import calanderIcon from "@/img/calander.svg";

const renderStepContent: RenderStepContentType = (
  step,
  { register, errors, getValues }
) => {
  // console.log("calnader", calanderIcon);
  switch (step) {
    case Step.DETAILS:
      return (
        <>
          <Input
            id="name"
            label="Full Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <Input
            id="dateOfBirth"
            type="text"
            calendarIcon={calanderIcon}
            label="Date of Birth"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
            error={errors.dateOfBirth?.message}
          />
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
        </>
      );

    case Step.OTP:
      return (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We've sent a verification code to {getValues("email")}
          </p>
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
        </>
      );

    case Step.PASSWORD:
      return (
        <Input
          id="password"
          type="password"
          label="Create Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />
      );

    default:
      return null;
  }
};

export default renderStepContent;
