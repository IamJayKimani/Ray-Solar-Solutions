import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../data/products';
import { Search, Edit3, Plus, ChevronLeft, ChevronRight, Package } from 'lucide-react';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    fetchProducts().then(setProducts).catch((requestError) => setError(requestError.message));
  }, []);

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8">
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>
      )}

      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#10162b]">My Products</h1>
            <p className="text-sm text-[#4a5565] mt-1">{filtered.length} products total</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
              />
            </div>
            <Link
              to="/provider/products/add"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition whitespace-nowrap"
            >
              <Plus size={16} /> Add product
            </Link>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">ID</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Stock</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-bold text-[#4a5565] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((product, idx) => (
              <tr
                key={product.id}
                className={`border-b border-gray-50 transition-colors hover:bg-[#f5a623]/[0.03] ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-[#f5a623]/[0.02]'
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-[#4a5565]">
                  #{String(product.id).padStart(4, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      {product.image ? (
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#f5a623]/10 text-[#f5a623]">
                          <Package size={14} />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-[#10162b]">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#4a5565]">{product.category || '—'}</td>
                <td className="px-6 py-4 text-sm text-[#4a5565]">{formatDate(product.created_at)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#10162b]">
                  KSh {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-[#4a5565]">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    product.is_active
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      product.is_active ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <Link
                      to={`/provider/products/edit/${product.id}`}
                      className="p-2 rounded-lg text-[#f5a623] hover:bg-[#f5a623]/10 transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-sm text-[#4a5565]">
                  {products.length === 0 ? 'No products yet. Add your first product!' : 'No products found matching your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-[#4a5565]">
              Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg text-[#4a5565] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    p === page
                      ? 'bg-[#f5a623] text-white'
                      : 'text-[#4a5565] hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg text-[#4a5565] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
