function ManageUsers() {
  const users = [
    { name: 'Crystal Mucheru', role: 'Customer', status: 'Active' },
    { name: 'Sunrise Electric Ltd', role: 'Provider', status: 'Verified' },
    { name: 'Kenya Lighting Co', role: 'Provider', status: 'Pending' },
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
            <span className="eyebrow">Users</span>
            <h1>Manage users</h1>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td><span className="status-badge success">{user.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageUsers;
