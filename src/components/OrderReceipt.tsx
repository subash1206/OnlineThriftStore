import { Order } from '../types';

interface OrderReceiptProps {
  order: Order;
  showPaymentDetails?: boolean;
}

export function OrderReceipt({ order, showPaymentDetails = false }: OrderReceiptProps) {
  const date = new Date(order.orderDate).toLocaleDateString();
  const time = new Date(order.orderDate).toLocaleTimeString();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-black">
      <div className="text-center border-b-2 pb-4 mb-4">
        <h1 className="text-3xl font-bold mb-2">Order Receipt</h1>
        <p className="text-lg">Order #{order.id.slice(0, 8)}</p>
        <p className="text-sm text-gray-600">{date} at {time}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Customer Details:</h2>
        <p>Name: {order.customerName}</p>
        <p>Phone: {order.phone}</p>
        <p>Address: {order.address}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Order Items:</h2>
        <div className="border-t border-b py-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Seller: {item.sellerName}</p>
              </div>
              <p className="font-semibold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{order.totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Platform Fee:</span>
          <span>₹{order.platformFee}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>

      {showPaymentDetails && (
        <div className="mt-6 pt-4 border-t">
          <h2 className="font-bold mb-2">Payment Information:</h2>
          <p>Method: {order.paymentMethod.toUpperCase()}</p>
          <p>Status: {order.status.toUpperCase()}</p>
          {order.upiTransactionId && (
            <p>Transaction ID: {order.upiTransactionId}</p>
          )}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Thank you for shopping with us!</p>
        <p>For any queries, please contact support.</p>
      </div>
    </div>
  );
}