import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getImageUrl } from '../../data/api';
import { ChevronRight, Package, ArrowLeft } from 'lucide-react';

const fmt = (n) => `KSh ${Number(n).toLocaleString()}`;

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  shipped: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    apiRequest('/orders')
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter((o) => o.status === activeTab);
  }, [orders, activeTab]);

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8">
      <div className="max-w-[800px] mx-auto px-6 py-10">
        <Link to="/customer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-6">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold text-[#10162b] mb-6">My Orders</h1>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-[#10162b] text-white'
                  : 'bg-white border border-gray-200 text-[#4a5565] hover:border-[#f5a623] hover:text-[#10162b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Order list */}
        <div className="space-y-4">
          {filtered.map((order) => {
            const colors = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
            const firstImage = order.items?.[0]?.product_image;
            const extraCount = order.items?.length > 1 ? order.items.length - 1 : 0;
            const itemNames = order.items?.map((i) => i.product_name).filter(Boolean).join(' | ') || 'No items';

            return (
              <Link to={`/customer/orders/${order.id}`} key={order.id} className="block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition cursor-pointer">
                {/* Status + Date row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-xs text-[#4a5565]">{formatDate(order.created_at)}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>

                {/* Order content */}
                <div className="flex items-center gap-4">
                  {/* Product image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center">
                    {firstImage ? (
                      <img src={getImageUrl(firstImage)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Package size={20} className="text-gray-300" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#10162b]">Order ID: {order.order_number}</h3>
                    <p className="text-xs text-[#4a5565] mt-0.5 truncate">
                      {itemNames}
                      {extraCount > 0 && (
                        <span className="text-[#f5a623] font-semibold"> & {extraCount} more item{extraCount > 1 ? 's' : ''}</span>
                      )}
                    </p>
                    <p className="text-sm font-bold text-[#10162b] mt-1">{fmt(order.total_amount)}</p>
                  </div>
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 && !error && (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-bold text-[#10162b] mb-2">No orders found</h2>
              <p className="text-sm text-[#4a5565] mb-6">
                {activeTab === 'all' ? "You haven't placed any orders yet." : `No ${activeTab} orders.`}
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition">
                Browse products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
