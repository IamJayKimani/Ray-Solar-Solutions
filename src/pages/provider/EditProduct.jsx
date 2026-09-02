import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../data/api';
import BrandHeader from '../../components/layout/BrandHeader';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    wattage: '',
    description: '',
    features: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiRequest(`/products/${id}`)
      .then(({ product }) => {
        setForm({
          name: product.name,
          category: product.category,
          price: String(product.price),
          stock: String(product.stock),
          wattage: product.wattage || '',
          description: product.description || '',
          features: Array.isArray(product.features) ? product.features.join(', ') : '',
        });
      })
      .catch((requestError) => setError(requestError.message));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('name', form.name);
    payload.append('category', form.category);
    payload.append('price', form.price);
    payload.append('stock', form.stock);
    payload.append('wattage', form.wattage);
    payload.append('description', form.description);
    payload.append('features', JSON.stringify(form.features.split(',').map((feature) => feature.trim()).filter(Boolean)));

    try {
      await apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: payload,
      });
      navigate('/provider/products');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BrandHeader />
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

        <form className="profile-card" onSubmit={handleSubmit}>
          <label>
            <span>Product name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            <span>Category</span>
            <input type="text" name="category" value={form.category} onChange={handleChange} />
          </label>
          <label>
            <span>Price</span>
            <input type="text" name="price" value={form.price} onChange={handleChange} />
          </label>
          <label>
            <span>Stock</span>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} />
          </label>
          <label>
            <span>Wattage</span>
            <input type="text" name="wattage" value={form.wattage} onChange={handleChange} />
          </label>
          <label>
            <span>Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
          </label>
          <label>
            <span>Features</span>
            <input type="text" name="features" value={form.features} onChange={handleChange} />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update product'}
          </button>
        </form>
        </main>
      </div>
    </>
  );
}

export default EditProduct;
