
import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
}

interface ProductRecommendationsProps {
  products: Product[];
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ products }) => {
  const addToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // Integrate with SmartCart component
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="mt-4 space-y-3">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                {renderStars(product.rating)}
              </div>
              <div className="text-right ml-4">
                <p className="text-lg font-bold text-blue-600">${product.price}</p>
                <div className="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addToCart(product)}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs px-2 py-1 h-auto"
                  >
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
