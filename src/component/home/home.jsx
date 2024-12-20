import { useState } from 'react';
import HomeCSS from './home.module.css';

const Home = () => {
    const [isMenuActive, setMenuActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Sample user data with id, first_name, last_name, role, and company
    const users = [
        { id: 1, first_name: 'David', last_name: 'Smith', role: 'Admin', company: 'TechCorp', image: 'assets/imgs/customer02.jpg' },
        { id: 2, first_name: 'Amit', last_name: 'Sharma', role: 'User', company: 'InnoTech', image: 'assets/imgs/customer01.jpg' },
        { id: 3, first_name: 'John', last_name: 'Doe', role: 'Manager', company: 'Globex', image: 'assets/imgs/customer01.jpg' },
        { id: 4, first_name: 'Sophia', last_name: 'Johnson', role: 'Developer', company: 'SoftWareX', image: 'assets/imgs/customer02.jpg' },
    ];

    // Handle hover on navigation items
    const handleHover = (index) => {
        setHoveredIndex(index);
    };

    // Toggle menu
    const toggleMenu = () => {
        setMenuActive(!isMenuActive);
    };

    return (
        <div className={`${HomeCSS.container} ${isMenuActive ? HomeCSS.active : ''}`}>
            <div className={`${HomeCSS.navigation} ${isMenuActive ? HomeCSS.active : ''}`}>
                <ul>
                    {/* User Section */}
                    <li
                        className={hoveredIndex === 0 ? HomeCSS.hovered : ''}
                        onMouseOver={() => handleHover(0)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <a href="#">
                            <span className={HomeCSS.icon}>
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <span className={HomeCSS.title}>User</span>
                        </a>
                    </li>

                    {/* User List Section */}
                    <li
                        className={hoveredIndex === 1 ? HomeCSS.hovered : ''}
                        onMouseOver={() => handleHover(1)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <a href="#">
                            <span className={HomeCSS.icon}>
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span className={HomeCSS.title}>User List</span>
                        </a>
                    </li>

                    {/* Company Section */}
                    <li
                        className={hoveredIndex === 2 ? HomeCSS.hovered : ''}
                        onMouseOver={() => handleHover(2)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <a href="#">
                            <span className={HomeCSS.icon}>
                                <ion-icon name="business-outline"></ion-icon>
                            </span>
                            <span className={HomeCSS.title}>Company</span>
                        </a>
                    </li>

                    {/* Log Out Section */}
                    <li
                        className={hoveredIndex === 3 ? HomeCSS.hovered : ''}
                        onMouseOver={() => handleHover(3)}
                        onMouseOut={() => setHoveredIndex(null)}
                    >
                        <a href="#">
                            <span className={HomeCSS.icon}>
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                            <span className={HomeCSS.title}>Log Out</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className={HomeCSS.main}>
                <div className={HomeCSS.topbar}>
                    <div className={HomeCSS.toggle} onClick={toggleMenu}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>

                    <div className={HomeCSS.search}>
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>

                    <div className={HomeCSS.user}>
                        <img src="assets/imgs/customer01.jpg" alt="user" />
                    </div>
                </div>

                {/* Cards */}
                <div className={HomeCSS.cardBox}>
                    {/* Add your card components here */}
                </div>

                {/* User List Table */}
                <div className={HomeCSS.details}>
                    <div className={HomeCSS.recentOrders}>
                        <div className={HomeCSS.cardHeader}>
                            <h2>User List</h2>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.role}</td>
                                        <td>{user.company}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
