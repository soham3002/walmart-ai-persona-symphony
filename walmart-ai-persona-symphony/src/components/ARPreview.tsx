
import React, { useState } from 'react';
import { Camera, Scan, Eye, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ARPreview = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: 'Samsung 55" 4K Smart TV',
    dimensions: '48.4" W x 27.8" H x 2.3" D',
    fitScore: 95
  });

  const toggleAR = () => {
    setIsARActive(!isARActive);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-purple-600" />
          AR Product Preview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Product Info */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">{selectedProduct.name}</h4>
          <p className="text-xs text-gray-600 mb-3">{selectedProduct.dimensions}</p>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {selectedProduct.fitScore}% Room Fit
            </Badge>
          </div>
        </div>

        {/* AR Camera View */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
          {isARActive ? (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="animate-pulse">
                  <Scan className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Scanning your room...</p>
                </div>
                <div className="border-2 border-white/50 rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                  <p className="text-xs">TV positioned in living room</p>
                  <p className="text-xs text-green-300">✓ Perfect size for viewing distance</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Camera preview will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* AR Controls */}
        <div className="flex gap-2">
          <Button 
            onClick={toggleAR}
            className={`flex-1 ${isARActive ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            <Camera className="h-4 w-4 mr-2" />
            {isARActive ? 'Stop AR' : 'Start AR Preview'}
          </Button>
          
          <Button variant="outline" size="icon">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>

        {/* AR Features */}
        <div className="space-y-2">
          <h5 className="font-medium text-sm">AR Features Available:</h5>
          <div className="space-y-1 text-xs text-gray-600">
            <p>• Virtual product placement</p>
            <p>• Room dimension matching</p>
            <p>• Color & lighting simulation</p>
            <p>• Size comparison tools</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
