interface ReceiptProps {
    order: {
      id: string;
      date: string;
      total: number;
      paymentMethod: string;
    };
  }
  
  export default function Receipt({ order }: ReceiptProps) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Receipt</h2>
        <div className="space-y-2">
          <p>Order ID: {order.id}</p>
          <p>Date: {order.date}</p>
          <p>Total: ₹{order.total}</p>
          <p>Payment Method: {order.paymentMethod}</p>
        </div>
      </div>
    );
  }
  