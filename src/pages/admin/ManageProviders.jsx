import React, { useState } from 'react';

export default function ProvidersManagement({ providers = [], onApproveProvider }) {
  const [selectedProvider, setSelectedProvider] = useState(null);

  return (
    <main className="dashboard-main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Admin portal</span>
          <h1>Provider Approvals & Profiles</h1>
        </div>
      </div>

      <div className="ticket-list" style={{ background: '#fff', borderRadius: '8px', padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Company Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No providers available.</td>
              </tr>
            ) : (
              providers.map((provider) => (
                <tr key={provider.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>#{provider.id}</td>
                  <td style={{ padding: '12px' }}>{provider.company_name || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{provider.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={provider.approved ? 'status-badge success' : 'status-badge'}>
                      {provider.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedProvider(provider)}
                      style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onApproveProvider(provider.id, !provider.approved)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        color: '#fff',
                        background: provider.approved ? '#ef4444' : '#22c55e',
                        cursor: 'pointer'
                      }}
                    >
                      {provider.approved ? 'Revoke' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '450px' }}>
            <h2>{selectedProvider.company_name} Profile</h2>
            <p><strong>Email:</strong> {selectedProvider.email}</p>
            <p><strong>Location:</strong> {selectedProvider.location || 'Nairobi'}</p>
            <p><strong>Status:</strong> {selectedProvider.approved ? 'Approved' : 'Pending Review'}</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedProvider(null)}
                style={{ padding: '8px 16px', borderRadius: '4px', background: '#64748b', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}