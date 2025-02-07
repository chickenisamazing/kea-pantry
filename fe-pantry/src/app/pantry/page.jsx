"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

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
    <div className={styles.house}>
      <div className={styles.title}>나의 팬트리</div>{" "}
      <div className={styles.container}>
        {ingredients.map((ingredient) => (
          <div className={styles.ingredient} key={ingredient.id}>
            <div
              // key={ingredient.id}
              onClick={() => buttonOnClick(ingredient.id)}
            >
              {ingredient.name}
            </div>
            <img
              // key={ingredient.id}
              src={ingredient.image}
              alt="File icon"
              width={80}
              height={80}
            />
            <div className={styles.amount}>
              <div>{ingredient.quantity}</div>
              <div>{ingredient.unit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
