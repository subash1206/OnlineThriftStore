import React from 'react';
import { Info, Upload, ShoppingBag, Sun, Moon, Truck, CreditCard } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function About() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Info className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold">About Thrift Monkeys</h1>
        </div>

        <div className="space-y-8">
          <section className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Thrift Monkeys is your premier destination for high-quality second-hand clothing. 
              We believe in sustainable fashion and giving pre-loved clothes a second life while 
              making fashion accessible and affordable for everyone.
            </p>
          </section>

          <section className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4">
                <Upload className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Easy Selling</h3>
                  <p className="text-gray-400">Upload your pre-loved clothes with detailed descriptions and images. Our admin team reviews each item to ensure quality.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <ShoppingBag className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Secure Shopping</h3>
                  <p className="text-gray-400">Browse through verified items and shop with confidence. Each item comes with detailed information and seller details.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CreditCard className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Flexible Payments</h3>
                  <p className="text-gray-400">Choose between Google Pay for instant digital payments or Cash on Delivery for your convenience.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Truck className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Reliable Delivery</h3>
                  <p className="text-gray-400">Track your orders and get your items delivered right to your doorstep.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                {theme === 'dark' ? (
                  <Moon className="h-6 w-6 text-purple-600 mt-1" />
                ) : (
                  <Sun className="h-6 w-6 text-purple-600 mt-1" />
                )}
                <div>
                  <h3 className="font-semibold mb-2">Customizable Experience</h3>
                  <p className="text-gray-400">Switch between dark and light themes for comfortable browsing any time of day.</p>
                </div>
              </div>
            </div>
          </section>

          <section className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold mb-2">For Sellers</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                  <li>Create an account and verify your details</li>
                  <li>Upload clear photos of your items</li>
                  <li>Add detailed descriptions and set your price</li>
                  <li>Wait for admin approval (usually within 24 hours)</li>
                  <li>Once approved, your items are listed for sale</li>
                  <li>Get notified when your items are sold</li>
                </ol>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold mb-2">For Buyers</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-400">
                  <li>Browse through our curated collection</li>
                  <li>Add items to your cart</li>
                  <li>Choose your preferred payment method</li>
                  <li>Provide delivery details</li>
                  <li>Track your order status</li>
                  <li>Receive your items and enjoy!</li>
                </ol>
              </div>
            </div>
          </section>

          <section className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-2xl font-semibold mb-6">Contact & Support</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                <strong>Customer Support:</strong><br />
                Email: support@thriftmonkeys.com<br />
                Phone: (555) 123-4567
              </p>
              <p>
                <strong>Business Hours:</strong><br />
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
              <p>
                <strong>Address:</strong><br />
                123 Fashion Street<br />
                Style District<br />
                Fashion City, FC 12345
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}