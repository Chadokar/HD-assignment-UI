import Loader from "@/components/Loader";
import { lazy, Suspense } from "react";
import { Navigation } from "./types";
const LazySignIn = lazy(() => import("../pages/signin"));
const LazyError = lazy(() => import("../components/Errorelement"));
const LazySignUp = lazy(() => import("../pages/signup"));
const LazyDashboard = lazy(() => import("../pages/dashboard"));
const LazyAuthMediator = lazy(() => import("../components/AuthMediator"));

export const navigation: Navigation[] = [
  {
    path: "/signin",
    label: "Sign In",
    element: (
      <Suspense fallback={<Loader />}>
        <LazySignIn />
      </Suspense>
    ),
    protected: false,
    errorElement: <LazyError />,
  },
  {
    path: "/signup",
    label: "Sign Up",
    element: (
      <Suspense fallback={<Loader />}>
        <LazySignUp />
      </Suspense>
    ),
    protected: false,
    errorElement: <LazyError />,
  },
  {
    path: "/",
    label: "Dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyDashboard />
      </Suspense>
    ),
    protected: true,
    errorElement: <LazyError />,
  },
  {
    path: "/googleauth",
    label: "Google Auth",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyAuthMediator />
      </Suspense>
    ),
    protected: false,
    errorElement: <LazyError />,
  },
];
