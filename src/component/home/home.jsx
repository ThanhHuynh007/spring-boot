// import Sidebar from './Sidebar';
import HomeCSS from './home.module.css';

// Sample user data with id, first_name, last_name, role, and company
const users = [
    { id: 1, first_name: 'David', last_name: 'Smith', role: 'Admin', company: 'TechCorp', image: 'assets/imgs/customer02.jpg' },
    { id: 2, first_name: 'Amit', last_name: 'Sharma', role: 'User', company: 'InnoTech', image: 'assets/imgs/customer01.jpg' },
    { id: 3, first_name: 'John', last_name: 'Doe', role: 'Manager', company: 'Globex', image: 'assets/imgs/customer01.jpg' },
    { id: 4, first_name: 'Sophia', last_name: 'Johnson', role: 'Developer', company: 'SoftWareX', image: 'assets/imgs/customer02.jpg' },
];

const Home = () => {
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

                {/* User List Table */}
                <div className={HomeCSS.details}>
                    <div className={HomeCSS.recentOrders}>
                        <div className={HomeCSS.cardHeader}>
                            <h2>User List</h2>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Company</th>
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

export default Home;
