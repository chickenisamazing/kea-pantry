import { notFound } from "next/navigation";
import styles from "./page.module.scss";

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

export default async function RecipeDetail({ params }) {
  const paramId = (await params).id;
  const res = await fetch(`http://localhost:3000/api/recipes/${paramId}`);

  if (!res.ok) {
    return notFound();
  }

  const recipe = await res.json();

  return (
    <div className={styles.card}>
      <h1>{recipe.name}</h1>
      <div>{recipe.description}</div>
      <div>
        <div>필수재료</div>
        <div>
          {recipe.ingredient.required.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div>
          <div>추가재료</div>
          {recipe.ingredient.optional?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      <div>{recipe.instruction}</div>
    </div>
  );
}
