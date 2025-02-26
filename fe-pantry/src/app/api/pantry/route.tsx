import { NextResponse } from "next/server";

export async function GET() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kea-pantry.vercel.app";

  // const baseUrl = `http://localhost:3000`;
  const res = await fetch(`${API_URL}/data/dummyPantryData.json`);

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
