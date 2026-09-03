import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest, getImageUrl } from '../../data/api';
import { ArrowLeft, Package } from 'lucide-react';

const fmt = (n) => `KSh ${Number(n).toLocaleString()}`;

const STATUS_COLORS = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  shipped: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest(`/orders/${id}`)
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message));
  }, [id]);

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-[680px] mx-auto">
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <div className="max-w-[680px] mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded-lg" />
            <div className="h-40 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const colors = STATUS_COLORS[order.status] || STATUS_COLORS.pending;

  return (
    <div className="p-8">
      <div className="max-w-[680px] mx-auto">
        <Link to="/customer/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-6">
          <ArrowLeft size={16} />
          Back to orders
        </Link>

        <h1 className="text-2xl font-bold text-[#10162b] mb-6">Order Details</h1>

        {/* Order header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
              <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <span className="text-xs text-[#4a5565]">{formatDate(order.created_at)}</span>
          </div>
          <p className="text-sm font-bold text-[#10162b]">Order ID: {order.order_number}</p>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <h3 className="text-base font-bold text-[#10162b] mb-3">Items</h3>
          <div className="border-t border-gray-100 mb-4" />
          <div className="space-y-4">
            {order.items?.map((item, idx) => (
              <div key={item.id || idx} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center">
                  {item.product_image ? (
                    <img src={getImageUrl(item.product_image)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Package size={20} className="text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#10162b] truncate">{item.product_name || 'Product'}</p>
                  <p className="text-xs text-[#4a5565]">Qty: {item.quantity}</p>
                </div>
                <strong className="text-sm font-bold text-[#10162b]">{fmt(item.unit_price * item.quantity)}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex justify-between text-sm text-[#4a5565] mb-2">
            <span>Subtotal</span>
            <span>{fmt(order.items?.reduce((s, i) => s + i.unit_price * i.quantity, 0) || 0)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#4a5565] mb-3">
            <span>Delivery</span>
            <span>KSh 1,500</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#10162b]">
            <span>Total</span>
            <span>{fmt(order.total_amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
