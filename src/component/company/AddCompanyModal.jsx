import { useState, useEffect } from 'react';
import CompanyCSS from './company.module.css';
import instance from '../../config/config'; // Assuming this is where your getUser function is defined

const AddCompanyModal = ({ onAdd, onClose }) => {
    const [newCompany, setNewCompany] = useState({
        name: '',
        userEmails: [], // Store selected user emails here
    });
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Fetch user data when modal opens
    const fetchUserEmails = async () => {
        try {
            const users = await instance.getUser();
            if (Array.isArray(users)) {
                setUsers(users); // Store users data
            } else {
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            setError("Failed to fetch user emails");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserEmails(); // Fetch user emails when modal opens
    }, []);

    const handleChange = (e) => {
        const { value, checked } = e.target;

        // If checkbox is checked, add the email to userEmails, otherwise remove it
        setNewCompany(prevState => {
            const userEmails = checked
                ? [...prevState.userEmails, value] // Add email if checked
                : prevState.userEmails.filter(email => email !== value); // Remove email if unchecked
            return { ...prevState, userEmails };
        });
    };

    const handleSubmit = () => {
        if (!newCompany.name || newCompany.userEmails.length === 0) {
            alert('Please fill in all fields and select at least one user email.');
            return;
        }
        onAdd(newCompany); // Pass the new company data to onAdd
        onClose(); // Close the modal
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error if fetching users failed
    }

    return (
        <div className={CompanyCSS.modal}>
            <div className={CompanyCSS.modalContent}>
                <h2>Add New Company</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newCompany.name}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, name: e.target.value })
                        }
                    />
                </label>

                <div className={CompanyCSS.emailList}>
                    <h3>Select User Emails</h3>
                    {users.length > 0 ? (
                        <div className={CompanyCSS.checkboxList}>
                            {users.map((user) => (
                                <label key={user.id} className={CompanyCSS.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                    {user.email}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p>No users available</p>
                    )}
                </div>

                <div className={CompanyCSS.modalActions}>
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyModal;
