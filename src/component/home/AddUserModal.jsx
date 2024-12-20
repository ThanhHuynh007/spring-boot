import { useState } from 'react';
import HomeCSS from './home.module.css';

const AddUserModal = ({ onAdd, onClose }) => {
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        role: '',
        company: '',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser.first_name && newUser.last_name && newUser.role && newUser.company) {
            onAdd(newUser);
            onClose();
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className={HomeCSS.modalOverlay}>
            <div className={HomeCSS.modalContent}>
                <h2>Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={newUser.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={newUser.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            name="role"
                            value={newUser.role}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Company:
                        <input
                            type="text"
                            name="company"
                            value={newUser.company}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Profile Image URL:
                        <input
                            type="text"
                            name="image"
                            value={newUser.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className={HomeCSS.modalActions}>
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;