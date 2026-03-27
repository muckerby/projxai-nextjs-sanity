import Link from "next/link";

const ConsultingCTA = () => {
  return (
    <section className="bg-dark py-20">
      <div className="container">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
            Ready to implement AI in your business?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/70 md:text-lg">
            Book a free 30-minute discovery call. We&apos;ll identify your biggest AI opportunity and give you three clear next steps — whether you work with us or not.
          </p>
          <Link
            href="/work-with-us"
            className="inline-block rounded-xs bg-white px-8 py-4 text-base font-semibold text-black duration-300 hover:bg-white/90"
          >
            Book Your Free Call →
          </Link>
          <p className="mt-4 text-sm text-white/50">
            No obligation. No sales pitch. Just clarity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultingCTA;
