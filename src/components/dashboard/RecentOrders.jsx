function RecentOrders({ orders }) {
  return (
    <div className="table-card">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Recent activity</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Latest orders</h2>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>KSh {order.amount.toLocaleString()}</td>
              <td>
                <span className={`status-badge ${order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'pending' : ''}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                No recent orders.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;
