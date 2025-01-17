import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '../contexts/ThemeContext';

interface QRCodePaymentProps {
  amount: number;
  onPaymentComplete: () => void;
}

// Admin's UPI ID
const UPI_ID = "subash8300409157@okicici";

export default function QRCodePayment({ amount, onPaymentComplete }: QRCodePaymentProps) {
  const { theme } = useTheme();
  
  // Generate UPI payment URL
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=ThriftMonkeys&am=${amount}&cu=INR&tn=Order Payment`;

  const handleVerifyPayment = () => {
    const isConfirmed = window.confirm(
      'Have you completed the payment? Click OK only after you have made the payment and received confirmation.'
    );
    
    if (isConfirmed) {
      onPaymentComplete();
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
      <h3 className="text-xl font-semibold mb-4">Scan QR Code to Pay</h3>
      <div className="bg-white p-4 rounded-lg inline-block mb-4">
        <QRCodeSVG
          value={upiUrl}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>
      <div className="space-y-2 mb-6">
        <p className="font-medium">Amount: ₹{amount}</p>
        <p className="text-sm text-gray-500">UPI ID: {UPI_ID}</p>
      </div>
      <button
        onClick={handleVerifyPayment}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-200"
      >
        Verify Payment
      </button>
      <p className="mt-4 text-sm text-gray-500">
        Please ensure you have completed the payment before clicking verify
      </p>
    </div>
  );
}