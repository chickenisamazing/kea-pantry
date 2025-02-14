import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { params } = await context;

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kea-pantry.vercel.app";

  const res = await fetch(`${API_URL}/data/dummyVercelTestRecipeData.json`);

  if (!res.ok) {
    return NextResponse.error();
  }

  const data = await res.json();
  const recipe = data.recipes;
  console.log(recipe, "레시피");
  const oneRecipe = recipe.find(
    async (r) => r.recipeId === Number(await params.id)
  );

  if (!oneRecipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(oneRecipe);
}
