import { useRef } from 'react';
import Receipt from '../components/Receipt';
import { downloadReceipt } from '../utils/downloadReceipt';

export default function OrderConfirmation({ order }: { order: any }) {
  const receiptRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={receiptRef}>
        <Receipt order={order} />
      </div>
      <button
        onClick={() => downloadReceipt(receiptRef)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download Receipt
      </button>
    </div>
  );
}
