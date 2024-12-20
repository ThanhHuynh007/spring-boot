// import Sidebar from './Sidebar';
import CompanyCSS from './company.module.css';

// Sample company data
const companies = [
    { id: 1, name: 'TechCorp', address: '123 Tech Street', password: 'pass123', action: '' },
    { id: 2, name: 'InnoTech', address: '456 Innovation Blvd', password: 'inno456', action: '' },
    { id: 3, name: 'Globex', address: '789 Global Ave', password: 'globe789', action: '' },
    { id: 4, name: 'SoftWareX', address: '321 Software Rd', password: 'soft321', action: '' },
];

const Company = () => {
    const handleEdit = (id) => {
        alert(`Edit company with ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete company with ID: ${id}?`)) {
            alert(`Company with ID: ${id} deleted.`);
        }
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
                                onClick={() => alert('Add Company clicked!')}
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
                                                onClick={() => handleEdit(company.id)}
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
            </div>
        </div>
    );
};

export default Company;