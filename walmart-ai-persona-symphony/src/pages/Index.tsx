import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { SmartCart } from '@/components/SmartCart';
import { CustomerProfile } from '@/components/CustomerProfile';
import { ARPreview } from '@/components/ARPreview';
import { InventoryManager } from '@/components/InventoryManager';
import { CheckoutPreview } from '@/components/CheckoutPreview';
import { PaymentPage } from '@/components/PaymentPage';
import { PaymentSuccess } from '@/components/PaymentSuccess';
import { Menu, X, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'profile' | 'ar' | 'inventory' | 'checkout' | 'payment' | 'success'>('chat');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [orderNumber] = useState(`WM${Date.now().toString().slice(-8)}`);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddToCart = (item: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.productId);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prev,
          {
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            category: item.category,
          },
        ];
      }
    });
  };

  const handleUpdateCartItem = (id: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity === 0) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item => (item.id === id ? { ...item, quantity } : item));
    });
  };

  const handleCheckout = () => {
    setActiveView('checkout');
  };

  const handleProceedToPayment = (details: UserDetails) => {
    setUserDetails(details);
    setActiveView('payment');
  };

  const handlePaymentSuccess = () => {
    setActiveView('success');
    setCartItems([]); // Clear cart after successful payment
  };

  const handleBackToHome = () => {
    setActiveView('chat');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'profile':
        return <CustomerProfile />;
      case 'ar':
        return <ARPreview />;
      case 'inventory':
        return <InventoryManager onAddToCart={handleAddToCart} />;
      case 'checkout':
        return (
          <CheckoutPreview
            cartItems={cartItems}
            onProceedToPayment={handleProceedToPayment}
            onBack={() => setActiveView('chat')}
          />
        );
      case 'payment':
        return userDetails ? (
          <PaymentPage
            cartItems={cartItems}
            userDetails={userDetails}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setActiveView('checkout')}
          />
        ) : null;
      case 'success':
        return (
          <PaymentSuccess
            orderNumber={orderNumber}
            onBackToHome={handleBackToHome}
          />
        );
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-30 w-80 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Walmart AI</h1>
                <p className="text-blue-100 text-sm">Personal Shopper</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <SmartCart
            cartItems={cartItems}
            onCheckout={handleCheckout}
            onUpdateQuantity={handleUpdateCartItem}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <nav className="flex gap-2">
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('chat')}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </Button>
              <Button
                variant={activeView === 'profile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('profile')}
              >
                Profile
              </Button>
              <Button
                variant={activeView === 'ar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('ar')}
              >
                AR Preview
              </Button>
              <Button
                variant={activeView === 'inventory' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('inventory')}
              >
                Inventory
              </Button>
            </nav>
          </div>

          <div className="text-sm text-gray-500">
            Dallas, TX • Store #5021
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto h-full">{renderMainContent()}</div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Index;
