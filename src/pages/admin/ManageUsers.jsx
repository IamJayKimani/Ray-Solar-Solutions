import React from 'react';

export default function UsersManagement({ users = [], onToggleUserStatus }) {
  return (
    <main className="dashboard-main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Admin portal</span>
          <h1>User Moderation</h1>
        </div>
      </div>

      <div className="ticket-list" style={{ background: '#fff', borderRadius: '8px', padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>#{user.id}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px', textTransform: 'capitalize' }}>{user.role}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={user.active ? 'status-badge success' : 'status-badge'}>
                      {user.active ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => onToggleUserStatus(user.id, !user.active)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        color: '#fff',
                        background: user.active ? '#ef4444' : '#22c55e',
                        cursor: 'pointer'
                      }}
                    >
                      {user.active ? 'Suspend' : 'Activate'}
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