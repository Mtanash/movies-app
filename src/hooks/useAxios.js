import axios from "axios";
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
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = useCallback(async (url, body) => {
    setLoading(true);

    try {
      const response = await axios.post(url, body);
      setData(response?.data);
      setError(null);
      return response;
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
    postData,
  };
}

export default useAxios;
