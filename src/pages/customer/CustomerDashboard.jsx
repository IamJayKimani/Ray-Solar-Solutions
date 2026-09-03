import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../data/api';
import { getCart } from '../../data/cart';

function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    apiRequest('/auth/me').then((data) => setUser(data.user)).catch(() => {});
    apiRequest('/orders').then((data) => setOrderCount(data.orders.length)).catch(() => {});
    setCartCount(getCart().length);
  }, []);

  const firstName = user?.first_name || 'there';

  const cards = [
    { title: 'Orders', value: `${orderCount} total`, path: '/customer/orders' },
    { title: 'Cart', value: `${cartCount} items`, path: '/customer/cart' },
    { title: 'Support', value: 'Get help', path: '/customer/support' },
    { title: 'Profile', value: 'Account', path: '/customer/profile' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm font-semibold text-[#4a5565]">Customer dashboard</p>
          <h1 className="text-2xl font-bold text-[#10162b]">Welcome back, {firstName}</h1>
        </div>
        <Link to="/products" className="px-5 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition">
          Shop more
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.title} to={card.path} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition">
            <span className="text-sm font-semibold text-[#4a5565]">{card.title}</span>
            <strong className="block text-xl font-bold text-[#10162b] mt-2">{card.value}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
