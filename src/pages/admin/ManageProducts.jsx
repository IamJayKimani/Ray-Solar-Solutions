import React, { useState } from 'react';

export function ManageProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState([
    { id: 'PRD-100', title: '400W Monocrystalline Panel', provider: 'Helios Solar Tech', price: '$220', stock: 45 },
    { id: 'PRD-101', title: '5kW Inverter Unit', provider: 'Apex Energy Systems', price: '$850', stock: 12 },
    { id: 'PRD-102', title: 'Lithium Battery Storage 10kWh', provider: 'BrightGrid Power', price: '$2,400', stock: 8 },
  ]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Admin Portal</h2>
        <nav>
          <a href="/admin">Overview</a>
          <a href="/admin/users">Manage Users</a>
          <a href="/admin/providers">Manage Providers</a>
          <a href="/admin/products" className="active">Manage Products</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <h1>Manage Products</h1>
        <input
          type="text"
          placeholder="Filter products by title or provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '360px', padding: '8px 12px', margin: '1rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '8px' }}>Product ID</th>
              <th style={{ padding: '8px' }}>Title</th>
              <th style={{ padding: '8px' }}>Provider</th>
              <th style={{ padding: '8px' }}>Price</th>
              <th style={{ padding: '8px' }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr key={prod.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>{prod.id}</td>
                <td style={{ padding: '8px' }}>{prod.title}</td>
                <td style={{ padding: '8px' }}>{prod.provider}</td>
                <td style={{ padding: '8px' }}>{prod.price}</td>
                <td style={{ padding: '8px' }}>{prod.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ManageProducts;