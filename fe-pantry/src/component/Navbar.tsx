"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles[`navbar-title`]}>
        <Image src="/kea-olive.png" alt="File icon" width={56} height={56} />
        KEA&apos;s pantry
        <Image src="/kea-olive.png" alt="File icon" width={56} height={56} />
      </Link>
      <div className={styles[`navbar-items`]}>
        <Link href="/recipe" className={styles[`navbar-item`]}>
          레시피
        </Link>
        <Link href="/pantry" className={styles[`navbar-item`]}>
          나의 팬트리
        </Link>
        <a className={styles[`navbar-item`]}>레시피 추천</a>
        <Link href="/grocery" className={styles[`navbar-item`]}>
          팬트리 아이템
        </Link>
      </div>
      <Link href="/admin" className={styles[`navbar-admin`]}>
        admin
      </Link>
    </div>
  );
}
