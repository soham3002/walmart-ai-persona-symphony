
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface PaymentPageProps {
  cartItems: CartItem[];
  userDetails: UserDetails;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

type PaymentMethod = 'upi' | 'debit' | 'credit' | 'netbanking';

export const PaymentPage: React.FC<PaymentPageProps> = ({ 
  cartItems, 
  userDetails, 
  onPaymentSuccess, 
  onBack 
}) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    bankName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful!",
      description: `Your payment of $${getTotalPrice().toFixed(2)} has been processed successfully.`,
    });
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

  const validatePayment = () => {
    switch (selectedMethod) {
      case 'upi':
        return paymentDetails.upiId.includes('@');
      case 'debit':
      case 'credit':
        return paymentDetails.cardNumber.length >= 16 && 
               paymentDetails.expiryDate.length >= 5 && 
               paymentDetails.cvv.length >= 3 &&
               paymentDetails.cardholderName.length > 0;
      case 'netbanking':
        return paymentDetails.bankName.length > 0;
      default:
        return false;
    }
  };

  const PaymentMethodCard = ({ 
    method, 
    icon, 
    title, 
    description 
  }: { 
    method: PaymentMethod; 
    icon: React.ReactNode; 
    title: string; 
    description: string;
  }) => (
    <Card 
      className={`cursor-pointer transition-all ${
        selectedMethod === method 
          ? 'border-blue-500 bg-blue-50' 
          : 'hover:border-gray-300'
      }`}
      onClick={() => setSelectedMethod(method)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            selectedMethod === method ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {selectedMethod === method && (
            <CheckCircle className="h-5 w-5 text-blue-500 ml-auto" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">UPI ID</label>
              <Input
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, upiId: e.target.value }))}
                placeholder="Enter your UPI ID (e.g., user@paytm)"
              />
            </div>
          </div>
        );
      
      case 'debit':
      case 'credit':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Cardholder Name</label>
              <Input
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder="Enter cardholder name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Card Number</label>
              <Input
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                <Input
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">CVV</label>
                <Input
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        );
      
      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Select Bank</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={paymentDetails.bankName}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, bankName: e.target.value }))}
              >
                <option value="">Select your bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
                <option value="Kotak">Kotak Mahindra Bank</option>
                <option value="PNB">Punjab National Bank</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment</h1>
        <Button variant="outline" onClick={onBack}>
          Back to Checkout
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <PaymentMethodCard
                method="upi"
                icon={<Smartphone className="h-4 w-4" />}
                title="UPI"
                description="Pay using UPI ID"
              />
              <PaymentMethodCard
                method="debit"
                icon={<CreditCard className="h-4 w-4" />}
                title="Debit Card"
                description="Pay using debit card"
              />
              <PaymentMethodCard
                method="credit"
                icon={<CreditCard className="h-4 w-4" />}
                title="Credit Card"
                description="Pay using credit card"
              />
              <PaymentMethodCard
                method="netbanking"
                icon={<Building2 className="h-4 w-4" />}
                title="Net Banking"
                description="Pay using internet banking"
              />
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              {renderPaymentForm()}
              <Button 
                onClick={handlePayment}
                disabled={!validatePayment() || isProcessing}
                className="w-full mt-4"
              >
                {isProcessing ? 'Processing...' : `Pay $${getTotalPrice().toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Customer Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Delivery Address</h4>
              <p className="text-sm">{userDetails.name}</p>
              <p className="text-sm">{userDetails.address}</p>
              <p className="text-sm">{userDetails.city}, {userDetails.zipCode}</p>
              <p className="text-sm">{userDetails.phone}</p>
              <p className="text-sm">{userDetails.email}</p>
            </div>

            {/* Items */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
