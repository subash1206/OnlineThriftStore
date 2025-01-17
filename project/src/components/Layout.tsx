import React from 'react';
import { ShoppingCart, LogIn, UserPlus, LogOut, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} shadow-lg`}>
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">Thrift Monkeys</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-purple-400">Home</Link>
              <Link to="/about" className="hover:text-purple-400">About</Link>
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/cart" className="hover:text-purple-400">Cart</Link>
                  {user.isAdmin ? (
                    <Link to="/admin" className="hover:text-purple-400">Admin Dashboard</Link>
                  ) : (
                    <Link to="/dashboard" className="hover:text-purple-400">Dashboard</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-purple-400"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center space-x-1 hover:text-purple-400">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="flex items-center space-x-1 hover:text-purple-400">
                    <UserPlus className="h-5 w-5" />
                    <span>Sign Up</span>
                  </Link>
                  <Link to="/admin-login" className="hover:text-purple-400">Admin Login</Link>
                </>
              )}
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <Link to="/" className="block hover:text-purple-400">Home</Link>
              <Link to="/about" className="block hover:text-purple-400">About</Link>
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/cart" className="block hover:text-purple-400">Cart</Link>
                  {user.isAdmin ? (
                    <Link to="/admin" className="block hover:text-purple-400">Admin Dashboard</Link>
                  ) : (
                    <Link to="/dashboard" className="block hover:text-purple-400">Dashboard</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-purple-400"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block hover:text-purple-400">Login</Link>
                  <Link to="/signup" className="block hover:text-purple-400">Sign Up</Link>
                  <Link to="/admin-login" className="block hover:text-purple-400">Admin Login</Link>
                </>
              )}
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} py-8 mt-auto`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Thrift Monkeys</h3>
              <p>Your one-stop destination for quality second-hand clothing and accessories.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-purple-400">Home</Link></li>
                <li><Link to="/about" className="hover:text-purple-400">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-purple-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: support@thriftmonkeys.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Thrift Monkeys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}