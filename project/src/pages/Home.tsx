import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Load featured products from localStorage
    const products = JSON.parse(localStorage.getItem('featuredProducts') || '[]');
    setFeaturedProducts(products);
  }, []);

  const addToCart = (product: any) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
    const existingItem = cartItems.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    }

    alert('Item added to cart!');
  };

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-purple-400">Welcome to Thrift Monkeys</h1>
        <p className="text-xl text-gray-300">Discover unique fashion treasures at amazing prices</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product: any) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-400">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-400 text-lg">₹{product.price}</p>
                  <p className="text-sm text-gray-400">Size: {product.size}</p>
                </div>
                <button 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
              <div className="text-sm text-gray-400">
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Gender: {product.gender}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Want to Sell Your Clothes?</h2>
        <p className="text-gray-300 mb-4">
          Join our community of sellers and give your pre-loved clothes a second life.
          Submit your items for review, and once approved, they'll be featured on our platform.
        </p>
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          onClick={() => window.location.href = '/dashboard'}
        >
          Submit Items for Review
        </button>
      </section>
    </div>
  );
}