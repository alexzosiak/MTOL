import { requireRole } from "@/lib/auth";
import { CountryWorldMap } from "@/components/CountryWorldMap";
import { getStatisticsViewModel } from "@/view-models/statistics.view-model";

const tableCellClass =
  "border-t border-[var(--border)] px-[18px] py-3.5 text-sm";
const tableHeadClass =
  "border-t border-[var(--border)] bg-[#f9fbfe] px-[18px] py-3.5 text-left text-xs uppercase tracking-[0.07em] text-[var(--muted)]";

export default async function StatisticsPage() {
  await requireRole(["SUPER_ADMIN", "ADMIN", "VIEWER"]);

  const statistics = await getStatisticsViewModel();

  return (
    <main>
      <p className="mb-[7px] mt-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
        Overview
      </p>
      <h1 className="m-0 tracking-[-0.04em]">Statistics</h1>

      <div className="my-7 mb-5 grid grid-cols-2 gap-4 max-[540px]:grid-cols-1">
        <section className="rounded-[13px] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="m-0 text-sm text-[var(--muted)]">Total visitors</h2>
          <p className="mt-3 mb-0 text-4xl font-bold tracking-[-0.06em] text-[var(--primary)]">
            {statistics.totalVisitors}
          </p>
        </section>

        <section className="rounded-[13px] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="m-0 text-sm text-[var(--muted)]">
            Visitors last 24h
          </h2>
          <p className="mt-3 mb-0 text-4xl font-bold tracking-[-0.06em] text-[var(--primary)]">
            {statistics.visitorsLastDay}
          </p>
        </section>
      </div>

      <section className="rounded-[13px] border border-[var(--border)] bg-[var(--surface)]">
        <h2 className="m-0 px-[18px] pt-[18px] text-sm text-[var(--muted)]">
          Visitors by country
        </h2>
        <CountryWorldMap data={statistics.visitorsByCountry} />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className={tableHeadClass}>Country</th>
                <th className={tableHeadClass}>Visitors</th>
              </tr>
            </thead>

            <tbody>
              {statistics.visitorsByCountry.map((row) => (
                <tr key={row.country}>
                  <td className={tableCellClass}>{row.country}</td>
                  <td className={tableCellClass}>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
