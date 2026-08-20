function ManageProviders() {
  const providers = [
    { name: 'Sunrise Electric Ltd', status: 'Verified', products: 19 },
    { name: 'BrightPath Solar', status: 'Pending', products: 8 },
    { name: 'NightGlow Energy', status: 'Verified', products: 12 },
  ];

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Admin</h2>
        <nav>
          <a href="/admin">Overview</a>
          <a href="/admin/users">Manage users</a>
          <a href="/admin/providers">Manage providers</a>
          <a href="/admin/products">Manage products</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Providers</span>
            <h1>Manage providers</h1>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Products</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.name}>
                  <td>{provider.name}</td>
                  <td>{provider.products}</td>
                  <td><span className="status-badge success">{provider.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageProviders;
