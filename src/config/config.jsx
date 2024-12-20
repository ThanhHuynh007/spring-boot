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

// Tạo hàm để gửi request với Bearer token
const fetchWithAuth = async (url, options = {}) => {
    const accessToken = getAccessToken();
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
};

// Xử lý phản hồi (response) và tự động làm mới token nếu hết hạn
const handleResponse = async (response, originalRequest) => {
    if (response.status === 401) {
        // Token expired, try to refresh the access token
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            // Retry original request with the new access token
            return fetchWithAuth(originalRequest.url, originalRequest);
        } else {
            clearTokens(); // Xóa token khi refresh thất bại
            window.location.href = "/login"; // Điều hướng đến trang đăng nhập
        }
    }

    return response;
};

// Làm mới token
const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        return false; // Return false if no refresh token is available
    }

    try {
        const response = await fetchWithAuth(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            const { access_token, refresh_token } = data;
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
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const { access_token, refresh_token } = await response.json();
        setTokens(access_token, refresh_token);
        return { access_token, refresh_token };
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
    fetchWithAuth,
    login,
    logout,
};
