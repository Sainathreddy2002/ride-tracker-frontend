import axios from "axios";
import Cookies from "universal-cookie";
import URL from "./envUrls";
const cookies = new Cookies();

const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  return request;
};
const responseHandler = (response) => {
  const { status } = response;
  if (status === '401') {
    window.location.replace('/');
  }
  return response;
};

// const errorHandler = (error) => {
//   const { response  }:never = error ;
//   const { status } = response;
//   const { pathname } = window.location;
//   if (
//     (status === '401') &&
//       !pathname.includes("login") && !(pathname==="/")
//   ) {
//     window.location.replace('/');
//   }
//   return Promise.reject(error);
// };

const axiosInstance = axios.create({
  baseURL: URL.API.baseURL,
  headers: {
    Authorization: cookies.get("token"),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  request => requestHandler(request),
  // error => errorHandler(error)
);

axiosInstance.interceptors.response.use(
  response => responseHandler(response),
  // error => errorHandler(error)
);

export default axiosInstance;