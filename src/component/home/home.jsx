import { useState } from 'react';
import HomeCSS from './home.module.css';
import AddUserModal from './AddUserModal';

const initialUsers = [
    { id: 1, first_name: 'David', last_name: 'Smith', role: 'Admin', company: 'TechCorp' },
    { id: 2, first_name: 'Amit', last_name: 'Sharma', role: 'User', company: 'InnoTech' },
    { id: 3, first_name: 'John', last_name: 'Doe', role: 'Manager', company: 'Globex' },
    { id: 4, first_name: 'Sophia', last_name: 'Johnson', role: 'Developer', company: 'SoftWareX' },
];

const Home = () => {
    const [users, setUsers] = useState(initialUsers);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleAddUser = (newUser) => {
        setUsers([...users, { ...newUser, id: Date.now() }]);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    const handleEditSave = () => {
        setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
        setIsEditModalOpen(false);
        setCurrentUser(null);
    };

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
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.role}</td>
                                        <td>{user.company}</td>
                                        <td>
                                            <button
                                                className={HomeCSS.editBtn}
                                                onClick={() => handleEdit(user)}
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
                        onAdd={handleAddUser}
                        onClose={() => setIsAddModalOpen(false)}
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
                                    value={currentUser.first_name}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, first_name: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    value={currentUser.last_name}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, last_name: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Role:
                                <input
                                    type="text"
                                    value={currentUser.role}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, role: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Company:
                                <input
                                    type="text"
                                    value={currentUser.company}
                                    onChange={(e) =>
                                        setCurrentUser({ ...currentUser, company: e.target.value })
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