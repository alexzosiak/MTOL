import Link from "next/link";
import styles from "./page.module.css";

export default function RegistrationPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Visitor registration</p>
        <h1>The registration form has moved</h1>
        <p>Continue to the main page to submit your visitor details.</p>
        <Link className={styles.link} href="/">
          Open registration form
        </Link>
      </section>
    </main>
  );
}
