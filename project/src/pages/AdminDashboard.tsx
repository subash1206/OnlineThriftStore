import React, { useState, useEffect } from 'react';
import { ClipboardList, Check, X, ShoppingBag, Trash2, Wallet } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Admin's Google Pay number
const ADMIN_GPAY_NUMBER = "9042035428";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [pendingProducts, setPendingProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [virtualBalance, setVirtualBalance] = useState(0);

  useEffect(() => {
    // Load pending products, featured products, and orders
    const products = JSON.parse(localStorage.getItem('pendingProducts') || '[]');
    const featured = JSON.parse(localStorage.getItem('featuredProducts') || '[]');
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const balance = parseFloat(localStorage.getItem('adminBalance') || '0');
    
    setPendingProducts(products);
    setFeaturedProducts(featured);
    setOrders(allOrders);
    setVirtualBalance(balance);
  }, []);

  const handleApprove = (productId: string) => {
    const product = pendingProducts.find((p: any) => p.id === productId);
    if (!product) return;

    const updatedProduct = { ...product, pending: false, featured: true };
    const updatedFeatured = [...featuredProducts, updatedProduct];
    localStorage.setItem('featuredProducts', JSON.stringify(updatedFeatured));

    const updatedPending = pendingProducts.filter((p: any) => p.id !== productId);
    localStorage.setItem('pendingProducts', JSON.stringify(updatedPending));
    
    setPendingProducts(updatedPending);
    setFeaturedProducts(updatedFeatured);

    alert('Product approved and added to featured items!');
  };

  const handleReject = (productId: string) => {
    if (window.confirm('Are you sure you want to reject this product?')) {
      const updatedPending = pendingProducts.filter((p: any) => p.id !== productId);
      localStorage.setItem('pendingProducts', JSON.stringify(updatedPending));
      setPendingProducts(updatedPending);
      alert('Product rejected and removed.');
    }
  };

  const handleDeleteFeatured = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this featured item?')) {
      const updatedFeatured = featuredProducts.filter((p: any) => p.id !== productId);
      localStorage.setItem('featuredProducts', JSON.stringify(updatedFeatured));
      setFeaturedProducts(updatedFeatured);
      alert('Featured item deleted successfully.');
    }
  };

  const handleOrderDelivered = async (orderId: string) => {
    const order = orders.find((o: any) => o.id === orderId);
    if (!order) return;

    if (!order.paymentTransferredToSeller) {
      const sellerAmount = (order.totalAmount * 0.9).toFixed(2);
      const confirmTransfer = window.confirm(
        `Please ensure you have transferred ₹${sellerAmount} (90%) to the seller's account before marking as delivered.\n\n` +
        `Seller Details:\n` +
        `Name: ${order.items[0].sellerName}\n` +
        `Contact: ${order.items[0].sellerContact}\n\n` +
        `Have you transferred the amount?`
      );

      if (!confirmTransfer) {
        alert('Please transfer the amount to the seller before marking as delivered.');
        return;
      }

      // Update virtual balance
      const newBalance = virtualBalance - parseFloat(sellerAmount);
      localStorage.setItem('adminBalance', newBalance.toString());
      setVirtualBalance(newBalance);
    }

    if (window.confirm('Mark this order as delivered? This will remove it from the list.')) {
      const updatedOrders = orders.filter((o: any) => o.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      alert('Order marked as delivered and removed from list.');
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const updatedOrders = orders.filter((o: any) => o.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      alert('Order cancelled successfully.');
    }
  };

  return (
    <div className="space-y-8">
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg`}>
        <div className="flex items-center space-x-4 mb-6">
          <Wallet className="h-8 w-8 text-purple-500" />
          <div>
            <h2 className="text-2xl font-bold">Virtual Balance</h2>
            <p className="text-xl text-purple-500">₹{virtualBalance.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
            <p className="font-semibold">Platform Fee (10%)</p>
            <p className="text-purple-500">₹{(virtualBalance * 0.1).toFixed(2)}</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
            <p className="font-semibold">To Transfer to Sellers (90%)</p>
            <p className="text-purple-500">₹{(virtualBalance * 0.9).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'products'
              ? 'bg-purple-600 text-white'
              : theme === 'dark'
              ? 'bg-gray-700'
              : 'bg-gray-200'
          }`}
        >
          Pending Reviews
        </button>
        <button
          onClick={() => setActiveTab('featured')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'featured'
              ? 'bg-purple-600 text-white'
              : theme === 'dark'
              ? 'bg-gray-700'
              : 'bg-gray-200'
          }`}
        >
          Featured Items
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'orders'
              ? 'bg-purple-600 text-white'
              : theme === 'dark'
              ? 'bg-gray-700'
              : 'bg-gray-200'
          }`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg`}>
          <div className="flex items-center space-x-4 mb-6">
            <ClipboardList className="h-8 w-8 text-purple-500" />
            <h2 className="text-2xl font-bold">Pending Reviews</h2>
          </div>
          {pendingProducts.length === 0 ? (
            <p className="text-center text-gray-500">No pending products to review</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingProducts.map((product: any) => (
                <div key={product.id} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-400">{product.description}</p>
                    <div className="mt-2 space-y-1">
                      <p>Price: ₹{product.price}</p>
                      <p>Size: {product.size}</p>
                      <p>Category: {product.category}</p>
                      <p>Brand: {product.brand}</p>
                      <p>Gender: {product.gender}</p>
                      <p>Seller: {product.sellerName}</p>
                      <p>Contact: {product.sellerContact}</p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleApprove(product.id)}
                        className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        <Check className="h-5 w-5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(product.id)}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'featured' && (
        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg`}>
          <div className="flex items-center space-x-4 mb-6">
            <ShoppingBag className="h-8 w-8 text-purple-500" />
            <h2 className="text-2xl font-bold">Featured Items</h2>
          </div>
          {featuredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No featured items</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: any) => (
                <div key={product.id} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-400">{product.description}</p>
                    <div className="mt-2 space-y-1">
                      <p>Price: ₹{product.price}</p>
                      <p>Size: {product.size}</p>
                      <p>Category: {product.category}</p>
                      <p>Brand: {product.brand}</p>
                      <p>Gender: {product.gender}</p>
                      <p>Seller: {product.sellerName}</p>
                      <p>Contact: {product.sellerContact}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleDeleteFeatured(product.id)}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span>Delete Item</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'orders' && (
        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg`}>
          <div className="flex items-center space-x-4 mb-6">
            <ShoppingBag className="h-8 w-8 text-purple-500" />
            <h2 className="text-2xl font-bold">Orders</h2>
          </div>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders yet</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div key={order.id} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-lg`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
                      <p className="text-gray-400">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${
                      order.status === 'paid' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {order.status === 'paid' ? 'Paid' : 'Pending Payment'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>Customer: {order.customerName}</p>
                    <p>Phone: {order.phone}</p>
                    <p>Address: {order.address}</p>
                    <p>Payment Method: {order.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}</p>
                    <p>Total Amount: ₹{order.totalAmount}</p>
                    <p>Platform Fee (10%): ₹{(order.totalAmount * 0.1).toFixed(2)}</p>
                    <p>Seller Amount (90%): ₹{(order.totalAmount * 0.9).toFixed(2)}</p>
                    <div className="mt-2 p-2 bg-purple-500/10 rounded-lg">
                      <p className="font-semibold">Seller Details:</p>
                      <p>Name: {order.items[0].sellerName}</p>
                      <p>Contact: {order.items[0].sellerContact}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleOrderDelivered(order.id)}
                      className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      <Check className="h-5 w-5" />
                      <span>Mark Delivered</span>
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                      <span>Cancel Order</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}