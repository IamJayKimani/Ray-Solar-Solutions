import { useEffect, useState } from 'react';
import { apiRequest } from '../../data/api';
import StatCard from '../../components/dashboard/StatCard';

function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    total_users: 0,
    total_customers: 0,
    total_providers: 0,
    total_products: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/admin/analytics')
      .then((data) => setMetrics(data))
      .catch((requestError) => setError(requestError.message));
  }, []);

  const stats = [
    { title: 'Users', value: metrics.total_users.toLocaleString() },
    { title: 'Customers', value: metrics.total_customers.toLocaleString() },
    { title: 'Providers', value: metrics.total_providers.toLocaleString() },
    { title: 'Products', value: metrics.total_products.toLocaleString() },
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">System overview</span>
          <h1>Platform analytics</h1>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} />
        ))}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Registered users</td>
              <td>{metrics.total_users}</td>
              <td><span className="status-badge success">Live</span></td>
            </tr>
            <tr>
              <td>Customer accounts</td>
              <td>{metrics.total_customers}</td>
              <td><span className="status-badge success">Live</span></td>
            </tr>
            <tr>
              <td>Provider accounts</td>
              <td>{metrics.total_providers}</td>
              <td><span className="status-badge success">Live</span></td>
            </tr>
            <tr>
              <td>Catalog products</td>
              <td>{metrics.total_products}</td>
              <td><span className="status-badge success">Live</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
