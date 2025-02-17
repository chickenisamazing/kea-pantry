import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.containter}>
      <div className={styles.require}>관리자 로그인</div>

      <div className={styles.content}>
        <div className={styles.inputs}>
          <input className={styles["input-style"]} placeholder="아이디" />
          <input className={styles["input-style-2"]} placeholder="비밀번호" />
        </div>
        <div>
          <div className={styles.btn}>로그인</div>
        </div>
      </div>
    </div>
  );
}
