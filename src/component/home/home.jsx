import { useState, useEffect } from "react";
import HomeCSS from "./home.module.css";
import instance from "../../config/config";

const Home = () => {
    const [users, setUsers] = useState([]); // Lưu danh sách người dùng
    const [error, setError] = useState(""); // Lưu lỗi nếu có

    // Hàm fetch danh sách người dùng
    const fetchUsers = async () => {
        try {
            const response = await instance.getUser();

            // Log phản hồi để kiểm tra dữ liệu trả về
            console.log("Full response:", response);

            // Kiểm tra dữ liệu và cập nhật state
            if (Array.isArray(response)) {
                setUsers(response);
            } else {
                throw new Error("Invalid data format received.");
            }
        } catch (error) {
            setError("Failed to fetch users");
            console.error("Request failed", error);
        }
    };

    // Hàm xử lý xóa người dùng
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                const response = await instance.deleteUser(userId);

                // Kiểm tra nếu có lỗi
                if (response.error) {
                    alert(`Failed to delete user: ${response.error}`);
                } else {
                    alert("User deleted successfully");

                    // Cập nhật lại danh sách người dùng sau khi xóa
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("An error occurred while deleting the user.");
            }
        }
    };

    // Hàm xử lý chỉnh sửa người dùng (giữ placeholder ở đây)
    const handleEdit = (userId) => {
        alert(`Edit user with ID: ${userId}`);
        // Thêm logic chỉnh sửa tại đây (chuyển hướng đến trang chỉnh sửa hoặc hiển thị form)
    };

    // Gọi fetchUsers khi component được render lần đầu
    useEffect(() => {
        fetchUsers();
    }, []);

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
                            <button
                                className={HomeCSS.addUserBtn}
                                onClick={() => alert("Add User clicked!")}
                            >
                                Add User
                            </button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Company</th>
                                    <th>Action</th>
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
                                            <td>{user.companyName}</td>
                                            <td>
                                                <button
                                                    className={HomeCSS.editBtn}
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={HomeCSS.deleteBtn}
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No users found</td>
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
