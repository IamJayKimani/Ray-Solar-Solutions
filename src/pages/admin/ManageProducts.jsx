function ManageProducts() {
  const products = [
    { name: 'Astra Solar Lantern', stock: 24, status: 'Approved' },
    { name: 'Helio Street Light', stock: 11, status: 'Approved' },
    { name: 'Summit Work Light', stock: 14, status: 'Flagged' },
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
            <span className="eyebrow">Catalog</span>
            <h1>Manage products</h1>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td><span className="status-badge success">{product.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageProducts;
