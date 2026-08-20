function Support() {
  const tickets = [
    { title: 'Installation question', status: 'Open' },
    { title: 'Replacement request', status: 'Resolved' },
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
            <span className="eyebrow">Support center</span>
            <h1>Customer support</h1>
          </div>
        </div>

        <div className="ticket-list">
          {tickets.map((ticket) => (
            <div className="ticket-item" key={ticket.title}>
              <div>
                <h3>{ticket.title}</h3>
                <p>Updated 2 hours ago</p>
              </div>
              <span className="status-badge success">{ticket.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Support;
