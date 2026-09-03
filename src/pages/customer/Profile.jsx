import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getImageUrl } from '../../data/api';
import { User, Mail, Phone, Save, Printer, Edit3, CheckCircle, ShoppingBag, Headphones, Camera } from 'lucide-react';

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    apiRequest('/auth/me').then((data) => {
      setUser(data.user);
      setForm({
        first_name: data.user.first_name || '',
        last_name: data.user.last_name || '',
        phone: data.user.phone || '',
      });
    }).catch(() => {});
    apiRequest('/orders').then((data) => setOrders(data.orders || [])).catch(() => {});
    apiRequest('/support').then((data) => setTickets(data.tickets || [])).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    setError('');
    try {
      const body = new FormData();
      body.append('first_name', form.first_name);
      body.append('last_name', form.last_name);
      body.append('phone', form.phone);
      if (imageFile) body.append('profile_image', imageFile);
      await apiRequest('/auth/me', { method: 'PUT', body });
      setUser((prev) => ({ ...prev, ...form, profile_image: imagePreview || prev.profile_image }));
      setMsg('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const initials = user
    ? `${(user.first_name || '')[0] || ''}${(user.last_name || '')[0] || ''}`.toUpperCase()
    : '?';

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-8">
      {msg && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          <CheckCircle size={18} /> {msg}
        </div>
      )}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#10162b]">Profile</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#4a5565] hover:bg-gray-50 transition"
          >
            <Printer size={16} /> Print
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] disabled:opacity-50 text-white text-sm font-bold transition"
          >
            <Edit3 size={16} /> {saving ? 'Saving...' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left sidebar — user info */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 h-fit">
          <div className="flex flex-col items-center text-center mb-6">
            <label className="relative group cursor-pointer mb-4">
              {imagePreview || user?.profile_image ? (
                <img
                  src={imagePreview || getImageUrl(user.profile_image)}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f5a623] to-[#d9820b] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#f5a623]/20">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            <h2 className="text-lg font-bold text-[#10162b]">
              {user?.first_name || '...'} {user?.last_name || ''}
            </h2>
            <p className="text-sm text-[#4a5565] mt-1">{user?.email || ''}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#f5a623]/10 text-[#d9820b] text-xs font-bold uppercase tracking-wide">
              {user?.role || 'customer'}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-[#f5a623] shrink-0" />
              <span className="text-[#4a5565] truncate">{user?.email || '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-[#f5a623] shrink-0" />
              <span className="text-[#4a5565]">{form.phone || '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-[#f5a623] shrink-0" />
              <span className="text-[#4a5565] capitalize">{user?.role || 'customer'}</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {[
              { key: 'info', label: 'General Information', icon: User },
              { key: 'orders', label: 'Order History', icon: ShoppingBag },
              { key: 'support', label: 'Support Tickets', icon: Headphones },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition flex-1 justify-center ${
                    activeTab === tab.key
                      ? 'bg-white text-[#10162b] shadow-sm'
                      : 'text-[#4a5565] hover:text-[#10162b]'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* General Information */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-sm font-bold text-[#10162b] mb-5">General Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#4a5565] mb-1.5">First name</label>
                  <input
                    type="text" name="first_name" value={form.first_name} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Last name</label>
                  <input
                    type="text" name="last_name" value={form.last_name} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Email</label>
                  <input
                    type="email" value={user?.email || ''} readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-[#4a5565] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Phone</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] disabled:opacity-50 text-white text-sm font-bold transition"
              >
                <Save size={16} /> {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-sm font-bold text-[#10162b] mb-5">Order History</h3>
              {orders.length === 0 ? (
                <p className="text-sm text-[#4a5565] text-center py-8">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                      <div>
                        <p className="text-sm font-bold text-[#10162b]">{order.order_number}</p>
                        <p className="text-xs text-[#4a5565]">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#10162b]">KSh {Number(order.total_amount).toLocaleString()}</p>
                        <span className={`text-xs font-bold ${order.status === 'confirmed' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-500' : 'text-amber-600'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Support */}
          {activeTab === 'support' && (
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-sm font-bold text-[#10162b] mb-5">Support Tickets</h3>
              {tickets.length === 0 ? (
                <p className="text-sm text-[#4a5565] text-center py-8">No tickets yet.</p>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                      <div>
                        <p className="text-sm font-bold text-[#10162b]">{ticket.subject}</p>
                        <p className="text-xs text-[#4a5565]">{formatDate(ticket.created_at)}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ticket.status === 'resolved' ? 'bg-green-50 text-green-700' : ticket.status === 'in_progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
