const stats = [
  { number: "47+", label: "Australian businesses helped" },
  { number: "3.2x", label: "Average ROI improvement" },
  { number: "90 days", label: "Typical implementation timeline" },
];

const StatsStrip = () => {
  return (
    <section className="bg-primary py-14">
      <div className="container">
        <div className="flex flex-col items-center justify-around gap-10 sm:flex-row">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">{s.number}</div>
              <div className="text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
