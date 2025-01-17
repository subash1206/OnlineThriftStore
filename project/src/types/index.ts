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
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'delivered';
  shippingAddress: string;
  phone: string;
  totalAmount: number;
  paymentMethod: 'cod';
}