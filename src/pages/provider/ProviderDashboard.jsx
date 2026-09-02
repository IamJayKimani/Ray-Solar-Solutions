import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProviderProducts } from '../../data/products';
import BrandHeader from '../../components/layout/BrandHeader';

function ProviderDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProviderProducts()
      .then(setProducts)
      .catch((requestError) => setError(requestError.message));
  }, []);

  const stats = [
    { title: 'Products', value: products.length.toLocaleString() },
    { title: 'Inventory value', value: `KSh ${products.reduce((sum, product) => sum + product.price * product.stock, 0).toLocaleString()}` },
    { title: 'Listed stock', value: products.reduce((sum, product) => sum + product.stock, 0).toLocaleString() },
    { title: 'Status', value: products.length ? 'Live' : 'Empty' },
  ];

  return (
    <>
      <BrandHeader />
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

        {error && <p className="form-error" role="alert">{error}</p>}

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
    </>
  );
}

export default ProviderDashboard;
