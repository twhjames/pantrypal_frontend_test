
import { useState } from 'react';
import { ArrowLeft, Send, ChefHat, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface RecipeChatProps {
  recipe: any;
  onBack: () => void;
}

export const RecipeChat = ({ recipe, onBack }: RecipeChatProps) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hi! I'm here to help you customize the ${recipe.name} recipe. You can ask me to modify ingredients, cooking methods, or dietary preferences. What would you like to adjust?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue
    };

    // Simulate bot response
    const botResponses = [
      "Great suggestion! I can definitely modify that for you. Here's how we can adjust the recipe...",
      "That's a wonderful idea! Let me suggest an alternative approach that might work even better.",
      "I love that modification! Here's how to incorporate that change into the recipe.",
      "Perfect! That adjustment will make the dish even more delicious. Here's the updated step..."
    ];

    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      text: botResponses[Math.floor(Math.random() * botResponses.length)]
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Can I substitute an ingredient?",
    "Make it vegetarian",
    "Reduce cooking time",
    "Add more protein",
    "Make it spicier"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Recipes
        </Button>
        <div className="flex items-center space-x-2">
          <ChefHat className="w-6 h-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Recipe Assistant</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipe Details */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">{recipe.name}</CardTitle>
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
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
              <div className="space-y-1">
                {recipe.ingredients.map((ingredient: string, idx: number) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{ingredient}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.random() > 0.5 ? 'Available' : 'Need to buy'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
              <ol className="text-sm space-y-2">
                {recipe.instructions.map((step: string, idx: number) => (
                  <li key={idx} className="flex">
                    <span className="font-medium text-orange-500 mr-2">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chat with Recipe Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(question)}
                    className="text-xs hover:bg-orange-50 hover:border-orange-300"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about modifications, substitutions, or cooking tips..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
