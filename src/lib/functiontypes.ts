import { Otp, SignUser, Step, VerifyResponseType } from "./types";

export interface SendOTPType {
  (
    url: string,
    body: SignUser,
    setStep: SetStepType,
    setToken: SetStepType,
    setIsLoading: SetStepType
  ): Promise<any>;
}

export interface SetStepType {
  (step: any): void;
}

export interface VerifyOTPType {
  (
    url: string,
    body: Otp,
    setStep: SetStepType,
    setToken: SetStepType,
    setIsLoading: SetStepType
  ): Promise<VerifyResponseType | undefined>;
}

export interface SavePasswordType {
  (
    url: string,
    body: { password: string; token: string },
    navigate: (path: string) => void,
    setIsLoading: SetStepType
  ): Promise<any>;
}

interface InputProps {
  register: any;
  errors: any;
  getValues: any;
}

export interface RenderStepContentType {
  (step: Step, data: InputProps): JSX.Element | null;
}
