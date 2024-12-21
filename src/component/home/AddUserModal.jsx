import { useState } from 'react';
import HomeCSS from './home.module.css';
import instance from '../../config/config'; // Assuming this imports the API instance

// eslint-disable-next-line react/prop-types
const AddUserModal = ({ onClose, fetchUsers }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await instance.addUser(
                firstName, lastName, email, password
            );

            if (response.error) {
                setError(response.error);
            } else {
                onClose(); // Close modal
                fetchUsers(); // Refresh user list
            }
        } catch (err) {
            console.error('Error registering user:', err);
            setError('Failed to register user. Please try again later.');
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    return (
        <div className={HomeCSS.modalOverlay}>
            <div className={HomeCSS.modalContent}>
                <h2>Add New User</h2>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(u) => setFirstName(u.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(u) => setLastName(u.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(u) => setEmail(u.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(u) => setPassword(u.target.value)}
                            required
                        />
                    </label>
                    <div className={HomeCSS.modalActions}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add'} {/* Change button text while loading */}
                        </button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
