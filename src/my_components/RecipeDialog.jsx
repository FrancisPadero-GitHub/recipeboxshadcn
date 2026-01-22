import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Clock, Users, Tag } from "lucide-react";

/**
 * RecipeDialog Component - Displays full recipe details in a modal dialog
 * @param {Object} recipe - Recipe object with all details
 * @param {Function} onClose - Callback to close the dialog
 * @param {Function} onFavorite - Callback to toggle favorite status
 * @param {boolean} isFavorite - Whether this recipe is favorited
 */
function RecipeDialog({ recipe, onClose, onFavorite, isFavorite }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.title}</DialogTitle>
        </DialogHeader>

        {/* Recipe Image */}
        <img
          src={recipe.image}
          className="w-full h-64 object-cover rounded-lg mb-4"
          alt={recipe.title}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800";
          }}
        />

        {/* Recipe Meta Information */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm">
              <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm">
              <strong>Servings:</strong> {recipe.servings}
            </span>
          </div>
          {recipe.category && (
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-600" />
              <Badge variant="secondary">{recipe.category}</Badge>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          onClick={() => onFavorite(recipe)}
          variant={isFavorite ? "default" : "outline"}
          className={`w-full mb-4 ${isFavorite ? "bg-red-500 hover:bg-red-600" : ""}`}
        >
          <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-white" : ""}`} />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>

        <Separator className="my-4" />

        {/* Ingredients Section */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            📝 Ingredients
          </h4>
          <ul className="space-y-2">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Instructions Section */}
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            👨‍🍳 Instructions
          </h4>
          <ol className="space-y-3">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeDialog;
