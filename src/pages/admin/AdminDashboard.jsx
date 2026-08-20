import { Link } from 'react-router-dom';

const stats = [
  { title: 'Users', value: '1,248' },
  { title: 'Providers', value: '87' },
  { title: 'Products', value: '364' },
  { title: 'Sales', value: 'KSh 8.9M' },
];

function AdminDashboard() {
  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Admin</h2>
        <nav>
          <Link to="/admin">Overview</Link>
          <Link to="/admin/users">Manage users</Link>
          <Link to="/admin/providers">Manage providers</Link>
          <Link to="/admin/products">Manage products</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">System overview</span>
            <h1>Platform analytics</h1>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.title} className="stat-card">
              <span>{item.title}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
