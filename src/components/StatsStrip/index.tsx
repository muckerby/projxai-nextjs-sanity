const stats = [
  { number: "97%", label: "of Australian employers are small businesses. Almost none have an AI strategy." },
  { number: "$0", label: "in pricing shown by our competitors. We show ours." },
  { number: "14 days", label: "to your first working AI workflow. Not a strategy deck." },
];

const StatsStrip = () => {
  return (
    <section className="bg-[#6B3FE7] py-14">
      <div className="container">
        <div className="flex flex-col items-center justify-around gap-10 sm:flex-row">
          {stats.map((s) => (
            <div key={s.number} className="max-w-[220px] text-center">
              <div className="mb-2 text-4xl font-bold text-white">{s.number}</div>
              <div className="text-sm leading-relaxed text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
