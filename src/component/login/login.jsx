import React, { useState } from "react";
import LoginCSS from "./login.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../config/config"; // Import API module

export default function Login() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold error messages

    const navigate = useNavigate(); // Initialize useNavigate
    let refreshInterval = null; // Store interval ID for token refresh

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await api.register(firstName, lastName, email, password);

            if (data.access_token) {
                window.localStorage.setItem("persist:auth", JSON.stringify({ token: data.access_token }));
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("password", password);
                // startTokenRefresh();
                navigate("/home");
            } else {
                setError("No token received. Please try again.");
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
            console.error("Registration error:", err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await api.login(email, password);

            if (data && data.token) {  // Kiểm tra kỹ xem có `token` trong phản hồi không
                window.localStorage.setItem("persist:auth", JSON.stringify({ token: data.token }));
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("password", password);

                // Đảm bảo rằng token đã được lưu trước khi chuyển hướng
                console.log("Token saved:", data.token);  // Kiểm tra token

                // startTokenRefresh();

                // Chuyển hướng đến trang home sau khi đã lưu token
                navigate("/home");
            } else {
                setError("Invalid login response. Please try again.");
                console.error("Login response:", data);  // In phản hồi để kiểm tra
            }
        } catch (err) {
            setError("Invalid email or password.");
            console.error("Login error:", err);  // In lỗi chi tiết để kiểm tra
        }
    };





    // const startTokenRefresh = () => {
    //     // Nếu đã có interval, hủy nó trước khi bắt đầu mới
    //     if (refreshInterval) {
    //         clearInterval(refreshInterval);
    //     }

    //     refreshInterval = setInterval(async () => {
    //         const email = window.localStorage.getItem("email");
    //         const password = window.localStorage.getItem("password");

    //         if (email && password) {
    //             try {
    //                 const data = await api.login(email, password);
    //                 if (data && data.access_token) {
    //                     window.localStorage.setItem("persist:auth", JSON.stringify({ token: data.access_token }));
    //                     console.log("Token has been refreshed successfully.");
    //                 }
    //             } catch (error) {
    //                 console.error("Failed to refresh token:", error);
    //             }
    //         }
    //     }, 1680000); // 28 minutes in milliseconds
    // };

    // Cleanup function to clear interval on component unmount
    React.useEffect(() => {
        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    }, []);

    return (
        <div className={`${LoginCSS["centered-wrapper"]}`}>
            <div className={`${LoginCSS.container} ${isActive ? LoginCSS.active : ""}`} id="container">
                {/* Sign-up Form */}
                <div className={`${LoginCSS["form-container"]} ${LoginCSS["sign-up"]}`}>
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input type="text" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Sign-in Form */}
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
                        {error && <div className={LoginCSS.error}>{error}</div>} {/* Display error message */}
                        <a href="#">Forgot Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                {/* Toggle between sign-up and sign-in */}
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
