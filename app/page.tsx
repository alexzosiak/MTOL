import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#071013] text-[#e7edf2]">
      <section className="relative isolate flex min-h-[820px] flex-col overflow-hidden bg-[linear-gradient(90deg,rgba(5,14,16,0.98)_0%,rgba(5,14,16,0.91)_34%,rgba(5,14,16,0.28)_67%,rgba(5,14,16,0.72)_100%),linear-gradient(0deg,rgba(5,14,16,0.95),transparent_35%),url('/air-defense-hero.png')] px-[clamp(22px,5vw,78px)] [background-position:0_0,0_0,center] [background-size:auto,auto,cover] max-[760px]:min-h-[760px] max-[760px]:bg-[linear-gradient(90deg,rgba(5,14,16,0.98),rgba(5,14,16,0.72)),linear-gradient(0deg,rgba(5,14,16,0.96),transparent_48%),url('/air-defense-hero.png')] max-[760px]:[background-position:0_0,0_0,64%_center]">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(151,199,187,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(151,199,187,0.18)_1px,transparent_1px)] bg-[length:64px_64px] opacity-[0.22] [mask-image:linear-gradient(90deg,black,transparent_76%)]" />
        <nav className="flex items-center justify-between border-b border-[rgba(183,211,204,0.2)] py-[21px]">
          <Link
            className="flex items-center gap-3 text-sm font-bold leading-[1.2] tracking-[0.18em] text-[#f1f7f5] no-underline [font-family:var(--font-geist-mono),monospace]"
            href="/"
          >
            <span className="grid h-[42px] w-[42px] place-items-center border border-[rgba(158,213,197,0.65)] text-xs tracking-[0.08em] text-[#b6e5d6]">
              MT
            </span>
            <span>
              MILTECH
              <small className="mt-1 block text-[9px] tracking-[0.28em] text-[#8ea29f]">
                LONDON / 2026
              </small>
            </span>
          </Link>

          <div className="flex items-center gap-[clamp(15px,3vw,36px)]">
            <Link
              className="border border-[rgba(167,218,203,0.48)] px-3.5 py-[11px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#b8c6c4] no-underline hover:text-[#e8f5f1] [font-family:var(--font-geist-mono),monospace]"
              href="/register"
            >
              Register
            </Link>
          </div>
        </nav>

        <div className="my-auto w-[min(100%,780px)] py-[74px] pb-[122px] max-[760px]:py-20 max-[760px]:pb-24">
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a8d6c8] [font-family:var(--font-geist-mono),monospace]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#8de1ba] shadow-[0_0_16px_#8de1ba]" />
            Registration channel open
          </p>

          <h1 className="mt-5 text-[clamp(62px,9vw,128px)] font-[750] uppercase leading-[0.88] tracking-[-0.095em] text-[#f1f5f3] max-[760px]:text-[clamp(60px,18vw,94px)]">
            Military Tech
            <span className="block text-[0.53em] tracking-[0.065em] text-[#b3c5c1]">
              London 2026
            </span>
          </h1>

          <p className="mt-[27px] max-w-[630px] text-[17px] leading-[1.75] text-[#b8c5c4] max-[760px]:text-[15px]">
            A focused summit for defence technology leaders, event managers,
            and international guests shaping the next generation of resilient
            systems.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-[22px] bg-[#b0e2d2] px-[18px] py-[15px] text-xs font-bold uppercase tracking-[0.12em] text-[#081310] no-underline transition-colors duration-[180ms] hover:bg-[#dcfff3] [font-family:var(--font-geist-mono),monospace]"
              href="/register"
            >
              Register now
              <span aria-hidden="true">+</span>
            </Link>
          </div>
        </div>

        <p className="absolute right-[clamp(22px,5vw,78px)] bottom-[114px] m-0 text-[10px] tracking-[0.18em] text-[rgba(202,224,219,0.7)] [font-family:var(--font-geist-mono),monospace] [writing-mode:vertical-rl] max-[760px]:hidden">
          51.5072 N / 0.1276 W
        </p>
      </section>
    </main>
  );
}
