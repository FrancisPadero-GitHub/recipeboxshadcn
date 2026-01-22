import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

/**
 * AddRecipeDialog Component - Modal form to add custom recipes
 * @param {Function} onAdd - Callback function to add the recipe to the list
 */
export default function AddRecipeDialog({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    cookingTime: "",
    servings: "",
    ingredients: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});

  /**
   * Validate form fields
   * @returns {boolean} - Returns true if form is valid
   */
  function validateForm() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!form.cookingTime || form.cookingTime <= 0) {
      newErrors.cookingTime = "Cooking time must be greater than 0";
    }
    if (!form.servings || form.servings <= 0) {
      newErrors.servings = "Servings must be greater than 0";
    }
    if (!form.ingredients.trim()) {
      newErrors.ingredients = "At least one ingredient is required";
    }
    if (!form.instructions.trim()) {
      newErrors.instructions = "At least one instruction is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /**
   * Handle form submission
   */
  function submit() {
    if (!validateForm()) {
      return;
    }

    // Create new recipe object
    const newRecipe = {
      id: crypto.randomUUID(),
      title: form.title,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800",
      category: form.category || "Custom",
      cookingTime: Number(form.cookingTime),
      servings: Number(form.servings),
      ingredients: form.ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      instructions: form.instructions
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      isCustom: true,
    };

    onAdd(newRecipe);

    // Reset form and close dialog
    setForm({
      title: "",
      image: "",
      category: "",
      cookingTime: "",
      servings: "",
      ingredients: "",
      instructions: "",
    });
    setErrors({});
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Recipe
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Custom Recipe</DialogTitle>
          <DialogDescription>
            Create your own recipe by filling out the form below. All fields
            marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Title Input */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Grandma's Chocolate Chip Cookies"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Image URL Input */}
          <div>
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave blank for a default image
            </p>
          </div>

          {/* Category Input */}
          <div>
            <Label htmlFor="category">Category (optional)</Label>
            <Input
              id="category"
              placeholder="e.g., Dessert, Italian, Vegan"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          {/* Cooking Time and Servings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cookingTime">Cooking Time (minutes) *</Label>
              <Input
                id="cookingTime"
                type="number"
                placeholder="30"
                value={form.cookingTime}
                onChange={(e) =>
                  setForm({ ...form, cookingTime: e.target.value })
                }
                className={errors.cookingTime ? "border-red-500" : ""}
              />
              {errors.cookingTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingTime}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="servings">Servings *</Label>
              <Input
                id="servings"
                type="number"
                placeholder="4"
                value={form.servings}
                onChange={(e) => setForm({ ...form, servings: e.target.value })}
                className={errors.servings ? "border-red-500" : ""}
              />
              {errors.servings && (
                <p className="text-red-500 text-sm mt-1">{errors.servings}</p>
              )}
            </div>
          </div>

          {/* Ingredients Textarea */}
          <div>
            <Label htmlFor="ingredients">Ingredients *</Label>
            <Textarea
              id="ingredients"
              placeholder="Enter each ingredient on a new line&#10;e.g.,&#10;2 cups all-purpose flour&#10;1 cup sugar&#10;3 eggs"
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
              rows={6}
              className={errors.ingredients ? "border-red-500" : ""}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions Textarea */}
          <div>
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              placeholder="Enter each step on a new line&#10;e.g.,&#10;Preheat oven to 350°F&#10;Mix dry ingredients in a bowl&#10;Add wet ingredients and stir"
              value={form.instructions}
              onChange={(e) =>
                setForm({ ...form, instructions: e.target.value })
              }
              rows={6}
              className={errors.instructions ? "border-red-500" : ""}
            />
            {errors.instructions && (
              <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={submit} className="flex-1">
              Save Recipe
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
