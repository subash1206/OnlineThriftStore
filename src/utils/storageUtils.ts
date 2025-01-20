import { Order, CartItem } from '../types';

const MAX_ORDERS = 3;
const MAX_ITEMS = 3;

export const cleanupStorage = () => {
  try {
    // Clear all non-essential data first
    localStorage.removeItem('pendingPayments');
    localStorage.removeItem('featuredProducts');

    // Keep only essential data with strict limits
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length > MAX_ORDERS) {
      // Keep only the most recent orders
      const recentOrders = orders.slice(-MAX_ORDERS).map((order: Order) => ({
        id: order.id,
        customerId: order.customerId,
        totalAmount: order.totalAmount,
        status: order.status,
        orderDate: order.orderDate,
        // Only keep essential item data
        items: order.items.map((item: CartItem) => ({
          id: item.id,
          name: item.name || 'Unknown',
          price: item.price
        }))
      }));
      localStorage.setItem('orders', JSON.stringify(recentOrders));
    }

    // Clean up cart data
    const allKeys = Object.keys(localStorage);
    const cartKeys = allKeys.filter(key => key.startsWith('cart_'));
    cartKeys.forEach(key => {
      const cartItems = JSON.parse(localStorage.getItem(key) || '[]') as CartItem[];
      if (cartItems.length > MAX_ITEMS) {
        localStorage.setItem(key, JSON.stringify(cartItems.slice(-MAX_ITEMS)));
      }
    });
  } catch (error) {
    console.error('Storage cleanup failed:', error);
    // Emergency cleanup - remove all non-critical data
    ['orders', 'pendingPayments', 'featuredProducts'].forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(`Failed to remove ${key}:`, e);
      }
    });
  }
};