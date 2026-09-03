import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../../data/api";
import { ArrowLeft, Upload, Image as ImageIcon, X } from "lucide-react";

const initialForm = {
  name: "",
  category: "Outdoor Solar",
  price: "",
  stock: "",
  wattage: "18W",
  description: "",
  features: "Motion sensor, Weatherproof",
};

export default function AddProduct() {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    body.set("features", JSON.stringify(form.features.split(",").map((f) => f.trim()).filter(Boolean)));
    if (imageFile) body.append("image", imageFile);

    try {
      await apiRequest('/products', { method: 'POST', body });
      navigate('/provider/products');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <h1 className="text-2xl font-bold text-[#10162b] mb-8">Add New Product</h1>

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
                      placeholder="Enter product name"
                      value={form.name}
                      onChange={update("name")}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Description</label>
                    <textarea
                      placeholder="Describe the product features, benefits, and specifications..."
                      rows={5}
                      value={form.description}
                      onChange={update("description")}
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
                      value={form.category}
                      onChange={update("category")}
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
                      value={form.wattage}
                      onChange={update("wattage")}
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
                      placeholder="0"
                      value={form.stock}
                      onChange={update("stock")}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Features</label>
                    <input
                      type="text"
                      value={form.features}
                      onChange={update("features")}
                      placeholder="Comma-separated features"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Product Images */}
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                <h2 className="text-sm font-bold text-[#10162b] mb-5">Product Image</h2>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
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
                    <p className="mt-2 text-xs text-[#4a5565] truncate">{imageFile?.name}</p>
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
                    placeholder="0"
                    value={form.price}
                    onChange={update("price")}
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
              {isSubmitting ? 'Saving...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
