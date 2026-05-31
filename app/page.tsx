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
            <a href="#mission">Mission</a>
            <a href="#program">Program</a>
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
            <a className={styles.secondaryButton} href="#mission">
              Explore briefing
            </a>
          </div>
        </div>

        <div className={styles.eventBar}>
          <div>
            <span>Event date</span>
            <strong>20 June 2026</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>London, United Kingdom</strong>
          </div>
          <div>
            <span>Sector focus</span>
            <strong>Defence technology</strong>
          </div>
        </div>

        <p className={styles.coordinates}>51.5072 N / 0.1276 W</p>
      </section>

      <section className={styles.mission} id="mission">
        <div className={styles.sectionHeading}>
          <p>01 / Mission profile</p>
          <h2>Where modern defence systems meet real-world coordination.</h2>
        </div>

        <div className={styles.missionGrid}>
          <article className={styles.featureCard}>
            <span>01</span>
            <h3>Systems insight</h3>
            <p>
              Review emerging platforms, operational requirements, and the
              technologies supporting resilient infrastructure.
            </p>
          </article>
          <article className={styles.featureCard}>
            <span>02</span>
            <h3>Expert network</h3>
            <p>
              Connect with international teams working across defence,
              engineering, logistics, and event operations.
            </p>
          </article>
          <article className={styles.featureCard}>
            <span>03</span>
            <h3>Focused briefing</h3>
            <p>
              One day of precise conversations, practical demonstrations, and
              structured professional exchange.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.program} id="program">
        <div>
          <p className={styles.sectionCode}>02 / Operations window</p>
          <h2>Secure your access for the London briefing.</h2>
        </div>
        <Link className={styles.programButton} href="/register">
          Begin registration
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
