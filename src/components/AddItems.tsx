
import { useState } from 'react';
import { Camera, Upload, ShoppingBag, Scan, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GroceryForm } from './GroceryForm';
import { Badge } from '@/components/ui/badge';

interface AddItemsProps {
  groceries: any[];
  setGroceries: (groceries: any[]) => void;
}

export const AddItems = ({ groceries, setGroceries }: AddItemsProps) => {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<any[]>([]);

  const handleSave = (newItem: any) => {
    setGroceries([...groceries, newItem]);
    setActiveMethod(null);
  };

  const addScannedItems = () => {
    setGroceries([...groceries, ...scannedItems]);
    setScannedItems([]);
    setActiveMethod(null);
  };

  const sampleScannedItems = [
    { name: 'Organic Bananas', category: 'Fruits', quantity: '6 pieces', expirationDate: '2024-06-08', purchaseDate: '2024-06-01' },
    { name: 'Whole Milk', category: 'Dairy', quantity: '1 liter', expirationDate: '2024-06-10', purchaseDate: '2024-06-01' },
    { name: 'Bread', category: 'Grains', quantity: '1 loaf', expirationDate: '2024-06-05', purchaseDate: '2024-06-01' },
  ];

  const simulateReceiptScan = () => {
    // Simulate scanning delay
    setTimeout(() => {
      setScannedItems(sampleScannedItems);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Items to Pantry</h2>
        <p className="text-gray-600">Choose how you'd like to add your groceries</p>
      </div>

      {!activeMethod && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group" onClick={() => setActiveMethod('manual')}>
            <CardHeader className="text-center pb-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg">Manual Entry</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                Add items one by one with detailed information
              </p>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Add Manually
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group" onClick={() => {
            setActiveMethod('receipt');
            simulateReceiptScan();
          }}>
            <CardHeader className="text-center pb-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                <Scan className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Scan Receipt</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                Take a photo of your receipt to automatically add items
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Scan Receipt
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group opacity-75">
            <CardHeader className="text-center pb-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Partner Store</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                Automatically sync from partner supermarkets
              </p>
              <Badge variant="secondary" className="mb-3">Coming Soon</Badge>
              <Button disabled className="w-full">
                Connect Store
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMethod === 'manual' && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Add Item Manually</CardTitle>
          </CardHeader>
          <CardContent>
            <GroceryForm
              onSave={handleSave}
              onCancel={() => setActiveMethod(null)}
            />
          </CardContent>
        </Card>
      )}

      {activeMethod === 'receipt' && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Receipt Scanner</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {scannedItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Scan className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Scanning Receipt...</h3>
                <p className="text-gray-500">Processing your receipt and extracting item information</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Receipt scanned successfully!</span>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Found {scannedItems.length} items:</h4>
                  {scannedItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.category} • {item.quantity}</p>
                        <p className="text-sm text-gray-500">Expires: {new Date(item.expirationDate).toLocaleDateString()}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <Button onClick={addScannedItems} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                    Add All Items
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setActiveMethod(null);
                    setScannedItems([]);
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
