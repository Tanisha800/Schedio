import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor to add access token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axiosInstance.post("/auth/refresh");
                const { accessToken } = response.data;

                localStorage.setItem("accessToken", accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");

                if (
                    typeof window !== "undefined" &&
                    !window.location.pathname.includes("/signup")
                ) {
                    window.location.href = "/signup";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
