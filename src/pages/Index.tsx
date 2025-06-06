
import { useState } from 'react';
import { Header } from '../components/Header';
import { Dashboard } from '../components/Dashboard';
import { Pantry } from '../components/Pantry';
import { Recipes } from '../components/Recipes';
import { AddItems } from '../components/AddItems';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [groceries, setGroceries] = useState([
    {
      name: 'Bananas',
      category: 'Fruits',
      quantity: '6 pieces',
      expirationDate: '2024-06-03',
      purchaseDate: '2024-05-30'
    },
    {
      name: 'Milk',
      category: 'Dairy',
      quantity: '1 liter',
      expirationDate: '2024-06-05',
      purchaseDate: '2024-05-28'
    },
    {
      name: 'Chicken Breast',
      category: 'Meat',
      quantity: '500g',
      expirationDate: '2024-06-02',
      purchaseDate: '2024-05-30'
    },
    {
      name: 'Bread',
      category: 'Grains',
      quantity: '1 loaf',
      expirationDate: '2024-06-04',
      purchaseDate: '2024-06-01'
    }
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard groceries={groceries} />;
      case 'pantry':
        return <Pantry groceries={groceries} setGroceries={setGroceries} />;
      case 'recipes':
        return <Recipes groceries={groceries} />;
      case 'scan':
        return <AddItems groceries={groceries} setGroceries={setGroceries} />;
      default:
        return <Dashboard groceries={groceries} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="px-4 py-4 pb-20 lg:pb-4 max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
