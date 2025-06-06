
import { useState } from 'react';
import { Plus, Search, Filter, Trash2, Edit2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GroceryForm } from './GroceryForm';

interface PantryProps {
  groceries: any[];
  setGroceries: (groceries: any[]) => void;
}

export const Pantry = ({ groceries, setGroceries }: PantryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = ['all', ...new Set(groceries.map(item => item.category))];
  
  const filteredGroceries = groceries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getExpirationStatus = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'expired', label: 'Expired', color: 'bg-red-100 text-red-800' };
    if (diffDays === 0) return { status: 'today', label: 'Expires Today', color: 'bg-red-100 text-red-800' };
    if (diffDays <= 3) return { status: 'soon', label: `${diffDays} days left`, color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'fresh', label: `${diffDays} days left`, color: 'bg-green-100 text-green-800' };
  };

  const handleDelete = (index: number) => {
    const newGroceries = groceries.filter((_, i) => i !== index);
    setGroceries(newGroceries);
  };

  const handleEdit = (item: any, index: number) => {
    setEditingItem({ ...item, index });
    setShowAddForm(true);
  };

  const handleSave = (newItem: any) => {
    if (editingItem) {
      const newGroceries = [...groceries];
      newGroceries[editingItem.index] = newItem;
      setGroceries(newGroceries);
      setEditingItem(null);
    } else {
      setGroceries([...groceries, newItem]);
    }
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        <Button 
          onClick={() => {
            setEditingItem(null);
            setShowAddForm(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
          </CardHeader>
          <CardContent>
            <GroceryForm
              initialData={editingItem}
              onSave={handleSave}
              onCancel={() => {
                setShowAddForm(false);
                setEditingItem(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroceries.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">
              {groceries.length === 0 
                ? "Start by adding some groceries to your pantry" 
                : "Try adjusting your search or filters"
              }
            </p>
          </div>
        ) : (
          filteredGroceries.map((item, index) => {
            const expStatus = getExpirationStatus(item.expirationDate);
            return (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item, groceries.indexOf(item))}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(groceries.indexOf(item))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(item.expirationDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge className={expStatus.color}>
                      {expStatus.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
