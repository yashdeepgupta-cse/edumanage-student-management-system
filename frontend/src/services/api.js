
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach JWT token to API requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle expired or invalid JWT tokens
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const requestURL = error.config?.url || "";

        if (
            error.response?.status === 401 &&
            !requestURL.includes("/auth/login")
        ) {
            localStorage.removeItem("token");
            localStorage.removeItem("student");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;
