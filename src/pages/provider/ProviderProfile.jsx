import React, { useState } from 'react';

export const ProviderApproval = ({ providers = [], onApprove }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);

  return (
    <div>
      <h2>Provider Approvals & Profiles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Business Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>#{p.id}</td>
              <td style={{ padding: '12px' }}>{p.business_name || 'N/A'}</td>
              <td style={{ padding: '12px' }}>{p.email}</td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  background: p.approved ? '#dcfce7' : '#fef3c7',
                  color: p.approved ? '#15803d' : '#b45309'
                }}>
                  {p.approved ? 'Approved' : 'Pending Review'}
                </span>
              </td>
              <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedProvider(p)}
                  style={{ padding: '6px 12px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  View Profile
                </button>
                {!p.approved ? (
                  <button
                    onClick={() => onApprove(p.id, true)}
                    style={{ padding: '6px 12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => onApprove(p.id, false)}
                    style={{ padding: '6px 12px', background: '#eab308', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Provider Profile Modal */}
      {selectedProvider && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', maxWidth: '500px', width: '100%' }}>
            <h3>Provider Profile Details</h3>
            <p><strong>Business Name:</strong> {selectedProvider.business_name || 'N/A'}</p>
            <p><strong>Contact Email:</strong> {selectedProvider.email}</p>
            <p><strong>Phone:</strong> {selectedProvider.phone || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedProvider.description || 'No description provided.'}</p>
            <p><strong>Approval Status:</strong> {selectedProvider.approved ? 'Approved' : 'Pending Review'}</p>
            <button
              onClick={() => setSelectedProvider(null)}
              style={{ marginTop: '15px', padding: '8px 16px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};