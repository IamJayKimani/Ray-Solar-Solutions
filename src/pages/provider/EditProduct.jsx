import { useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Provider</h2>
        <nav>
          <a href="/provider">Overview</a>
          <a href="/provider/products">Manage products</a>
          <a href="/provider/products/add">Add product</a>
          <a href="/provider/profile">Profile</a>
          <a href="/provider/support">Support</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Update listing</span>
            <h1>Edit product #{id}</h1>
          </div>
        </div>

        <form className="profile-card">
          <label>
            <span>Product name</span>
            <input type="text" defaultValue="Helio Street Light" />
          </label>
          <label>
            <span>Category</span>
            <input type="text" defaultValue="Outdoor Solar" />
          </label>
          <label>
            <span>Price</span>
            <input type="text" defaultValue="KSh 18,900" />
          </label>
          <label>
            <span>Stock</span>
            <input type="number" defaultValue="11" />
          </label>
          <button className="btn btn-primary" type="submit">Update product</button>
        </form>
      </main>
    </div>
  );
}

export default EditProduct;
