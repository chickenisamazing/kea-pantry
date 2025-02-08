"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles[`navbar-title`]}>
        <img src="/kea-olive.png" alt="File icon" width={64} height={64} />
        KEA's pantry
        <img src="/kea-olive.png" alt="File icon" width={64} height={64} />
      </Link>
      <div className={styles[`navbar-items`]}>
        <Link href="/recipe" className={styles[`navbar-item`]}>
          레시피
        </Link>
        <Link href="/pantry" className={styles[`navbar-item`]}>
          나의 팬트리
        </Link>
        <a className={styles[`navbar-item`]}>레시피 추천</a>
      </div>
      <a className={styles[`navbar-admin`]}>admin</a>
    </div>
  );
}
