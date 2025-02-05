import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { params } = await context;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/data/dummyRecipeData.json`);

  if (!res.ok) {
    return NextResponse.error();
  }

  const data = await res.json();
  const recipe = data.recipes;
  const oneRecipe = recipe.find((r) => r.recipeId === Number(params.id));

  if (!oneRecipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(oneRecipe);
}
