import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function RecipeDialog({ recipe, onClose }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <img src={recipe.image} className="w-full rounded mb-4" />

        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <p>
          <strong>Cooking Time:</strong> {recipe.cookingTime} mins
        </p>
        <p>
          <strong>Category:</strong> {recipe.category}
        </p>

        <h4 className="font-semibold mt-4">Ingredients</h4>
        <ul className="list-disc ml-6">
          {recipe.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4 className="font-semibold mt-4">Instructions</h4>
        <ol className="list-decimal ml-6">
          {recipe.instructions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeDialog;
