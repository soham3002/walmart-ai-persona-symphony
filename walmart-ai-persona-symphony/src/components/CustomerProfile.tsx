
import React, { useState } from 'react';
import { User, Settings, Heart, Package, MapPin, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CustomerData {
  name: string;
  email: string;
  membershipTier: string;
  preferences: string[];
  recentCategories: string[];
  savedItems: number;
  orders: number;
  location: string;
}

export const CustomerProfile = () => {
  const [customerData] = useState<CustomerData>({
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    membershipTier: 'Walmart+',
    preferences: ['Organic', 'Electronics', 'Home & Garden', 'Baby Care'],
    recentCategories: ['Groceries', 'Electronics', 'Household'],
    savedItems: 24,
    orders: 47,
    location: 'Dallas, TX'
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">{customerData.name}</h3>
            <p className="text-sm text-gray-500">{customerData.email}</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Membership Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Membership</span>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            ⭐ {customerData.membershipTier}
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex justify-center">
              <Heart className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-lg font-bold">{customerData.savedItems}</p>
            <p className="text-xs text-gray-500">Saved Items</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-center">
              <Package className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-lg font-bold">{customerData.orders}</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-center">
              <MapPin className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-xs font-medium">{customerData.location}</p>
            <p className="text-xs text-gray-500">Location</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Shopping Preferences</h4>
          <div className="flex flex-wrap gap-2">
            {customerData.preferences.map((pref, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Categories</h4>
          <div className="flex flex-wrap gap-2">
            {customerData.recentCategories.map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Manage Preferences
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
