import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/data/dummyPantryData.json`);

  if (!res.ok) {
    return NextResponse.error();
  }

  const data = await res.json();
  const pantryData = data.pantry;

  if (!pantryData) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(pantryData);
}
