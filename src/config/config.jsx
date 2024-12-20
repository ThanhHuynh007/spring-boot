import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

// Lưu trữ token vào localStorage
const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
};

// Xóa token khi đăng xuất
const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

// Tạo instance của Axios với base URL và cấu hình mặc định
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm một interceptor để tự động thêm Bearer token vào mỗi yêu cầu
api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Xử lý phản hồi (response) và tự động làm mới token nếu hết hạn
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                return api(originalRequest); // Gửi lại yêu cầu sau khi làm mới token
            } else {
                clearTokens(); // Xóa token khi refresh thất bại
                window.location.href = "/login"; // Điều hướng đến trang đăng nhập
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

// Làm mới token
const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        return false; // Return false if no refresh token is available
    }

    try {
        const response = await api.post("/auth/refresh", {
            refresh_token: refreshToken,
        });

        if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            setTokens(access_token, refresh_token);
            return true;
        } else {
            console.error("Failed to refresh token:", response.status);
            return false;
        }
    } catch (error) {
        console.error("Token refresh failed:", error);
        return false;
    }
};

// Đăng nhập
const login = async (email, password) => {
    try {
        const response = await api.post("/login", {
            email,
            password,
        });

        const { access_token, refresh_token } = response.data;
        setTokens(access_token, refresh_token);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Đăng xuất
const logout = () => {
    clearTokens();
    window.location.href = "/login"; // Điều hướng tới trang đăng nhập
};

export default {
    api,
    login,
    logout,
};
