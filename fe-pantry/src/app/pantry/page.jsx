"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPantryData() {
      try {
        const res = await fetch(`http://localhost:3000/api/pantry`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setIngredients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPantryData();
  }, []);

  return (
    <div>
      <div>팬트리 페이지</div>{" "}
      {ingredients.map((ingredient) => (
        <button
          key={ingredient.id}
          onClick={() => buttonOnClick(ingredient.id)}
          //   className={styles.btn}
        >
          {ingredient.name}
        </button>
      ))}
    </div>
  );
}
