import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ImageUpload from '../components/ImageUpload';
import { Clock, CheckCircle, XCircle, Upload } from 'lucide-react';
import { Order, SellerProduct, Product } from '../types';

export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState('');
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<SellerProduct[]>([]);
  const [payoutHistory, setPayoutHistory] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      loadSellerData();
    }
  }, [user]);

  const loadSellerData = () => {
    // Load featured products
    const products = JSON.parse(localStorage.getItem('featuredProducts') || '[]');
    setFeaturedProducts(products.filter((p: SellerProduct) => p.sellerId === user?.id));

    // Load payout history
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    setPayoutHistory(orders.filter((order: Order) => 
      order.items.some(item => item.sellerId === user?.id) &&
      order.paymentTransferredToSeller
    ));
  };

  const handleImageUpload = async (
    file: File, 
    title: string, 
    description: string, 
    price: number,
    size: string,
    category: string,
    brand: string,
    gender: string,
    sellerDetails: {
      name: string;
      contact: string;
    }
  ) => {
    try {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const productData = {
          id: crypto.randomUUID(),
          name: title,
          description,
          price,
          size: size as 'S' | 'M' | 'L' | 'XL',
          category,
          brand,
          gender: gender as 'Male' | 'Female',
          image: reader.result as string,
          sellerId: user?.id,
          sellerName: sellerDetails.name,
          sellerContact: sellerDetails.contact,
          pending: !user?.isAdmin,
          featured: user?.isAdmin,
          createdAt: new Date().toISOString()
        } as Product;

        if (user?.isAdmin) {
          // Admin products go directly to featured
          const featuredProducts = JSON.parse(localStorage.getItem('featuredProducts') || '[]');
          localStorage.setItem('featuredProducts', JSON.stringify([...featuredProducts, productData]));
          alert('Product added successfully to featured items!');
        } else {
          // User products go to pending
          const pendingProducts = JSON.parse(localStorage.getItem('pendingProducts') || '[]');
          localStorage.setItem('pendingProducts', JSON.stringify([...pendingProducts, productData]));
          alert('Item uploaded successfully and sent for review!');
        }
        
        setMyProducts(prev => [...prev, productData]);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex items-center space-x-4 mb-6">
          <Upload className="h-8 w-8 text-purple-600" />
          <h2 className="text-2xl font-bold">
            {user?.isAdmin ? 'Add New Product' : 'Submit Item for Review'}
          </h2>
        </div>
        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h2 className="text-2xl font-bold mb-6">My Products</h2>
        
        {myProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map((product: any) => (
              <div 
                key={product.id} 
                className={`${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                } rounded-lg overflow-hidden shadow-lg`}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="flex items-center">
                      {product.pending ? (
                        <div className="flex items-center text-yellow-500">
                          <Clock className="h-5 w-5 mr-1" />
                          <span>Pending</span>
                        </div>
                      ) : product.featured ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span>Featured</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="h-5 w-5 mr-1" />
                          <span>Rejected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 mb-2">{product.description}</p>
                  <div className="space-y-1">
                    <p>Price: ₹{product.price}</p>
                    <p>Size: {product.size}</p>
                    <p>Category: {product.category}</p>
                    <p>Brand: {product.brand}</p>
                    <p>Gender: {product.gender}</p>
                    <p>Seller: {product.sellerName}</p>
                    <p>Contact: {product.sellerContact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <p>Name: {product.name}</p>
                <p>Price: ₹{product.price}</p>
                <p>UPI ID: {product.upiId}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Payout History</h2>
            {payoutHistory.map(order => (
              <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow mb-4">
                <p>Order ID: {order.id}</p>
                <p>Amount Received: ₹{order.sellerAmount}</p>
                <p>Transaction ID: {order.sellerTransactionId}</p>
                <p>Date: {new Date(order.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}