import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />

      <div className="p-6">
        <span className="inline-block bg-[#2F8F7A]/10 text-[#2F8F7A] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          {product.category}
        </span>

        <h3 className="mt-4 text-2xl font-semibold text-[#10162B]">{product.name}</h3>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>{product.wattage}</span>
          <span>★ {product.rating}</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#F5A623] font-mono text-xl">KSh {product.price.toLocaleString()}</p>
          <Link
            to={`/products/${product.id}`}
            className="bg-[#F5A623] text-white px-4 py-2 rounded-full hover:bg-[#D9820B]"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
