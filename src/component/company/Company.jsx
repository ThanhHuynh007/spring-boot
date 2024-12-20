import CompanyCSS from './company.module.css';
import { useState, useEffect } from 'react';
import AddCompanyModal from './AddCompanyModal';
import instance from '../../config/config';

const Company = () => {
    const [companies, setCompanies] = useState([]); // Initialize with an empty array
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState("");

    // Fetch company data when component mounts
    const fetchCompanies = async () => {
        try {
            const data = await instance.getCompany();
            // If data is an array, set companies state, otherwise handle error
            if (Array.isArray(data)) {
                setCompanies(data);
            } else {
                throw new Error("Invalid data format received.");
            }
        } catch (error) {
            setError("Failed to fetch companies");
            console.error('Request failed', error);
        }
    };

    useEffect(() => {
        fetchCompanies(); // Call fetchCompanies on mount
    }, []); // Empty array ensures this effect runs only once on mount

    const handleAddCompany = (newCompany) => {
        setCompanies([...companies, { ...newCompany, id: Date.now() }]); // Add a new company
    };

    const handleEdit = (company) => {
        setCurrentCompany(company); // Set current company for editing
        setIsModalOpen(true); // Open modal
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete company with ID: ${id}?`)) {
            setCompanies(companies.filter((company) => company.id !== id)); // Delete company by ID
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentCompany(null);
    };

    const handleSave = () => {
        setCompanies(
            companies.map((company) =>
                company.id === currentCompany.id ? currentCompany : company
            )
        );
        handleModalClose();
    };

    return (
        <div className={CompanyCSS.wrapper}>
            <div className={CompanyCSS.main}>
                <div className={CompanyCSS.topbar}>
                    <div className={CompanyCSS.search}>
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
                </div>

                {/* Company List Table */}
                <div className={CompanyCSS.details}>
                    <div className={CompanyCSS.recentOrders}>
                        <div className={CompanyCSS.cardHeader}>
                            <h2>Company List</h2>
                            <button
                                className={CompanyCSS.addCompanyBtn}
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                Add Company
                            </button>
                        </div>

                        {/* Render Table */}
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.length > 0 ? (
                                    companies.map((company) => (
                                        <tr key={company.id}>
                                            <td>{company.id}</td>
                                            <td>{company.name}</td>
                                            <td>{company.address}</td>
                                            <td>{company.password}</td>
                                            <td>
                                                <button
                                                    className={CompanyCSS.editBtn}
                                                    onClick={() => handleEdit(company)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={CompanyCSS.deleteBtn}
                                                    onClick={() => handleDelete(company.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            No companies available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {error && (
                            <div style={{ color: 'red', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {isAddModalOpen && (
                    <AddCompanyModal
                        onAdd={handleAddCompany}
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}

                {/* Edit Modal */}
                {isModalOpen && currentCompany && (
                    <div className={CompanyCSS.modal}>
                        <div className={CompanyCSS.modalContent}>
                            <h2>Edit Company</h2>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={currentCompany.name}
                                    onChange={(e) =>
                                        setCurrentCompany({ ...currentCompany, name: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    value={currentCompany.address}
                                    onChange={(e) =>
                                        setCurrentCompany({ ...currentCompany, address: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="text"
                                    value={currentCompany.password}
                                    onChange={(e) =>
                                        setCurrentCompany({ ...currentCompany, password: e.target.value })
                                    }
                                />
                            </label>
                            <div className={CompanyCSS.modalActions}>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleModalClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Company;
