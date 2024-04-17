import axios from "axios";
import ToastAlert from '../Alert/ToastAlert';
export const apiUrl = process.env.REACT_APP_URL;


export const auth = axios.create({
  baseURL: apiUrl,
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
    // "Accept": "*/*",
    // Authorization: "basic QzB6QkVzQXJBSzJOQVl5ME1nUzR1dz09OlF3Smw4S253SzdJNVF6UHJwNTZSaGc9PQ=="
  }
});

auth.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

auth.interceptors.response.use(
  function (response) {
  
    return response;
  },
  function (error) {
    //TODO:
    ToastAlert(error?.response?.data?.message, "error");
    if (error.message === "Network Error") {
       ToastAlert("Please check your network connection", "", "error");
      return Promise.reject(error);
    } else if (error.response.status === 401) {
        ToastAlert(error, "error");
    }
    return Promise.reject(error);
  }
);


export const instance = axios.create({
  baseURL: "http://184.168.124.166:8087/vimal-webapp",
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*"
    // Authorization: "basic QzB6QkVzQXJBSzJOQVl5ME1nUzR1dz09OlF3Smw4S253SzdJNVF6UHJwNTZSaGc9PQ=="
  },
  mode:'no-cors'
});

export const multipartInstance = axios.create({
  baseURL: apiUrl,
  timeout: 500000,
  headers: {
    'Content-Type': 'multipart/form-data',
    //Authorization: "Bearer " + isAceessToken
  }
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.status >= 400 && response.status <= 500) {
      console.log(`Something went wrong! ${response.status}`, "", "error");
      return Promise.reject("Something went wrong!");
    }

    if (response?.data?.error) {
      return Promise.reject(response.data.error);
    }
    console.log("API Success", "success");
    return response;
  },
  function (error) {
    //TODO:
    ToastAlert(error?.response?.data?.message, "error");
    if (error.message === "Network Error") {
      ToastAlert("Please check your network connection", "error");
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      ToastAlert("Unauthorized", "error");
    }
    return Promise.reject(error);
  }
);

//TODO: remove at time of production
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
