import { useCallback, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function useAxios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, signal, mounted) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url, { signal });
      if (!mounted) return;
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
  };
}

export default useAxios;
