import { useEffect, useState } from 'react';
import { apiRequest } from '../../data/api';
import { fetchAdminProducts } from '../../data/products';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminProducts().then(setProducts).catch((requestError) => setError(requestError.message));
  }, []);

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.status.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'Approved';
      await apiRequest(`/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ is_active: nextStatus }),
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? {
                ...product,
                is_active: nextStatus,
                status: nextStatus ? 'Approved' : 'Flagged',
              }
            : product
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
          <span className="eyebrow">Catalog</span>
          <h1>Manage products</h1>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="filters-panel">
        <div className="search-field">
          <span aria-hidden="true">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search products by name, category, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>KSh {product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge ${product.status === 'Approved' ? 'success' : ''}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <button
                    className="mini-btn"
                    onClick={() => toggleStatus(product.id, product.status)}
                  >
                    {product.status === 'Approved' ? 'Flag' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  No products found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageProducts;
