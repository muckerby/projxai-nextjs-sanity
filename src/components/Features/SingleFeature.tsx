import Link from "next/link";
import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph, link, linkText } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="bg-[#6B3FE7]/10 text-[#6B3FE7] mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
          {title}
        </h3>
        <p className="pr-[10px] text-base leading-relaxed font-medium text-gray-500 dark:text-gray-300">
          {paragraph}
        </p>
        {link && linkText && (
          <Link
            href={link}
            className="text-[#6B3FE7] mt-4 inline-flex items-center text-base font-medium hover:underline"
          >
            {linkText}
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleFeature;
