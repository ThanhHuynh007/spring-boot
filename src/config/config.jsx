const instance = {
    baseURL: "http://localhost:8080/api",

    async request(url, options = {}) {
        const token = window.localStorage.getItem("persist:auth")
            ? JSON.parse(window.localStorage.getItem("persist:auth")).token
            : null;

        if (token) {
            console.log("Sending request with token:", token); // Debug token
            options.headers = {
                ...options.headers,
                authorization: `Bearer ${token}`,
            };
        }

        try {
            const response = await fetch(`${this.baseURL}${url}`, options);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Request error:", error);
            return { error: error.message };
        }
    },

    async get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    },

    async post(url, body, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
            },
        });
    },

    async delete(url, options = {}) {
        return this.request(url, { ...options, method: "DELETE" });
    },

    async login(email, password) {
        try {
            const data = await this.post("/login", { email, password });
            if (data && data.access_token) {
                window.localStorage.setItem("persist:auth", JSON.stringify({ token: data.access_token }));
            }
            return data;
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            return { error: error.message };
        }
    },

    async register(firstName, lastName, email, password) {
        try {
            const data = await this.post("/register", { firstName, lastName, email, password });
            if (data && data.access_token) {
                window.localStorage.setItem("persist:auth", JSON.stringify({ token: data.access_token }));
            }
            return data;
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            return { error: error.message };
        }
    },

    async getUser() {
        try {
            const data = await this.get("/admin/users");
            return data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return { error: error.message };
        }
    },

    async deleteUser(userId) {
        try {
            const data = await this.delete(`/admin/delete/${userId}`);
            console.log("User deleted successfully:", data);
            return data;
        } catch (error) {
            console.error("Error deleting user:", error);
            return { error: error.message };
        }
    },
};

export default instance;
