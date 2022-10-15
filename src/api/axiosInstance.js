import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/movie";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
