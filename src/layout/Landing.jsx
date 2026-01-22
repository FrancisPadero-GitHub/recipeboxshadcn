import React from "react";
import { useState, useEffect, useMemo } from "react";
import data from "../data/recipes.json";

// Custom Components
import RecipeCard from "../my_components/RecipeCard";
import RecipeDialog from "../my_components/RecipeDialog";
import AddRecipeDialog from "../my_components/AddRecipeDialog";
import SearchBar from "../my_components/SearchBar";

// shadcn/ui Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

/**
 * Landing Component - Main page for the Recipe Manager application
 * Handles recipe display, search, favorites, and custom recipe management
 */
function Landing() {
  // State Management
  const [recipes, setRecipes] = useState([]); // All recipes (initial + custom)
  const [favorites, setFavorites] = useState([]); // User's favorite recipes
  const [search, setSearch] = useState(""); // Search query
  const [selected, setSelected] = useState(null); // Currently selected recipe for detail view
  const [categoryFilter, setCategoryFilter] = useState("all"); // Category filter

  // Load initial data and localStorage on component mount
  useEffect(() => {
    // Retrieve custom recipes added by user
    const savedCustom = JSON.parse(localStorage.getItem("customRecipes")) || [];
    // Retrieve saved favorite recipe IDs
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];

    // Combine initial recipes from JSON with custom recipes
    setRecipes([...data.recipes, ...savedCustom]);
    setFavorites(savedFavs);
  }, []);

  // Persist favorites to localStorage whenever they change
  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Get unique categories from all recipes using useMemo for optimization
  const categories = useMemo(() => {
    const cats = [...new Set(recipes.map((r) => r.category))];
    return cats.filter(Boolean);
  }, [recipes]);

  // Filter recipes based on search query and category
  // Uses useMemo to prevent unnecessary recalculations
  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch =
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q));
      const matchesCategory =
        categoryFilter === "all" || r.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [recipes, search, categoryFilter]);

  /**
   * Toggle a recipe's favorite status
   * @param {Object} recipe - The recipe to toggle
   */
  /**
   * Toggle a recipe's favorite status
   * @param {Object} recipe - The recipe to toggle
   */
  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      prev.some((r) => String(r.id) === String(recipe.id))
        ? prev.filter((r) => String(r.id) !== String(recipe.id))
        : [...prev, recipe],
    );
  }

  /**
   * Add a new custom recipe to the list
   * @param {Object} recipe - The recipe object to add
   */
  function addRecipe(recipe) {
    const updated = [...recipes, recipe];
    setRecipes(updated);

    // Save only custom recipes to localStorage
    const custom = updated.filter((r) => r.isCustom);
    localStorage.setItem("customRecipes", JSON.stringify(custom));
  }

  /**
   * Delete a custom recipe (only custom recipes can be deleted)
   * @param {string|number} id - The ID of the recipe to delete
   */
  function deleteRecipe(id) {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);

    // Update localStorage with remaining custom recipes
    const custom = updated.filter((r) => r.isCustom);
    localStorage.setItem("customRecipes", JSON.stringify(custom));

    // Remove from favorites if it was favorited
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🍳 Recipe Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Discover, save, and create your favorite recipes
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <AddRecipeDialog onAdd={addRecipe} />
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <Badge
            variant={categoryFilter === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("all")}
          >
            All Categories
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Tabs for All Recipes and Favorites */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All Recipes ({filtered.length})
            </TabsTrigger>
            <TabsTrigger value="fav">
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          {/* All Recipes Tab */}
          <TabsContent value="all">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-400 mb-2">🔍</p>
                <p className="text-gray-600">
                  No recipes found matching your search.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try a different search term or add a new recipe!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="fav">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-400 mb-2">❤️</p>
                <p className="text-gray-600">No favorite recipes yet!</p>
                <p className="text-gray-500 text-sm mt-2">
                  Start adding recipes to your favorites to see them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    onSelect={setSelected}
                    onFavorite={toggleFavorite}
                    isFavorite={true}
                    onDelete={deleteRecipe}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Recipe Detail Dialog */}
        {selected && (
          <RecipeDialog
            recipe={selected}
            onClose={() => setSelected(null)}
            onFavorite={toggleFavorite}
            isFavorite={favorites.some(
              (f) => String(f.id) === String(selected.id),
            )}
          />
        )}
      </div>
    </div>
  );
}

export default Landing;
