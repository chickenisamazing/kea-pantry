"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import styles from "./page.module.scss";

interface Ingredient {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  recipeId: number;
  name: string;
  description: string;
  image: string;
  ingredient: {
    required: Ingredient[];
    optional: Ingredient[];
  };
  instruction: string[];
}

export default function Page() {
  const router = useRouter();
  const [datas, setDatas] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kea-pantry.vercel.app";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/api/recipes`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setDatas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL]);

  // const buttons =  [1, 2, 3, 4, 5];
  const buttonOnClick = (num: number) => {
    router.push(`/recipe/${num}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.board}>레시피 리스트</div>
        <div className={styles["grid-container"]}>
          {datas.map((data) => (
            <div
              className={styles.section}
              key={data.recipeId}
              onClick={() => buttonOnClick(data.recipeId)}
            >
              <div className={styles["img-container"]}>
                <Image
                  title={data.description}
                  src={data.image}
                  alt="File icon"
                  width={256}
                  height={256}
                />
              </div>
              <div className={styles.btn}>{data.name}</div>
              <div className={styles.description}>{data.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
