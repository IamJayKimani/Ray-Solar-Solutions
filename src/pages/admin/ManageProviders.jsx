import React, { useState } from 'react';

export function ManageProviders() {
  const [providers, setProviders] = useState([
    { id: 'PRV-01', name: 'Helios Solar Tech', contact: 'helios@solar.com', status: 'Approved' },
    { id: 'PRV-02', name: 'Apex Energy Systems', contact: 'contact@apexenergy.com', status: 'Pending Review' },
    { id: 'PRV-03', name: 'BrightGrid Power', contact: 'info@brightgrid.com', status: 'Approved' },
  ]);

  const toggleStatus = (id) => {
    setProviders(providers.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'Approved' ? 'Suspended' : 'Approved' };
      }
      return p;
    }));
  };

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Admin Portal</h2>
        <nav>
          <a href="/admin">Overview</a>
          <a href="/admin/users">Manage Users</a>
          <a href="/admin/providers" className="active">Manage Providers</a>
          <a href="/admin/products">Manage Products</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <h1>Manage Providers</h1>
        <table style={{ width: '100%', marginTop: '1.5rem', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '8px' }}>Provider ID</th>
              <th style={{ padding: '8px' }}>Name</th>
              <th style={{ padding: '8px' }}>Contact</th>
              <th style={{ padding: '8px' }}>Status</th>
              <th style={{ padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>{p.id}</td>
                <td style={{ padding: '8px' }}>{p.name}</td>
                <td style={{ padding: '8px' }}>{p.contact}</td>
                <td style={{ padding: '8px' }}>{p.status}</td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => toggleStatus(p.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: p.status === 'Approved' ? '#ef4444' : '#10b981',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    {p.status === 'Approved' ? 'Suspend' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ManageProviders;