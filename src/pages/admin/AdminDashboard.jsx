import { getUsers } from '../../data/users';
import { getProviders } from '../../data/providers';
import { getProducts } from '../../data/products';
import StatCard from '../../components/dashboard/StatCard';

function AdminDashboard() {
  const users = getUsers();
  const providers = getProviders();
  const products = getProducts();

  const stats = [
    { title: 'Users', value: users.length.toLocaleString() },
    { title: 'Providers', value: providers.length.toLocaleString() },
    { title: 'Products', value: products.length.toLocaleString() },
    { title: 'Revenue', value: 'KSh 8.9M' },
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">System overview</span>
          <h1>Platform analytics</h1>
        </div>
      </div>

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
              <td>New users this month</td>
              <td>142</td>
              <td><span className="status-badge success">+18%</span></td>
            </tr>
            <tr>
              <td>New providers this month</td>
              <td>8</td>
              <td><span className="status-badge success">+12%</span></td>
            </tr>
            <tr>
              <td>Products listed this month</td>
              <td>37</td>
              <td><span className="status-badge success">+24%</span></td>
            </tr>
            <tr>
              <td>Support tickets</td>
              <td>14</td>
              <td><span className="status-badge success">-5%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
