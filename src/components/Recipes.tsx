
import { useState } from 'react';
import { ChefHat, Sparkles, MessageCircle, Clock, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeChat } from './RecipeChat';

interface RecipesProps {
  groceries: any[];
}

export const Recipes = ({ groceries }: RecipesProps) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample recipes based on common ingredients
  const sampleRecipes = [
    {
      id: 1,
      name: "Quick Vegetable Stir-Fry",
      description: "A healthy and quick meal using fresh vegetables from your pantry",
      cookTime: "15 mins",
      difficulty: "Easy",
      servings: 2,
      ingredients: ["Vegetables", "Oil", "Garlic", "Soy sauce"],
      availableIngredients: 3,
      totalIngredients: 4,
      instructions: [
        "Heat oil in a large wok or skillet over high heat",
        "Add garlic and stir-fry for 30 seconds until fragrant",
        "Add vegetables starting with harder ones first",
        "Stir-fry for 3-5 minutes until vegetables are crisp-tender",
        "Add soy sauce and toss to combine",
        "Serve immediately over rice"
      ]
    },
    {
      id: 2,
      name: "Creamy Pasta with Available Ingredients",
      description: "Delicious pasta dish using dairy and pantry items you have",
      cookTime: "20 mins",
      difficulty: "Medium",
      servings: 3,
      ingredients: ["Pasta", "Milk", "Cheese", "Herbs"],
      availableIngredients: 2,
      totalIngredients: 4,
      instructions: [
        "Cook pasta according to package directions",
        "In a large pan, warm milk over medium heat",
        "Add cheese and stir until melted",
        "Add cooked pasta and toss with sauce",
        "Season with herbs and serve hot"
      ]
    },
    {
      id: 3,
      name: "Fresh Fruit Smoothie Bowl",
      description: "Healthy breakfast using fruits nearing expiration",
      cookTime: "5 mins",
      difficulty: "Easy",
      servings: 1,
      ingredients: ["Fruits", "Yogurt", "Honey", "Granola"],
      availableIngredients: 4,
      totalIngredients: 4,
      instructions: [
        "Blend fruits with yogurt until smooth",
        "Pour into a bowl",
        "Drizzle with honey",
        "Top with granola and additional fruit pieces"
      ]
    }
  ];

  const generateRecommendations = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setRecommendations(sampleRecipes);
      setIsGenerating(false);
    }, 1500);
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 100) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  if (selectedRecipe) {
    return <RecipeChat recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Recipe Recommendations</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Get personalized recipes based on ingredients in your pantry that are expiring soon
        </p>
        
        <Button 
          onClick={generateRecommendations}
          disabled={isGenerating || groceries.length === 0}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Recipes
            </>
          )}
        </Button>
        
        {groceries.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Add some groceries to your pantry first to get recipe recommendations
          </p>
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight group-hover:text-orange-600 transition-colors">
                    {recipe.name}
                  </CardTitle>
                  <Badge className={getAvailabilityColor(recipe.availableIngredients, recipe.totalIngredients)}>
                    {recipe.availableIngredients}/{recipe.totalIngredients}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{recipe.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredients needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.map((ingredient: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat & Customize
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {recommendations.length === 0 && !isGenerating && groceries.length > 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to cook?</h3>
          <p className="text-gray-500">
            Click "Generate Recipes" to get personalized recommendations based on your pantry
          </p>
        </div>
      )}
    </div>
  );
};
