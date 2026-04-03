import Link from "next/link";

const ConsultingCTA = () => {
  return (
    <section className="bg-[#1d2430] py-20">
      <div className="container">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
            Ready to see what AI can actually do for your business?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/70 md:text-lg">
            Start with a conversation. No pitch, no pressure. We will ask the right questions and come back to you with real options.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xs bg-white px-8 py-4 text-base font-semibold text-black duration-300 hover:bg-white/90"
          >
            Start the Conversation →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConsultingCTA;
