import { useState } from "react";
import LoginCSS from "./login.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../config/config"; // Import API module

export default function Login() {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold error messages

    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            // Call login function from the API module
            const data = await api.login(email, password);

            if (data && data.access_token) {
                // Lưu token vào localStorage
                localStorage.setItem("access_token", data.access_token);

                // Redirect to the home page after successful login
                navigate("/home"); // Chuyển hướng đến trang home
            } else {
                throw new Error("Token is missing");
            }
        } catch (error) {
            setError("Invalid email or password"); // Display error message
        }
    };


    return (
        <div className={`${LoginCSS["centered-wrapper"]}`}>
            <div className={`${LoginCSS.container} ${isActive ? LoginCSS.active : ""}`} id="container">
                {/* Sign-up Form */}
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
