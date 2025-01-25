import { config } from "@/lib/utils";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type UseGetDataResponse<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

function useGetData<T>(url: string): UseGetDataResponse<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, config());
        // toast.success("Data fetched successfully");
        setData(response.data);
      } catch (err: any) {
        // console.log(err.status);
        if (err.status === 401) {
          toast.error("Unauthorized access, please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/signin";
        }
        if (err.status === 403) {
          toast.error("Forbidden access, please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/signin";
        }
        if (err.status === 404) {
          toast.error("Resource not found");
          setError("Resource not found");
        }

        if (err.status === 500) {
          toast.error("Internal server error");
          setError("Internal server error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
}

export default useGetData;
