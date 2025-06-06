
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GroceryFormProps {
  initialData?: any;
  onSave: (item: any) => void;
  onCancel: () => void;
}

export const GroceryForm = ({ initialData, onSave, onCancel }: GroceryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    expirationDate: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        quantity: initialData.quantity || '',
        expirationDate: initialData.expirationDate || '',
        purchaseDate: initialData.purchaseDate || new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const categories = [
    'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Seafood', 'Grains', 
    'Pantry', 'Frozen', 'Beverages', 'Snacks', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.expirationDate) {
      onSave(formData);
      setFormData({
        name: '',
        category: '',
        quantity: '',
        expirationDate: '',
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Item Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Milk, Bananas"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="e.g., 1 liter, 500g, 12 pieces"
          />
        </div>
        
        <div>
          <Label htmlFor="expirationDate">Expiration Date *</Label>
          <Input
            id="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
          {initialData ? 'Update Item' : 'Add Item'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
