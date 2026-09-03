import { useEffect, useState } from 'react';
import { fetchProviders, updateProviderStatus } from '../../data/providers';
import { Search } from 'lucide-react';

function ManageProviders() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProviders().then(setProviders).catch((requestError) => setError(requestError.message));
  }, []);

  const filtered = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      provider.status.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus !== 'Verified';
      await updateProviderStatus(id, nextStatus);

      setProviders((prev) =>
        prev.map((provider) =>
          provider.id === id
            ? {
                ...provider,
                is_active: nextStatus,
                status: nextStatus ? 'Verified' : 'Suspended',
              }
            : provider
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
          <span className="eyebrow">Providers</span>
          <h1>Manage providers</h1>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="filters-panel">
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            className="search-input"
            type="text"
            placeholder="Search providers by name or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Email</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.name}</td>
                <td>{provider.email}</td>
                <td>{provider.products}</td>
                <td>
                  <span className={`status-badge ${provider.status === 'Verified' ? 'success' : ''}`}>
                    {provider.status}
                  </span>
                </td>
                <td>
                  <button
                    className="mini-btn"
                    onClick={() => toggleStatus(provider.id, provider.status)}
                  >
                    {provider.status === 'Verified' ? 'Suspend' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No providers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageProviders;
