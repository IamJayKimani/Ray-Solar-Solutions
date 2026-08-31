import { useState } from 'react';
import { getUsers } from '../../data/users';

function ManageUsers() {
  const [users, setUsers] = useState(getUsers());
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
          : user
      )
    );
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Users</span>
          <h1>Manage users</h1>
        </div>
      </div>

      <div className="filters-panel">
        <div className="search-field">
          <span aria-hidden="true">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search users by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-badge ${user.status === 'Active' ? 'success' : ''}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    className="mini-btn"
                    onClick={() => toggleStatus(user.id)}
                  >
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageUsers;
