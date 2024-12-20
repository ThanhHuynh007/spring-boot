import axios from "axios";

// URL của backend
const BASE_URL = "http://localhost:8080/api";

// Khởi tạo axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Lưu trữ token và refresh token
let accessToken = null;
let refreshToken = null;

// Thiết lập interceptor để thêm token vào header
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Xử lý tự động làm mới token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Làm mới token
                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refresh_token: refreshToken,
                });

                accessToken = response.data.access_token;
                refreshToken = response.data.refresh_token;

                // Cập nhật header với token mới
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Gửi lại request
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Điều hướng tới trang đăng nhập nếu làm mới thất bại
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

// Hàm để đăng nhập
export const login = async (credentials) => {
    const response = await api.post("/login", credentials);
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    return response.data;
};

// Hàm để đăng xuất
export const logout = () => {
    accessToken = null;
    refreshToken = null;
    window.location.href = "/login"; // Điều hướng tới trang đăng nhập
};

export default api;
