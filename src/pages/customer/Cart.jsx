function Cart() {
  const items = [
    { name: 'Astra Solar Lantern', qty: 1, price: 'KSh 4,900' },
    { name: 'Dawn Garden Lamp', qty: 2, price: 'KSh 15,800' },
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
            <span className="eyebrow">Shopping cart</span>
            <h1>Your selected items</h1>
          </div>
        </div>

        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>Qty: {item.qty}</p>
              </div>
              <strong>{item.price}</strong>
            </div>
          ))}
        </div>

        <div className="summary-box">
          <div><span>Subtotal</span><strong>KSh 20,700</strong></div>
          <div><span>Shipping</span><strong>KSh 1,200</strong></div>
          <div><span>Total</span><strong>KSh 21,900</strong></div>
          <button className="btn btn-primary full-width" type="button">Proceed to checkout</button>
        </div>
      </main>
    </div>
  );
}

export default Cart;
