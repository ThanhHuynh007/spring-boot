import { useState } from "react";
import LoginCSS from "./login.module.css";
import api from "../../config/config";

export default function Login() {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State để lưu thông báo lỗi

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gọi hàm login từ module api.js
            const data = await api.login(email, password);

            if (data && data.access_token) {
                window.location.href = "/";
            } else {
                throw new Error("Token is missing");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("Invalid email or password"); // Hiển thị lỗi nếu đăng nhập thất bại
        }
    };

    return (

        <div className={`${LoginCSS["centered-wrapper"]}`}>
            <div className={`${LoginCSS.container} ${isActive ? LoginCSS.active : ""}`} id="container">
                {/* Form Đăng ký */}
                <div className={`${LoginCSS["form-container"]} ${LoginCSS["sign-up"]}`}>
                    <form>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="button">Sign Up</button>
                    </form>
                </div>

                {/* Form Đăng nhập */}
                <div className={`${LoginCSS["form-container"]} ${LoginCSS["sign-in"]}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Sign In</h1>

                        <span>or use your email and password</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <div className={LoginCSS.error}>{error}</div>} {/* Hiển thị lỗi nếu có */}
                        <a href="#">Forgot Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                {/* Toggle giữa đăng ký và đăng nhập */}
                <div className={LoginCSS["toggle-container"]}>
                    <div className={LoginCSS.toggle}>
                        <div className={`${LoginCSS["toggle-panel"]} ${LoginCSS["toggle-left"]}`}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all site features</p>
                            <button type="button" className={LoginCSS.hidden} onClick={handleLoginClick}>
                                Sign In
                            </button>
                        </div>
                        <div className={`${LoginCSS["toggle-panel"]} ${LoginCSS["toggle-right"]}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all site features</p>
                            <button type="button" className={LoginCSS.hidden} onClick={handleRegisterClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
