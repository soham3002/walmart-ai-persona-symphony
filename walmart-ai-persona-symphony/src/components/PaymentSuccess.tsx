
import React from 'react';
import { CheckCircle, Package, Download, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaymentSuccessProps {
  orderNumber: string;
  onBackToHome: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ 
  orderNumber, 
  onBackToHome 
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-green-100 p-6 rounded-full">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-600">Your order has been placed successfully</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Package className="h-5 w-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-bold">{orderNumber}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Estimated Delivery</p>
              <p className="font-medium">2-3 Business Days</p>
            </div>
            <div>
              <p className="text-gray-600">Delivery Address</p>
              <p className="font-medium">Dallas, TX</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-4">
              You will receive an email confirmation shortly with tracking details.
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={onBackToHome}>
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
