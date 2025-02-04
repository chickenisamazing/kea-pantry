"use client";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <a className={styles[`navbar-title`]}>
        <img src="/parakeet.png" alt="File icon" width={64} height={64} />
        KEA's pantry
      </a>
      <div className={styles[`navbar-items`]}>
        <a className={styles[`navbar-item`]}>
          {/* <img
            src="/parakeet.png"
            // alt="File icon"
            // width={16}
            // height={16}
          /> */}
          레시피
        </a>
        <a className={styles[`navbar-item`]}>
          {/* <img
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        /> */}
          나의 팬트리
        </a>
        <a className={styles[`navbar-item`]}>
          {/* <img
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        /> */}
          레시피 추천
        </a>
      </div>
      <a className={styles[`navbar-admin`]}>admin</a>
    </div>
  );
}
