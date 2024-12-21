import { useState, useEffect } from 'react';
import CompanyCSS from './company.module.css';
import instance from '../../config/config';

const AddCompanyModal = ({ onAdd, onClose, fetchCompanies }) => {
    const [newCompany, setNewCompany] = useState({
        name: '',
        userEmails: [],
    });
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUserEmails = async () => {
        try {
            const users = await instance.getUser();
            if (Array.isArray(users)) {
                setUsers(users);
            } else {
                throw new Error("Invalid data format for users.");
            }
        } catch (err) {
            setError("Failed to fetch user emails.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUserEmails();
    }, []);

    const handleChange = (e) => {
        const { value, checked } = e.target;
        setNewCompany((prev) => ({
            ...prev,
            userEmails: checked
                ? [...prev.userEmails, value]
                : prev.userEmails.filter((email) => email !== value),
        }));
    };

    const handleSubmit = async () => {
        if (!newCompany.name || newCompany.userEmails.length === 0) {
            alert('Please fill in all fields and select at least one user email.');
            return;
        }

        setIsSubmitting(true);

        try {
            await instance.addCompany(newCompany.name, newCompany.userEmails);
            await fetchCompanies(); // Gọi lại fetchCompanies từ component cha
            onClose(); // Đóng modal
        } catch (err) {
            setError('An error occurred while adding the company.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
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
                        disabled={isSubmitting} // Disable input during submission
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
                                        disabled={isSubmitting} // Disable during submission
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
                    <button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add'}
                    </button>
                    <button onClick={onClose} disabled={isSubmitting}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyModal;