export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  type: 'user';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  size: 'S' | 'M' | 'L' | 'XL';
  category: string;
  brand: string;
  gender: 'Male' | 'Female';
  image: string;
  sellerId: string;
  featured: boolean;
  pending: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  userId: string;
  name: string;
  description: string;
  price: number;
  size: string;
  category: string;
  brand: string;
  sellerName: string;
  sellerContact: string;
  image: string;
  sellerUpiId: string;
  upiId: string;
}

export interface UPITransaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  timestamp: string;
}

export interface SellerProduct {
  id: string;
  sellerId: string;
  name: string;
  price: number;
  description: string;
  upiId: string;
  sellerName: string;
  sellerContact: string;
  // ... other existing fields
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  sellerAmount: number;
  platformFee: number;
  status: 'pending' | 'paid' | 'completed' | 'failed';
  paymentMethod: 'upi' | 'cod';
  upiTransactionId?: string;
  paymentTransferredToSeller: boolean;
  sellerTransactionId?: string;
  orderDate: string;
  timestamp: string;
}