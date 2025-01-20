import html2pdf from 'html2pdf.js';
import { Order } from '../types';

export const generateReceipt = async (order: Order): Promise<void> => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  // Render the receipt
  const receiptComponent = document.createElement('div');
  receiptComponent.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">Order Receipt</h1>
      <p style="text-align: center;">Order #${order.id.slice(0, 8)}</p>
      <p style="text-align: center;">${new Date(order.orderDate).toLocaleString()}</p>
      
      <div style="margin: 20px 0; padding: 10px; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Customer Details</h2>
        <p>Name: ${order.customerName}</p>
        <p>Phone: ${order.phone}</p>
        <p>Address: ${order.address}</p>
      </div>

      <div style="margin: 20px 0;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Order Items</h2>
        ${order.items.map(item => `
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin: 20px 0; border-top: 1px solid #eee; padding-top: 10px;">
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
          <span>Subtotal:</span>
          <span>₹${order.totalAmount}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
          <span>Platform Fee:</span>
          <span>₹${order.platformFee}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 5px 0; font-weight: bold;">
          <span>Total:</span>
          <span>₹${order.totalAmount}</span>
        </div>
      </div>

      <div style="margin: 20px 0; padding: 10px; border-top: 1px solid #eee;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Payment Details</h2>
        <p>Method: ${order.paymentMethod.toUpperCase()}</p>
        <p>Status: ${order.status.toUpperCase()}</p>
        ${order.upiTransactionId ? `<p>Transaction ID: ${order.upiTransactionId}</p>` : ''}
      </div>

      <div style="text-align: center; margin-top: 30px; color: #666;">
        <p>Thank you for shopping with us!</p>
        <p>For any queries, please contact support.</p>
      </div>
    </div>
  `;
  container.appendChild(receiptComponent);

  // Generate PDF
  const opt = {
    margin: 1,
    filename: `order-${order.id.slice(0, 8)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(receiptComponent).save();
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}; 