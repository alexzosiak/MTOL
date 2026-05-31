import { db } from "@/lib/database";
import { requireRole } from "@/lib/auth";
import { CountryWorldMap } from "@/components/CountryWorldMap";
import styles from "./page.module.css";

export default async function StatisticsPage() {
  await requireRole(["SUPER_ADMIN", "ADMIN", "VIEWER"]);

  const totalResult = await db.query(`
    SELECT COUNT(*)::int AS total
    FROM visitors
  `);

  const todayResult = await db.query(`
    SELECT COUNT(*)::int AS today
    FROM visitors
    WHERE created_at >= NOW() - INTERVAL '1 day'
  `);

  const countryResult = await db.query(`
    SELECT country, COUNT(*)::int AS count
    FROM visitors
    GROUP BY country
    ORDER BY count DESC
  `);

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>Overview</p>
      <h1>Statistics</h1>

      <div className={styles.metrics}>
        <section className={styles.metricCard}>
          <h2>Total visitors</h2>
          <p>{totalResult.rows[0].total}</p>
        </section>

        <section className={styles.metricCard}>
          <h2>Visitors last 24h</h2>
          <p>{todayResult.rows[0].today}</p>
        </section>
      </div>

      <section className={styles.countryCard}>
        <h2>Visitors by country</h2>
        <CountryWorldMap data={countryResult.rows} />
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Visitors</th>
              </tr>
            </thead>

            <tbody>
              {countryResult.rows.map((row) => (
                <tr key={row.country}>
                  <td>{row.country}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
