import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <div className={styles.title}>
        <div className={styles.board}>보관식품 리스트</div>
      </div>
    </div>
  );
}
