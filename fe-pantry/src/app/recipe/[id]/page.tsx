import { notFound } from "next/navigation";
import Image from "next/image";

import styles from "./page.module.scss";

import ModifyButton from "../../../component/ModifyButton";

interface Ingredient {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  name: string;
  description: string;
  image: string;
  ingredient: {
    required: Ingredient[];
    optional: Ingredient[];
  };
  instruction: string[];
}

interface RecipeDetailParams {
  id: string;
}

export async function generateStaticParams() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kea-pantry.vercel.app";

  try {
    const res = await fetch(`${API_URL}/api/recipes`);

    const data = await res.json();

    return data.map((recipe: { recipeId: number }) => ({
      id: recipe.recipeId.toString(),
    }));
  } catch (error) {
    console.error(`generateStaticParams 에러 : `, error);
    return [];
  }
}

export default async function RecipeDetail({
  params,
}: {
  params: RecipeDetailParams;
}) {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kea-pantry.vercel.app";

  const paramId = (await params).id;
  const res = await fetch(`${API_URL}/api/recipes/${paramId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return notFound();
  }

  const recipe: Recipe = await res.json();

  function formatQuantity(quantity: number): string | number {
    const fractionMap: { [key: number]: string } = {
      0.5: "1/2",
      0.25: "1/4",
      0.75: "3/4",
      0.33: "1/3",
      0.66: "2/3",
    };
    return fractionMap[quantity] || quantity;
  }

  return (
    // <div className={`${styles.card} ${styles["background-img"]}`}>
    <div className={`${styles.card} ${styles["background-img"]}`}>
      <div className={styles["recipe-name"]}>{recipe.name}</div>
      <div>{recipe.description}</div>

      <div className={styles["recipe-image"]}>
        <Image
          // key={ingredient.id}
          src={recipe.image}
          alt="File icon"
          width={512}
          height={512}
        />
      </div>
      <div>
        <div className={styles["ingredients-title"]}>필수재료</div>
        <div className={styles.ingredients}>
          {recipe.ingredient.required.map((item) => (
            <div className={styles.image} key={item.id}>
              {" "}
              <Image
                title={item.description}
                // key={ingredient.id}
                src={item.image}
                alt="File icon"
                width={80}
                height={80}
              />
              <div>{item.name}</div>
              <div className={styles.amount}>
                <div>{formatQuantity(item.quantity)}</div>
                <div>{item.unit}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {Array.isArray(recipe.ingredient.optional) &&
            recipe.ingredient.optional.length > 0 && (
              <div>
                <div className={styles["ingredients-title"]}>추가재료</div>

                <div className={styles.ingredients}>
                  {recipe.ingredient.optional?.map((item) => (
                    <div className={styles.image} key={item.id}>
                      {" "}
                      <Image
                        title={item.description}
                        src={item.image}
                        alt="File icon"
                        width={80}
                        height={80}
                      />{" "}
                      <div>{item.name}</div>
                      <div className={styles.amount}>
                        <div>{formatQuantity(item.quantity)}</div>
                        <div>{item.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      <div>
        {recipe.instruction.map((text, index) => (
          <div className={styles.instruction} key={index}>
            {index + 1}. {text}
          </div>
        ))}
      </div>
      <ModifyButton paramId={paramId} />
    </div>
  );
}
