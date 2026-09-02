const CART_KEY = 'ray-solar-cart';

export const getCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const addToCart = (product, quantity = 1) => {
  const nextQuantity = Number(quantity) || 1;
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += nextQuantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      category: product.category,
      quantity: nextQuantity,
    });
  }

  return saveCart(cart);
};

export const updateCartItemQuantity = (productId, quantity) => {
  const nextQuantity = Number(quantity);
  const cart = getCart()
    .map((item) => {
      if (item.id !== productId) return item;
      return { ...item, quantity: nextQuantity };
    })
    .filter((item) => item.id !== productId || item.quantity > 0);

  return saveCart(cart);
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.id !== productId);
  return saveCart(cart);
};

export const clearCart = () => saveCart([]);
