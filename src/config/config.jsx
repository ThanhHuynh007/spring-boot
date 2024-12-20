const BASE_URL = "http://localhost:8080/api";

// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem("access_token");
const getEmail = () => localStorage.getItem("email");
const getPassword = () => localStorage.getItem("password");

// Lưu trữ token và thông tin người dùng vào localStorage
const setTokens = (accessToken, email, password) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
};

// Xóa token khi đăng xuất
const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
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
    const email = getEmail();
    const password = getPassword();

    if (!email || !password) {
        return false; // Return false if no email or password is available
    }

    try {
        // Đăng nhập lại với email và password để lấy access token mới
        const response = await login(email, password);
        return response ? true : false;
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

        const { access_token } = await response.json();
        setTokens(access_token, email, password); // Lưu token và thông tin người dùng
        return { access_token };
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
