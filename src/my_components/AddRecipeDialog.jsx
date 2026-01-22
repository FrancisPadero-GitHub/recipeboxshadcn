import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function AddRecipeDialog({ onAdd }) {
  const [form, setForm] = useState({});

  function submit() {
    onAdd({
      ...form,
      id: crypto.randomUUID(),
      ingredients: form.ingredients.split("\n"),
      instructions: form.instructions.split("\n"),
      cookingTime: Number(form.cookingTime),
      servings: Number(form.servings),
      isCustom: true,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Recipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Recipe</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <Input
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Input
          placeholder="Cooking Time"
          onChange={(e) => setForm({ ...form, cookingTime: e.target.value })}
        />
        <Input
          placeholder="Servings"
          onChange={(e) => setForm({ ...form, servings: e.target.value })}
        />
        <Textarea
          placeholder="Ingredients (one per line)"
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />
        <Textarea
          placeholder="Instructions (one per line)"
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        />
        <Textarea placeholder="Ingredients" onChange={(e) => setForm({})} />
        <Textarea placeholder="Ingredients" onChange={(e) => setForm({})} />

        <Button onClick={submit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddRecipeDialog;
