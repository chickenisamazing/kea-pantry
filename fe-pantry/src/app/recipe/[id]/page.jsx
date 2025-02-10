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
  const res = await fetch(`http://localhost:3000/api/recipes/${paramId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return notFound();
  }

  const recipe = await res.json();

  return (
    <div className={styles.card}>
      <div className={styles["recipe-name"]}>{recipe.name}</div>
      <div>{recipe.description}</div>

      <div className={styles["recipe-image"]}>
        <img
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
          {recipe.ingredient.required.map((item, index) => (
            <div className={styles.image} key={item.id}>
              {" "}
              <img
                title={item.description}
                // key={ingredient.id}
                src={item.image}
                alt="File icon"
                width={80}
                height={80}
              />
              <div>{item.name}</div>
              <div className={styles.amount}>
                <div>{item.quantity}</div>
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
                  {recipe.ingredient.optional?.map((item, index) => (
                    <div className={styles.image} key={item.id}>
                      {" "}
                      <img
                        title={item.description}
                        src={item.image}
                        alt="File icon"
                        width={80}
                        height={80}
                      />{" "}
                      <div>{item.name}</div>
                      <div className={styles.amount}>
                        <div>{item.quantity}</div>
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
    </div>
  );
}
