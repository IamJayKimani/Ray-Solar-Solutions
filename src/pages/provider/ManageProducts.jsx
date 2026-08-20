import { Link } from 'react-router-dom';
import { getProducts } from '../../data/products';

function ManageProducts() {
  const products = getProducts();
  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Provider</h2>
        <nav>
          <Link to="/provider">Overview</Link>
          <Link to="/provider/products">Manage products</Link>
          <Link to="/provider/products/add">Add product</Link>
          <Link to="/provider/profile">Profile</Link>
          <Link to="/provider/support">Support</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Inventory</span>
            <h1>Manage products</h1>
          </div>
          <Link to="/provider/products/add" className="btn btn-primary">Add product</Link>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>KSh {product.price.toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link to={`/provider/products/edit/${product.id}`} className="mini-btn">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageProducts;
