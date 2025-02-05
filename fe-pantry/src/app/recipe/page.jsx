"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/recipes`);
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
  }, []);

  // const buttons =  [1, 2, 3, 4, 5];
  const buttonOnClick = (num) => {
    router.push(`/recipe/${num}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.board}>레시피 리스트 페이지</div>
        {datas.map((data) => (
          <button
            key={data.recipeId}
            onClick={() => buttonOnClick(data.recipeId)}
            className={styles.btn}
          >
            {data.name}
          </button>
        ))}
      </div>
    </div>
  );
}
