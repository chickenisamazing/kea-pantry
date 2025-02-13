import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = `http://localhost:3000`;
  const res = await fetch(`${baseUrl}/data/dummyVercelTestRecipeData.json`);

  if (!res.ok) {
    return NextResponse.error();
  }

  const data = await res.json();
  const recipe = data.recipes;

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}
