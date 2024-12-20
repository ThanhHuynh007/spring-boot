import { useState, useEffect } from 'react';
import HomeCSS from './home.module.css';
import instance from '../../config/config';

const Home = () => {
    const [users, setUsers] = useState([]); // Sử dụng state để lưu trữ danh sách người dùng
    const [error, setError] = useState(""); // Lưu lỗi nếu có

    const fetchUsers = async () => {
        try {
            const response = await instance.getUser();  // Lấy dữ liệu người dùng

            // Log phản hồi để kiểm tra dữ liệu trả về
            console.log("Full response:", response);

            // Kiểm tra xem phản hồi có phải là một mảng không
            if (Array.isArray(response)) {
                console.log("Fetched users:", response); // Log danh sách người dùng

                // Cập nhật state với dữ liệu người dùng
                setUsers(response);
            } else {
                throw new Error("Invalid data format received.");
            }
        } catch (error) {
            setError("Failed to fetch users");
            console.error('Request failed', error);
        }
    };



    // Sử dụng useEffect để gọi fetchUsers khi component mount
    useEffect(() => {
        fetchUsers();
    }, []);  // Chỉ gọi 1 lần khi component được render lần đầu

    // Nếu có lỗi, hiển thị lỗi
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={HomeCSS.wrapper}>
            <div className={HomeCSS.main}>
                <div className={HomeCSS.topbar}>
                    <div className={HomeCSS.search}>
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
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
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.roleName}</td>
                                            <td>{user.company}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No users found</td> {/* Hiển thị thông báo nếu không có người dùng */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
