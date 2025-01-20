import { Order } from '../types';
const WEBSITE_UPI = "subash8300409157@okicici";

export const validateUPIId = (upiId: string): boolean => {
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{3,}$/;
  return upiRegex.test(upiId);
};

export const generateUPILink = (amount: number): string => {
  return `upi://pay?pa=${WEBSITE_UPI}&pn=Featured Products&am=${amount}&cu=INR`;
};

export interface PaymentInitiateResponse {
  orderId: string;
  txnToken: string;
  qrCodeUrl: string;
}

export const initiatePayment = async (amount: number): Promise<PaymentInitiateResponse> => {
  try {
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const qrCodeUrl = `upi://pay?pa=${WEBSITE_UPI}&pn=Featured Products&am=${amount}&cu=INR&tn=${orderId}`;

    return {
      orderId,
      txnToken: '', // Not needed for UPI
      qrCodeUrl
    };
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error;
  }
};

export const verifyPayment = async (): Promise<boolean> => {
  try {
    // For demo, simulate payment verification
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error;
  }
};

export const processSellerPayout = async (_order: Order): Promise<boolean> => {
  // Implement actual payout logic here
  // This is a placeholder that simulates payout
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

export const verifyUPIPayment = async (): Promise<boolean> => {
  try {
    // For demo, simulate UPI payment verification
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  } catch (error) {
    console.error('UPI payment verification failed:', error);
    throw error;
  }
}; 