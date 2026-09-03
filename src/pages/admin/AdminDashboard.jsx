import React from 'react';

export function AdminDashboard() {
  const metrics = [
    { label: 'Total Platform Users', count: 142, status: 'Active' },
    { label: 'Registered Providers', count: 28, status: 'Verified' },
    { label: 'Catalog Products', count: 96, status: 'Live' },
  ];

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Admin Portal</h2>
        <nav>
          <a href="/admin" className="active">Overview</a>
          <a href="/admin/users">Manage Users</a>
          <a href="/admin/providers">Manage Providers</a>
          <a href="/admin/products">Manage Products</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header style={{ marginBottom: '2rem' }}>
          <h1>Admin Overview</h1>
          <p>Platform monitoring and system overview for Ray Solar Solutions.</p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {metrics.map((m, idx) => (
            <div key={idx} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff' }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{m.label}</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>{m.count}</div>
              <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>{m.status}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;