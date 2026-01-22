import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function RecipeCard({ recipe, onSelect, onFavorite, isFavorite, onDelete }) {
  return (
    <Card className="cursor-pointer">
      <img className="h-40 w-full object-cover" src={recipe.image} />
      <CardContent>
        <h3 className="font-bold">{recipe.title}</h3>
        <p>{recipe.cookingTime} mins</p>

        <div className="flex gap-2">
          <Button size="sm" onClick={() => onSelect(recipe)}>
            View
          </Button>
          <Button
            size="sm"
            variant={isFavorite ? "destructive" : "secondary"}
            onClick={() => onFavorite(recipe)}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>

          {recipe.isCustom && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(recipe.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
