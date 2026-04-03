import Link from "next/link";

const ToolTeasers = () => {
  return (
    <>
      {/* ROAS Calculator Teaser */}
      <section className="bg-[#1d2430] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px] text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
              Free tool — no signup required
            </span>
            <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
              Is your ad spend actually working?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70 md:text-lg">
              Most Australian SMEs are leaving money on the table with their digital advertising. Our free ROAS Calculator shows you exactly what return your ad spend should be generating — and where the gaps are.
            </p>
            <Link
              href="/tools/roas-calculator"
              className="inline-block rounded-xs bg-[#6B3FE7] px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-[#5a34c5]"
            >
              Try the ROAS Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* Competitor Espionage Engine Teaser */}
      <section className="bg-[#171c28] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px] text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/70">
              $99 AUD — one-time report
            </span>
            <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
              Find out exactly what your competitors are doing with their ads.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70 md:text-lg">
              The Competitor Espionage Engine delivers a full intelligence report on any competitor&apos;s ad strategy — creative, targeting, spend estimates, and gaps you can exploit. Delivered in under an hour.
            </p>
            <Link
              href="/tools/competitor-espionage-engine"
              className="inline-block rounded-xs bg-white px-8 py-4 text-base font-semibold text-black duration-300 hover:bg-white/90"
            >
              Get the Report →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolTeasers;
