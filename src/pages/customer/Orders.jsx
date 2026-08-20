function Orders() {
  const orders = [
    { id: 'RS-1024', item: 'Astra Solar Lantern', status: 'Delivered', total: 'KSh 4,900' },
    { id: 'RS-1041', item: 'Helio Street Light', status: 'In transit', total: 'KSh 18,900' },
    { id: 'RS-1099', item: 'Dawn Garden Lamp', status: 'Processing', total: 'KSh 7,900' },
  ];

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Customer</h2>
        <nav>
          <a href="/customer">Overview</a>
          <a href="/customer/orders">My orders</a>
          <a href="/customer/cart">Cart</a>
          <a href="/customer/support">Support</a>
          <a href="/customer/profile">Profile</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Order history</span>
            <h1>My orders</h1>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.item}</td>
                  <td><span className="status-badge success">{order.status}</span></td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Orders;
