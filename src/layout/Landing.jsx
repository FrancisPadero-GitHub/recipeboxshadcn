import React from "react";
import { useState, useEffect } from "react";
import data from "../data/recipes.json";

// My Components
import RecipeCard from "../my_components/RecipeCard";
import RecipeDialog from "../my_components/RecipeDialog";
import AddRecipeDialog from "../my_components/AddRecipeDialog";
import SearchBar from "../my_components/SearchBar";

// shad components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function Landing() {
  // states
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // useEffects
  // Load jSON and local storage
  useEffect(() => {
    const savedCustom = JSON.parse(localStorage.getItem("customRecipes")) || [];
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];

    setRecipes([...data.recipes, ...savedCustom]);
    setFavorites(savedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // For search filtering
  const filtered = recipes.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  });

  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      prev.some((r) => String(r.id) === String(recipe.id))
        ? prev.filter((r) => String(r.id) !== String(recipe.id))
        : [...prev, recipe],
    );
  }

  function addRecipe(recipe) {
    const updated = [...recipes, recipe];
    setRecipes(updated);

    const custom = updated.filter((r) => r.isCustom);
    localStorage.setItem("customRecipes", JSON.stringify(custom));
  }

  function deleteRecipe(id) {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);

    const custom = updated.filter((r) => r.isCustom);
    localStorage.setItem("customRecipes", JSON.stringify(custom));
  }

  return (
    <div className="p-6 max-w-7x1 mx-auto">
      <h1 className="text-3x1 font-bold mb-4">Recipe Manager</h1>
      <div>
        {/* Searchbar here */}
        <AddRecipeDialog onAdd={addRecipe} />
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="fav">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div>
            {filtered.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                onSelect={setSelected}
                onFavorite={toggleFavorite}
                isFavorite={favorites.some(
                  (f) => String(f.id) === String(r.id),
                )}
                onDelete={deleteRecipe}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fav">
          <div>
            {favorites.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                onSelect={setSelected}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selected && (
        <RecipeDialog recipe={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default Landing;
