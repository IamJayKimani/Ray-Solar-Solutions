import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../data/api";
import BrandHeader from '../../components/layout/BrandHeader';

const initialForm = {
  name: "",
  category: "Outdoor Solar",
  price: "19000",
  stock: "25",
  wattage: "18W",
  description: "",
  features: "Motion sensor, Weatherproof",
};

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-800 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full h-10 rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm text-slate-800 placeholder:text-stone-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

export default function AddProductCard({ onSave = () => {} }) {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    body.set("features", JSON.stringify(form.features.split(",").map((feature) => feature.trim()).filter(Boolean)));
    if (imageFile) body.append("image", imageFile);

    try {
      const data = await apiRequest('/products', { method: 'POST', body });
      onSave(data.product);
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
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-[760px] grid-cols-1 gap-x-5 bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sm:grid-cols-2">
      <h2 className="font-serif text-xl font-medium text-slate-800 mb-6 sm:col-span-2">
        Add product
      </h2>

      <div className="sm:col-span-2">
        <Field label="Product name">
        <input
          type="text"
          placeholder="Enter product name"
          value={form.name}
          onChange={update("name")}
          className={inputClass}
        />
        </Field>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Field label="Category">
            <input
              type="text"
              value={form.category}
              onChange={update("category")}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="flex-1">
          <Field label="Wattage">
            <input
              type="text"
              value={form.wattage}
              onChange={update("wattage")}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Field label="Price (KES)">
            <input
              type="text"
              value={form.price}
              onChange={update("price")}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="flex-1">
          <Field label="Stock">
            <input
              type="text"
              value={form.stock}
              onChange={update("stock")}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="sm:col-span-2">
        <Field label="Product image">
        <div className="flex items-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-amber-300 bg-amber-50 p-3.5">
          <span className="flex-1 text-sm text-stone-500">{fileName}</span>
          <label className="inline-flex h-[30px] cursor-pointer items-center rounded-lg border border-amber-300 bg-white px-3 text-xs text-amber-700">
            Choose file
            <input type="file" onChange={handleFile} className="hidden" />
          </label>
        </div>
        </Field>
      </div>

      <div>
        <Field label="Description">
        <textarea
          placeholder="Describe the product"
          rows={3}
          value={form.description}
          onChange={update("description")}
          className={`${inputClass} h-auto py-2.5 resize-y`}
        />
        </Field>
      </div>

      <div>
        <Field label="Features">
        <input
          type="text"
          value={form.features}
          onChange={update("features")}
          className={inputClass}
        />
        </Field>
      </div>

      {error && <p className="form-error sm:col-span-2" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 w-full rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-sm font-medium text-amber-50 sm:col-span-2"
      >
        {isSubmitting ? 'Saving...' : 'Save product'}
      </button>
      </form>
    </>
  );
}
