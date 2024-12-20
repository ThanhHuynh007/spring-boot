// import Sidebar from './Sidebar';
import CompanyCSS from './company.module.css';
import { useState } from 'react';
import AddCompanyModal from './AddCompanyModal';

// Sample company data
const companiesData = [
    { id: 1, name: 'TechCorp', address: '123 Tech Street', password: 'pass123' },
    { id: 2, name: 'InnoTech', address: '456 Innovation Blvd', password: 'inno456' },
    { id: 3, name: 'Globex', address: '789 Global Ave', password: 'globe789' },
    { id: 4, name: 'SoftWareX', address: '321 Software Rd', password: 'soft321' },
];

const Company = () => {
    const [companies, setCompanies] = useState(companiesData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddCompany = (newCompany) => {
        setCompanies([...companies, { ...newCompany, id: Date.now() }]);
    };

    const handleEdit = (company) => {
        setCurrentCompany(company);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete company with ID: ${id}?`)) {
            setCompanies(companies.filter((company) => company.id !== id));
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
                                {companies.map((company) => (
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isAddModalOpen && (
                    <AddCompanyModal
                        onAdd={handleAddCompany}
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}

                {/* Edit Modal */}
                {isModalOpen && (
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