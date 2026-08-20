import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, saveProducts } from '../../data/products';

function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', category: '', price: '', stock: '', wattage: '', image: '', description: '', features: '',
  });

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      rating: 5,
      wattage: form.wattage,
      stock: Number(form.stock),
      image: form.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
      description: form.description,
      features: form.features.split(',').map((feature) => feature.trim()).filter(Boolean),
    };

    saveProducts([...getProducts(), newProduct]);
    navigate('/provider/products');
  };

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
            <span className="eyebrow">New listing</span>
            <h1>Add product</h1>
          </div>
        </div>

        <form className="profile-card" onSubmit={handleSubmit}>
          <label>
            <span>Product name</span>
            <input name="name" value={form.name} onChange={updateField} type="text" placeholder="Enter product name" required />
          </label>
          <label>
            <span>Category</span>
            <input name="category" value={form.category} onChange={updateField} type="text" placeholder="Outdoor Solar" required />
          </label>
          <label>
            <span>Price</span>
            <input name="price" value={form.price} onChange={updateField} type="number" min="0" max="1000000" placeholder="19000" required />
          </label>
          <label>
            <span>Stock</span>
            <input name="stock" value={form.stock} onChange={updateField} type="number" min="0" placeholder="25" required />
          </label>
          <label><span>Wattage</span><input name="wattage" value={form.wattage} onChange={updateField} type="text" placeholder="18W" required /></label>
          <label><span>Image URL</span><input name="image" value={form.image} onChange={updateField} type="url" placeholder="https://..." /></label>
          <label><span>Description</span><input name="description" value={form.description} onChange={updateField} type="text" placeholder="Describe the product" required /></label>
          <label><span>Features</span><input name="features" value={form.features} onChange={updateField} type="text" placeholder="Motion sensor, Weatherproof" /></label>
          <button className="btn btn-primary" type="submit">Save product</button>
        </form>
      </main>
    </div>
  );
}

export default AddProduct;
