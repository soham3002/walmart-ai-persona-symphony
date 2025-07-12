
import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, AlertCircle, CheckCircle, ShoppingCart, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface InventoryItem {
  productId: number;
  name: string;
  stockLevel: number;
  location: string;
  lastUpdated: Date;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  price: number;
  image: string;
  category: string;
}

interface InventoryManagerProps {
  onAddToCart?: (item: InventoryItem) => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ onAddToCart }) => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([
     {
    productId: 1,
    name: 'Samsung 55" 4K Smart TV',
    stockLevel: 12,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'in_stock',
    price: 398.00,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop',
    category: 'Electronics'
  },
  {
    productId: 2,
    name: 'iPhone 15 Pro',
    stockLevel: 3,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'low_stock',
    price: 999.00,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', // updated iPhone image
    category: 'Electronics'
  },
  {
    productId: 3,
    name: 'Nintendo Switch OLED',
    stockLevel: 0,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'out_of_stock',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop',
    category: 'Gaming'
  },
  {
    productId: 4,
    name: 'MacBook Air M2',
    stockLevel: 8,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'in_stock',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
    category: 'Electronics'
  },
  {
    productId: 5,
    name: 'Sony WH-1000XM4 Headphones',
    stockLevel: 15,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'in_stock',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    category: 'Audio'
  },
  {
    productId: 6,
    name: 'Instant Pot Duo 7-in-1',
    stockLevel: 6,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'in_stock',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop',
    category: 'Kitchen'
  },
  {
    productId: 7,
    name: 'Dyson V15 Detect Vacuum',
    stockLevel: 2,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'low_stock',
    price: 749.99,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop', // updated Dyson image
    category: 'Home'
  },
  {
    productId: 8,
    name: 'KitchenAid Stand Mixer',
    stockLevel: 4,
    location: 'Dallas, TX - Store #5021',
    lastUpdated: new Date(),
    status: 'in_stock',
    price: 379.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
    category: 'Kitchen'
  }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory(prev => prev.map(item => ({
        ...item,
        lastUpdated: new Date(),
        stockLevel: Math.max(0, item.stockLevel + Math.floor(Math.random() * 3) - 1)
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'low_stock':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'out_of_stock':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string, stockLevel: number) => {
    const statusConfig = {
      in_stock: { label: `${stockLevel} Available`, className: 'bg-green-100 text-green-800 border-green-200' },
      low_stock: { label: `${stockLevel} Left`, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      out_of_stock: { label: 'Out of Stock', className: 'bg-red-100 text-red-800 border-red-200' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleAddToCart = (item: InventoryItem) => {
    if (item.status === 'out_of_stock') {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive"
      });
      return;
    }

    if (onAddToCart) {
      onAddToCart(item);
    }
    
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Real-Time Inventory ({inventory.length} items)
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <div key={item.productId} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-lg font-bold text-blue-600">${item.price}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                  {getStatusIcon(item.status)}
                </div>
                
                <div className="flex items-center justify-between">
                  {getStatusBadge(item.status, item.stockLevel)}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    Updated {item.lastUpdated.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                <Button 
                  onClick={() => handleAddToCart(item)}
                  disabled={item.status === 'out_of_stock'}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Inventory updates every 10 seconds across all channels
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
