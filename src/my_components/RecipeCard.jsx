import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Users, Trash2 } from "lucide-react";

/**
 * RecipeCard Component - Displays a recipe card with image, title, and actions
 * @param {Object} recipe - Recipe object containing all recipe details
 * @param {Function} onSelect - Callback when user clicks to view recipe details
 * @param {Function} onFavorite - Callback to toggle favorite status
 * @param {boolean} isFavorite - Whether this recipe is in favorites
 * @param {Function} onDelete - Callback to delete recipe (only for custom recipes)
 */
function RecipeCard({ recipe, onSelect, onFavorite, isFavorite, onDelete }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={recipe.image}
          alt={recipe.title}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800";
          }}
        />
        {/* Category Badge */}
        {recipe.category && (
          <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
            {recipe.category}
          </Badge>
        )}
        {/* Custom Recipe Badge */}
        {recipe.isCustom && (
          <Badge className="absolute top-2 left-2 bg-purple-500">Custom</Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Recipe Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h3>

        {/* Recipe Meta Information */}
        <div className="flex gap-3 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onSelect(recipe)} className="flex-1">
            View Recipe
          </Button>
          <Button
            size="sm"
            variant={isFavorite ? "default" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(recipe);
            }}
            className={isFavorite ? "bg-red-500 hover:bg-red-600" : ""}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
          </Button>

          {/* Delete button - only shown for custom recipes */}
          {recipe.isCustom && onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete "${recipe.title}"?`)) {
                  onDelete(recipe.id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
