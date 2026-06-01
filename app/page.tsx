import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.grid} />
        <nav className={styles.nav}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark}>MT</span>
            <span>
              MILTECH
              <small>LONDON / 2026</small>
            </span>
          </Link>

          <div className={styles.navLinks}>
            <Link className={styles.navButton} href="/register">
              Register
            </Link>
          </div>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.systemLabel}>
            <span className={styles.statusDot} />
            Registration channel open
          </p>

          <h1>
            Military Tech
            <span>London 2026</span>
          </h1>

          <p className={styles.intro}>
            A focused summit for defence technology leaders, event managers,
            and international guests shaping the next generation of resilient
            systems.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/register">
              Register now
              <span aria-hidden="true">+</span>
            </Link>
          </div>
        </div>

        <p className={styles.coordinates}>51.5072 N / 0.1276 W</p>
      </section>
    </main>
  );
}
