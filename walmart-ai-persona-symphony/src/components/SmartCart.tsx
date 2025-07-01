
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Tag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

interface SmartCartProps {
  cartItems?: CartItem[];
  onCheckout?: () => void;
}

export const SmartCart: React.FC<SmartCartProps> = ({ cartItems: externalCartItems, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(externalCartItems || [
    { id: 1, name: 'Great Value Organic Bananas', price: 2.48, quantity: 2, category: 'Groceries' },
    { id: 2, name: 'Samsung 55" 4K Smart TV', price: 398.00, quantity: 1, category: 'Electronics' }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Use external cart items if provided
  useEffect(() => {
    if (externalCartItems) {
      setCartItems(externalCartItems);
    }
  }, [externalCartItems]);

  useEffect(() => {
    generateSuggestions();
  }, [cartItems]);

  const generateSuggestions = () => {
    const newSuggestions = [];
    const total = getCartTotal();
    
    if (total > 35 && total < 50) {
      newSuggestions.push('Add $15 more for free shipping!');
    }
    
    if (cartItems.some(item => item.category === 'Groceries')) {
      newSuggestions.push('Don\'t forget milk and bread - frequently bought together!');
    }
    
    if (cartItems.some(item => item.category === 'Electronics')) {
      newSuggestions.push('Consider a protection plan for your electronics');
    }
    
    setSuggestions(newSuggestions);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-blue-600" />
          Smart Cart ({getItemCount()} items)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-blue-600 font-semibold">${item.price}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updateQuantity(item.id, 0)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Your cart is empty</p>
          </div>
        )}

        {/* Smart Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <h5 className="font-medium text-sm flex items-center gap-1">
              <Tag className="h-4 w-4 text-green-600" />
              Smart Suggestions
            </h5>
            {suggestions.map((suggestion, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {suggestion}
              </Badge>
            ))}
          </div>
        )}

        {/* Cart Total */}
        {cartItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-blue-600">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCheckout}>
              <Truck className="h-4 w-4 mr-2" />
              Checkout - Free Shipping
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
