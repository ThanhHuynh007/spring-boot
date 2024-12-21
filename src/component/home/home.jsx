import { useState, useEffect } from 'react'; // Import useEffect
import HomeCSS from './home.module.css';
import AddUserModal from './AddUserModal';
import instance from '../../config/config';

const Home = () => {
    const [users, setUsers] = useState([]); // Start with an empty array
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(""); // Error state for handling fetch errors

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await instance.getUser();
            if (data.error) {
                setError(data.error);
            } else {
                setUsers(data);
            }
        };
        fetchUsers();
    }, []);



    // Fetch user details for editing
    const handleEditOpen = async (userId) => {
        try {
            const userDetails = await instance.getUserDetail(userId); // Fetch user details for editing
            if (userDetails.error) {
                setError(userDetails.error);
            } else {
                setCurrentUser(userDetails); // Set user details in the state
                setIsEditModalOpen(true);
            }
        } catch {
            setError("Error fetching user details");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
            try {
                await instance.deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again later.');
            }
        }
    };


    const handleEditSave = async () => {
        try {
            const { firstName, lastName, email, password, id } = currentUser;
            await instance.updateUser(firstName, lastName, email, password, id);

            await fetchUsers(); // Fetch the updated users list
            setIsEditModalOpen(false); // Close the modal
            setCurrentUser(null);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };



    // Function to reload users
    const fetchUsers = async () => {
        const data = await instance.getUser();
        if (data.error) {
            setError(data.error);
        } else {
            setUsers(data); // Update the users state
        }
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error message if any
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

                <div className={HomeCSS.details}>
                    <div className={HomeCSS.recentOrders}>
                        <div className={HomeCSS.cardHeader}>
                            <h2>User List</h2>
                            <button
                                className={HomeCSS.addUserBtn}
                                onClick={() => setIsAddModalOpen(true)}
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
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.roleName}</td>
                                        <td>{user.companyName}</td>
                                        <td>
                                            <button
                                                className={HomeCSS.editBtn}
                                                onClick={() => handleEditOpen(user.id)} // Open edit modal
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isAddModalOpen && (
                    <AddUserModal
                        onClose={() => setIsAddModalOpen(false)}
                        fetchUsers={fetchUsers}
                    />
                )}

                {isEditModalOpen && currentUser && (
                    <div className={HomeCSS.modal}>
                        <div className={HomeCSS.modalContent}>
                            <h2>Edit User</h2>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    value={currentUser.firstName}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, firstName: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    value={currentUser.lastName}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, lastName: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={currentUser.email}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, email: e.target.value })
                                    }
                                />
                            </label>
                            <div className={HomeCSS.modalActions}>
                                <button onClick={handleEditSave}>Save</button>
                                <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
