import useGetData from "@/hooks/useGetData";
import { User } from "@/lib/types";
import { useEffect } from "react";
import Loader from "./Loader";
import { Navigate, useLocation } from "react-router-dom";

interface AuthMediatorProps {
  token: string;
  user: User;
}

const AuthMediator = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const { data, error, loading } = useGetData<AuthMediatorProps>(
    `/google?code=${code}`
  );
  const location = useLocation();
  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    }
  }, [data]);
  if (loading) return <Loader />;
  else if (error) return <div>{error}</div>;
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AuthMediator;
