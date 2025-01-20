import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const status = searchParams.get('Status');
      const orderId = searchParams.get('ORDERID');
      
      if (status === 'TXN_SUCCESS') {
        alert(`Payment successful! Order ID: ${orderId}`);
        // Update order status in localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = orders.map((order: any) => 
          order.id === orderId ? { ...order, status: 'paid' } : order
        );
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      } else {
        alert(`Payment failed! ${searchParams.get('RESPMSG') || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error in payment callback:', error);
      alert('An error occurred while processing payment response.');
    } finally {
      navigate('/cart');
    }
  }, [searchParams, navigate]);

  return (
    <div className="text-center py-8">
      <p>Processing payment...</p>
    </div>
  );
} 