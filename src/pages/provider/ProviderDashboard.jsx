import { Link } from 'react-router-dom';

const stats = [
  { title: 'Products', value: '42' },
  { title: 'Sales', value: 'KSh 245k' },
  { title: 'Orders', value: '118' },
  { title: 'Support', value: '9 open' },
];

function ProviderDashboard() {
  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Provider</h2>
        <nav>
          <Link to="/provider">Overview</Link>
          <Link to="/provider/products">Manage products</Link>
          <Link to="/provider/products/add">Add product</Link>
          <Link to="/provider/profile">Profile</Link>
          <Link to="/provider/support">Support</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Provider dashboard</span>
            <h1>Solar growth overview</h1>
          </div>
          <Link to="/provider/products/add" className="btn btn-primary">Add new product</Link>
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

export default ProviderDashboard;
