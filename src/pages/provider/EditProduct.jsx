import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiRequest } from '../../data/api';
import { ArrowLeft, Upload, X } from 'lucide-react';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: 'Outdoor Solar',
    price: '',
    stock: '',
    wattage: '',
    description: '',
    features: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiRequest(`/products/${id}`)
      .then(({ product }) => {
        setForm({
          name: product.name,
          category: product.category || 'Outdoor Solar',
          price: String(product.price),
          stock: String(product.stock),
          wattage: product.wattage || '',
          description: product.description || '',
          features: Array.isArray(product.features) ? product.features.join(', ') : '',
        });
        if (product.image) setExistingImage(product.image);
        setLoading(false);
      })
      .catch((requestError) => {
        setError(requestError.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setExistingImage(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImage(null);
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
    payload.append('features', JSON.stringify(form.features.split(',').map((f) => f.trim()).filter(Boolean)));
    if (imageFile) payload.append('image', imageFile);

    try {
      await apiRequest(`/products/${id}`, { method: 'PUT', body: payload });
      navigate('/provider/products');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-[#4a5565]">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-[960px] mx-auto">
        {/* Back link */}
        <Link
          to="/provider/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-6"
        >
          <ArrowLeft size={16} /> Back to product list
        </Link>

        <h1 className="text-2xl font-bold text-[#10162b] mb-8">Edit Product #{id}</h1>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                <h2 className="text-sm font-bold text-[#10162b] mb-5">Description</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                <h2 className="text-sm font-bold text-[#10162b] mb-5">Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Product Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition bg-white"
                    >
                      <option>Outdoor Solar</option>
                      <option>Indoor Solar</option>
                      <option>Solar Kits</option>
                      <option>Accessories</option>
                      <option>Batteries</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Wattage</label>
                    <input
                      type="text"
                      name="wattage"
                      value={form.wattage}
                      onChange={handleChange}
                      placeholder="e.g. 18W"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                <h2 className="text-sm font-bold text-[#10162b] mb-5">Inventory</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Features</label>
                    <input
                      type="text"
                      name="features"
                      value={form.features}
                      onChange={handleChange}
                      placeholder="Comma-separated features"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Product Image */}
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                <h2 className="text-sm font-bold text-[#10162b] mb-5">Product Image</h2>
                {(imagePreview || existingImage) ? (
                  <div className="relative">
                    <img
                      src={imagePreview || existingImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-red-500 hover:bg-white transition shadow"
                    >
                      <X size={14} />
                    </button>
                    {imageFile && (
                      <p className="mt-2 text-xs text-[#4a5565] truncate">{imageFile.name}</p>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-[#f5a623]/40 hover:bg-[#f5a623]/[0.02] transition">
                    <div className="w-12 h-12 rounded-full bg-[#f5a623]/10 flex items-center justify-center mb-3">
                      <Upload size={20} className="text-[#f5a623]" />
                    </div>
                    <p className="text-sm font-semibold text-[#10162b]">Click to upload</p>
                    <p className="text-xs text-[#4a5565] mt-1">PNG, JPG up to 5MB</p>
                    <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  </label>
                )}
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                <h2 className="text-sm font-bold text-[#10162b] mb-5">Pricing</h2>
                <div>
                  <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Price (KES)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <Link
              to="/provider/products"
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#4a5565] hover:bg-gray-50 transition"
            >
              Discard
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition shadow-lg shadow-[#f5a623]/20"
            >
              {isSubmitting ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
