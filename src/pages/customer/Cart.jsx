import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, updateCartItemQuantity, clearCart } from '../../data/cart';
import { apiRequest } from '../../data/api';
import { Trash2, Minus, Plus, ShoppingCart, CreditCard, ArrowLeft, Smartphone } from 'lucide-react';

const fmt = (n) => `KSh ${n.toLocaleString()}`;

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [phone, setPhone] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState('');
  const [mpesaMsg, setMpesaMsg] = useState('');

  useEffect(() => {
    setItems(getCart());
  }, []);

  const updateQty = (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const next = Math.max(1, item.quantity + delta);
    updateCartItemQuantity(id, next);
    setItems(getCart());
  };

  const removeItem = (id) => {
    removeFromCart(id);
    setItems(getCart());
  };

  const { subtotal, delivery, total } = useMemo(() => {
    const sub = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const del = items.length ? 1500 : 0;
    return { subtotal: sub, delivery: del, total: sub + del };
  }, [items]);

  const handleCheckout = async () => {
    if (!items.length) return;
    if (!phone.trim()) {
      setError('Enter your M-Pesa phone number');
      return;
    }
    setIsCheckingOut(true);
    setError('');
    setMpesaMsg('');
    try {
      const data = await apiRequest('/orders/checkout', {
        method: 'POST',
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          phone: phone.trim(),
        }),
      });
      setMpesaMsg(data.message);
      clearCart();
      setItems([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-6">
          <ArrowLeft size={16} />
          Continue shopping
        </Link>

        <h1 className="text-2xl font-bold text-[#10162b] mb-8">Shopping Cart</h1>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {items.length === 0 && !mpesaMsg && (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-bold text-[#10162b] mb-2">Your cart is empty</h2>
            <p className="text-sm text-[#4a5565] mb-6">Add some solar products to get started.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition">
              Browse products
            </Link>
          </div>
        )}

        {mpesaMsg && (
          <div className="bg-white rounded-2xl border border-green-200 p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CreditCard size={28} className="text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-[#10162b] mb-2">Order placed!</h2>
            <p className="text-sm text-[#4a5565] mb-6">{mpesaMsg}</p>
            <Link to="/customer/orders" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition">
              View my orders
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {/* Left — Product list */}
            <div className="space-y-4">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-[1fr_140px_100px_44px] gap-4 px-5 py-3 text-xs font-bold text-[#4a5565] uppercase tracking-wider">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Price</span>
                <span />
              </div>

              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col md:grid md:grid-cols-[1fr_140px_100px_44px] gap-4 items-center">
                  {/* Product info */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#10162b] truncate">{item.name}</h3>
                      <p className="text-xs text-[#4a5565] mt-0.5">{item.category}</p>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-[#4a5565] hover:bg-gray-50 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-[#10162b]">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-[#4a5565] hover:bg-gray-50 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <strong className="text-sm font-bold text-[#10162b] text-right">{fmt(item.price * item.quantity)}</strong>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition mx-auto md:mx-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right — Summary + Payment */}
            <div className="space-y-5">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="text-base font-bold text-[#10162b] mb-3">Order Summary</h3>
                <div className="border-t border-gray-100 mb-3" />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#4a5565]">
                    <span>Subtotal</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#4a5565]">
                    <span>Delivery</span>
                    <span>{fmt(delivery)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#10162b]">
                    <span>Total</span>
                    <span>{fmt(total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="text-base font-bold text-[#10162b] mb-3">Payment Method</h3>
                <div className="border-t border-gray-100 mb-3" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#f5a623] bg-[#f5a623]/5">
                    <Smartphone size={18} className="text-[#10162b]" />
                    <span className="text-sm font-bold text-[#10162b]">M-Pesa</span>
                  </div>
                </div>
                <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                />
              </div>

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition shadow-lg shadow-[#16a34a]/20"
              >
                {isCheckingOut ? 'Sending STK push...' : 'Check Out'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
