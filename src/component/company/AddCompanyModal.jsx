import { useState } from 'react';
import CompanyCSS from './company.module.css';

const AddCompanyModal = ({ onAdd, onClose }) => {
    const [newCompany, setNewCompany] = useState({
        name: '',
        address: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCompany({ ...newCompany, [name]: value });
    };

    const handleSubmit = () => {
        if (!newCompany.name || !newCompany.address || !newCompany.password) {
            alert('Please fill in all fields.');
            return;
        }
        onAdd(newCompany);
        onClose();
    };

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
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={newCompany.address}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="password"
                        value={newCompany.password}
                        onChange={handleChange}
                    />
                </label>
                <div className={CompanyCSS.modalActions}>
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyModal;
