import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes`);
    const data = await res.json();

    return data.map((recipe) => ({
      id: recipe.recipeId.toString(),
    }));
  } catch (error) {
    console.error(`generateStaticParams 에러 : `, error);
    return [];
  }
}

export const revalidate = 60;

export default async function RecipeDetail({ params }) {
  const paramId = (await params).id;
  const res = await fetch(`http://localhost:3000/api/recipes/${paramId}`);

  if (!res.ok) {
    return notFound();
  }

  const recipe = await res.json();

  return (
    <div>
      <h1>{recipe.name}</h1>
      {/* <p>{recipe.explain}</p> */}
      {/* <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredient.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
    </div>
  );
}
