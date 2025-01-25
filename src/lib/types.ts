export interface Navigation {
  path: string;
  label: string;
  element: JSX.Element;
  protected: boolean;
  errorElement: JSX.Element;
}

export interface SignUser {
  email: string;
  name: string;
  // data of birth of type date of birth
  dob?: string;
}

export interface User extends SignUser {
  id: string;
}

export interface Otp {
  otp: number | string;
  token: string;
}

export interface VerifyResponseType {
  user: User;
  token: string;
}

export enum Step {
  DETAILS = "details",
  OTP = "otp",
  PASSWORD = "password",
}

export type SignUpForm = {
  name: string;
  email: string;
  dateOfBirth: string;
  otp?: string | number;
  password?: string;
};

export type SignInForm = {
  email: string;
  password?: string;
  rememberMe: boolean;
  otp?: string | number;
};
