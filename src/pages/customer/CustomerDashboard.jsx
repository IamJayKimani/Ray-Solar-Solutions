import { Link } from 'react-router-dom';

const cards = [
  { title: 'Orders', value: '12', path: '/customer/orders' },
  { title: 'Cart', value: '3 items', path: '/customer/cart' },
  { title: 'Support', value: '2 tickets', path: '/customer/support' },
  { title: 'Profile', value: 'Updated', path: '/customer/profile' },
];

function CustomerDashboard() {
  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Customer</h2>
        <nav>
          <Link to="/customer">Overview</Link>
          <Link to="/customer/orders">My orders</Link>
          <Link to="/customer/cart">Cart</Link>
          <Link to="/customer/support">Support</Link>
          <Link to="/customer/profile">Profile</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Customer dashboard</span>
            <h1>Welcome back, Crystal</h1>
          </div>
          <Link to="/products" className="btn btn-primary">Shop more</Link>
        </div>

        <div className="stats-grid">
          {cards.map((card) => (
            <Link key={card.title} to={card.path} className="stat-card">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
