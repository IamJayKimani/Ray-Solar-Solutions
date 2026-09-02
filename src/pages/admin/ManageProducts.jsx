import React from 'react';

export default function ProductsModeration({ products = [], onToggleProductStatus }) {
  return (
    <main className="dashboard-main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Admin portal</span>
          <h1>Product Moderation</h1>
        </div>
      </div>

      <div className="ticket-list" style={{ background: '#fff', borderRadius: '8px', padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Product Title</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Price</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>No products available.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>#{product.id}</td>
                  <td style={{ padding: '12px' }}>{product.name}</td>
                  <td style={{ padding: '12px' }}>{product.category || 'Solar'}</td>
                  <td style={{ padding: '12px' }}>${product.price}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={product.active ? 'status-badge success' : 'status-badge'}>
                      {product.active ? 'Live' : 'Hidden'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => onToggleProductStatus(product.id, !product.active)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        color: '#fff',
                        background: product.active ? '#ef4444' : '#22c55e',
                        cursor: 'pointer'
                      }}
                    >
                      {product.active ? 'Unpublish' : 'Publish'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}