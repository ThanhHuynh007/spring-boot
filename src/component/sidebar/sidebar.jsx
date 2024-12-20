import { useState } from 'react';
import SidebarCSS from './sidebar.module.css'; // Updated import name
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [isMenuActive, setMenuActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navigate = useNavigate();

    const handleHover = (index) => {
        setHoveredIndex(index);
    };

    const toggleMenu = () => {
        setMenuActive(!isMenuActive);
    };

    const handleLogout = () => {
        // Xóa thông tin đăng nhập khỏi localStorage
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
        window.localStorage.removeItem("persist:auth");
        console.log("Logged out successfully.");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className={`${SidebarCSS.container} ${isMenuActive ? SidebarCSS.active : ''}`}>
            <div className={`${SidebarCSS.navigation} ${isMenuActive ? SidebarCSS.active : ''}`}>
                <ul>
                    {/* User Section */}
                    <li
                        className={hoveredIndex === 0 ? SidebarCSS.hovered : ''}
                        onMouseOver={() => handleHover(0)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <Link to="#">
                            <span className={SidebarCSS.icon}>
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <span className={SidebarCSS.title}>User</span>
                        </Link>
                    </li>

                    {/* User List Section */}
                    <li
                        className={hoveredIndex === 1 ? SidebarCSS.hovered : ''}
                        onMouseOver={() => handleHover(1)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <Link to="/home">
                            <span className={SidebarCSS.icon}>
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span className={SidebarCSS.title}>User List</span>
                        </Link>
                    </li>

                    {/* Company Section */}
                    <li
                        className={hoveredIndex === 2 ? SidebarCSS.hovered : ''}
                        onMouseOver={() => handleHover(2)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <Link to="/company">
                            <span className={SidebarCSS.icon}>
                                <ion-icon name="business-outline"></ion-icon>
                            </span>
                            <span className={SidebarCSS.title}>Company</span>
                        </Link>
                    </li>

                    {/* Log Out Section */}
                    <li
                        className={hoveredIndex === 3 ? SidebarCSS.hovered : ''}
                        onMouseOver={() => handleHover(3)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <Link to="/login"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                        >
                            <span className={SidebarCSS.icon}>
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                            <span className={SidebarCSS.title}>Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
