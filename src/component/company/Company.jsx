import CompanyCSS from './company.module.css';
import { useState, useEffect } from 'react';
import AddCompanyModal from './AddCompanyModal';
import instance from '../../config/config';

const Company = () => {
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState("");

    // Fetch companies from the API
    const fetchCompanies = async () => {
        try {
            const data = await instance.getCompany();
            if (Array.isArray(data)) {
                setCompanies(data);
            } else {
                throw new Error("Invalid data format received.");
            }
        } catch (error) {
            setError("Failed to fetch companies");
            console.error("Request failed", error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleAddCompany = (newCompany) => {
        setCompanies([...companies, { ...newCompany, id: Date.now() }]);
    };

    const handleEdit = (company) => {
        setCurrentCompany(company);
        setIsModalOpen(true);
    };

    const handleEditSave = async () => {
        try {
            if (!currentCompany) return;

            // Call the API to update the company
            await instance.updateCompany(
                currentCompany.name,
                currentCompany.userEmails || [],
                currentCompany.id
            );

            handleModalClose(); // Close modal immediately
            fetchCompanies(); // Refresh the company list
        } catch (error) {
            console.error("Error updating company:", error);
            setError("Failed to update company");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete company with ID: ${id}?`)) {
            try {
                await instance.deleteCompany(id);

                fetchCompanies(); // Refresh the company list
            } catch (error) {
                console.error("Error deleting company:", error);
                setError("Failed to delete company");
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentCompany(null);
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
                        fetchCompanies={fetchCompanies}
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
                            {/* <label>
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
                            </label> */}
                            <div className={CompanyCSS.modalActions}>
                                <button onClick={handleEditSave}>Save</button>
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
