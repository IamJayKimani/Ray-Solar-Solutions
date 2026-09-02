import { useEffect, useState } from 'react';
import { fetchUsers, updateUserStatus } from '../../data/users';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers().then(setUsers).catch((requestError) => setError(requestError.message));
  }, []);

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'Active';
      await updateUserStatus(id, nextStatus);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, is_active: nextStatus, status: nextStatus ? 'Active' : 'Suspended' }
            : user
        )
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Users</span>
          <h1>Manage users</h1>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

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
                    onClick={() => toggleStatus(user.id, user.status)}
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
