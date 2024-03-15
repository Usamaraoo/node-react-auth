import axios from "axios";

const axiosConfig = axios.create({
  withCredentials: true,
  headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
  },
  baseURL: process.env.REACT_APP_BaseUrl,
});

export default axiosConfig;
