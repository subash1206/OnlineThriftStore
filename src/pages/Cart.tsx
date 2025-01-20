import React, { useState, useEffect } from 'react';
import { Trash2, CreditCard, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { generateReceipt } from '../utils/receiptUtils';
import QRCodePayment from '../components/QRCodePayment';
import { cleanupStorage } from '../utils/storageUtils';
import { CartItem } from '../types';

export default function Cart() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showQRCode, setShowQRCode] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    cleanupStorage();
    if (user) {
      const items = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
      setCartItems(items);
      const sum = items.reduce((acc: number, item: any) => acc + item.price, 0);
      setTotal(sum);
    }
  }, [user]);

  const handleRemoveFromCart = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      const updatedItems = cartItems.filter((item: any) => item.id !== productId);
      localStorage.setItem(`cart_${user?.id}`, JSON.stringify(updatedItems));
      setCartItems(updatedItems);
      const sum = updatedItems.reduce((acc: number, item: any) => acc + item.price, 0);
      setTotal(sum);
    }
  };

const handlePaymentComplete = async (transactionId: string) => {
  try {
    cleanupStorage(); // Clean up first
    
    const orderData = {
      id: transactionId,
      customerId: user?.id || 'guest',
      customerName: checkoutForm.name,
      phone: checkoutForm.phone,
      address: checkoutForm.address,
      items: cartItems,
      totalAmount: total,
      sellerAmount: total * 0.9,
      platformFee: total * 0.1,
      paymentMethod: 'upi' as const,
      status: 'paid' as const,
      orderDate: new Date().toISOString(),
      paymentTransferredToSeller: false,
      upiTransactionId: transactionId,
      timestamp: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    
    // Store minimal order data
    const minimalOrder = {
      id: orderData.id,
      customerId: orderData.customerId,
      totalAmount: orderData.totalAmount,
      status: orderData.status,
      orderDate: orderData.orderDate,
      items: orderData.items.map(item => ({
        id: item.id,
        name: item.name || 'Unknown',
        price: item.price
      }))
    };
    
    localStorage.setItem('orders', JSON.stringify([...orders.slice(-2), minimalOrder]));

    // Update admin's virtual balance
    const adminBalance = parseFloat(localStorage.getItem('adminBalance') || '0');
    localStorage.setItem('adminBalance', (adminBalance + total).toString());

    // Remove purchased items from featured products
    const featuredProducts = JSON.parse(localStorage.getItem('featuredProducts') || '[]');
    const updatedFeatured = featuredProducts.filter((product: any) =>
        !cartItems.some((item: any) => item.id === product.id)
    );
    localStorage.setItem('featuredProducts', JSON.stringify(updatedFeatured));

    // Clear cart
    localStorage.setItem(`cart_${user?.id}`, '[]');
    setCartItems([]);

    // Generate receipt
    await generateReceipt(orderData);

    alert('Payment successful! Your order has been placed. The seller will be notified once payment is verified.');
    setShowQRCode(false);
    setShowCheckout(false);
  } catch (error) {
    console.error('Error during payment handling:', error);
    alert('An error occurred. Please try again.');
  }
};

const handlePaymentFailed = (error: string) => {
    alert(`Payment failed: ${error}`);
    setShowQRCode(false);
};

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'upi') {
      return;
    }

    try {
      cleanupStorage(); // Clean up before adding new order
      
      const orderData = {
        id: crypto.randomUUID(),
        customerId: user?.id || 'guest',
        customerName: checkoutForm.name,
        phone: checkoutForm.phone,
        address: checkoutForm.address,
        items: cartItems,
        totalAmount: total,
        sellerAmount: total * 0.9,
        platformFee: total * 0.1,
        paymentMethod: 'cod' as const,
        status: 'pending' as const,
        orderDate: new Date().toISOString(),
        paymentTransferredToSeller: false,
        timestamp: new Date().toISOString()
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);

      // Store minimal order data
      const minimalOrder = {
        id: orderData.id,
        customerId: orderData.customerId,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        orderDate: orderData.orderDate,
        items: orderData.items.map(item => ({
          id: item.id,
          name: item.name || 'Unknown',
          price: item.price
        }))
      };

      localStorage.setItem('orders', JSON.stringify([...orders.slice(-2), minimalOrder]));

      // Clear cart
      localStorage.setItem(`cart_${user?.id}`, '[]');
      setCartItems([]);

      await generateReceipt(orderData);
      alert('Order placed successfully! Please pay on delivery.');
      setShowCheckout(false);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please login to view your cart</p>
      </div>
    );
  }

  return (
    <>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item: any) => (
              <div key={item.id} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
                <div className="flex items-start space-x-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-400">{item.description}</p>
                    <div className="mt-2 space-y-1">
                      <p>Size: {item.size}</p>
                      <p>Category: {item.category}</p>
                      <p>Brand: {item.brand}</p>
                      <p>Seller: {item.sellerName}</p>
                      <p>Contact: {item.sellerContact}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{item.price}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="mt-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center py-4 border-t border-gray-600">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-xl">₹{total}</span>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Proceed to Checkout
              </button>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:border-purple-500 focus:ring-purple-500`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                    } border focus:border-purple-500 focus:ring-purple-500`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <textarea
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:border-purple-500 focus:ring-purple-500`}
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('upi');
                        setShowQRCode(true);
                      }}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                        paymentMethod === 'upi'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'border-gray-600'
                      }`}
                    >
                      <QrCode className="h-5 w-5" />
                      <span>UPI QR Code</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('cod');
                        setShowQRCode(false);
                      }}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                        paymentMethod === 'cod'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'border-gray-600'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                {showQRCode ? (
                  <QRCodePayment
                    amount={total}
                    orderId={orderData.id}
                    onPaymentComplete={handlePaymentComplete}
                    onPaymentFailed={handlePaymentFailed}
                  />
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mt-4"
                  >
                    Place Order
                  </button>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
}