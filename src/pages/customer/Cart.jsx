import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getCart, removeFromCart, updateCartItemQuantity } from '../../data/cart';

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 1200 : 0;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  }, [items]);

  const handleQuantityChange = (productId, nextQuantity) => {
    const quantity = Math.max(1, Number(nextQuantity) || 1);
    updateCartItemQuantity(productId, quantity);
    setItems(getCart());
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setItems(getCart());
  };

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Customer</h2>
        <nav>
          <Link to="/customer">Overview</Link>
          <Link to="/customer/orders">My orders</Link>
          <Link to="/customer/cart">Cart</Link>
          <Link to="/customer/support">Support</Link>
          <Link to="/customer/profile">Profile</Link>
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
          {items.length ? (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <label>
                    <span>Quantity</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <strong>KSh {(item.price * item.quantity).toLocaleString()}</strong>
                  <button type="button" className="btn btn-secondary" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">Your cart is empty. Add a few items from the shop.</div>
          )}
        </div>

        {items.length > 0 && (
          <div className="summary-box">
            <div><span>Subtotal</span><strong>KSh {totals.subtotal.toLocaleString()}</strong></div>
            <div><span>Shipping</span><strong>KSh {totals.shipping.toLocaleString()}</strong></div>
            <div><span>Total</span><strong>KSh {totals.total.toLocaleString()}</strong></div>
            <button className="btn btn-primary full-width" type="button">Proceed to checkout</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
