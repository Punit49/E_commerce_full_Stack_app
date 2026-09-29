import axios from "axios";
import { useContext } from "react";
import { MyStore } from "../context/AppContext";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_URL || "/api";

const useAPI = () => {
    const { accessToken, setAccessToken } = useContext(MyStore);
    
    const API = axios.create({
        baseURL: baseURL,
        withCredentials: true
    }); 

    API.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    API.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const isAuthRoute = originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/register');
            const isAuthMe = originalRequest.url.includes('/auth/me');

            if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
                originalRequest._retry = true;
                try {
                    const res = await axios.post(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true });
                    const newAccessToken = res.data.accessToken;
                    setAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return API(originalRequest);
                } catch (err) {
                    if (!isAuthMe) {
                        toast.error(err.response?.data?.message || "Session expired. Please login again.");
                    }
                    return Promise.reject(err);
                }
            }
            
            if (!isAuthMe || error.response?.status !== 401) {
                let errorMessage = error.response?.data?.message || error.message || "Something went wrong";
                if (error.response?.data?.error && Array.isArray(error.response.data.error) && error.response.data.error.length > 0) {
                    errorMessage = error.response.data.error[0].msg;
                }
                toast.error(errorMessage);
            }
            
            return Promise.reject(error);
        }
    );

    return API;
}

export default useAPI;