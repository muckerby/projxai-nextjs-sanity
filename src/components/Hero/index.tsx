import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 bg-[#1e232e] py-16 md:py-20"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  AI consulting built for Australian businesses with 5 to 50 staff.
                </h1>
                <p className="mb-12 text-base leading-relaxed text-gray-500 dark:text-gray-300 sm:text-lg md:text-xl">
                  No jargon. No enterprise-sized fees. Just AI that actually works for the way your business runs.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/contact"
                    className="rounded-xs bg-[#6B3FE7] px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-[#5a34c5]"
                  >
                    Start the Conversation
                  </Link>
                  <Link
                    href="/tools"
                    className="inline-block rounded-xs bg-gray-900 px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Try Free Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
