"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();

  const goRecipeList = () => {
    router.push("/recipe");
  };

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.board}>오늘은 무엇을 먹을까?</div>
        {/* <div>오늘은 무엇을 먹을까?</div> */}
        <div className={styles.btn} onClick={goRecipeList}>
          레시피 보러가기
        </div>
      </div>
    </div>
  );
}
