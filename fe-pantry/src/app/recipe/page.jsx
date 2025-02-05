"use client";

import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();

  const buttons = [1, 2, 3, 4, 5];
  const buttonOnClick = (num) => {
    router.push(`/recipe/${num}`);
  };

  return (
    <div className={styles.title}>
      <div>레시피 리스트 페이지</div>
      {buttons.map((num) => (
        <button
          key={num}
          onClick={() => buttonOnClick(num)}
          className={styles.btn}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
