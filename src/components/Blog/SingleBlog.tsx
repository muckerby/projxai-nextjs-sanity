import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <>
      <div className="group relative overflow-hidden rounded-xs bg-white shadow-sm duration-300 hover:shadow-md dark:bg-[#1d2430]">
        <Link
          href="/blog-details"
          className="relative block aspect-37/22 w-full"
        >
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-[#6B3FE7] px-4 py-2 text-sm font-semibold text-white capitalize">
            {tags[0]}
          </span>
          <Image src={image} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/blog-details"
              className="mb-4 block text-xl font-bold text-gray-900 hover:text-[#6B3FE7] sm:text-2xl dark:text-white dark:hover:text-[#6B3FE7]"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-gray-200 pb-6 text-base font-medium text-gray-500 dark:border-white/10 dark:text-gray-300">
            {paragraph}
          </p>
          <div className="flex items-center">
            <div className="border-body-color/10 mr-5 flex items-center border-r pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5 dark:border-white/10">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-gray-800 dark:text-white">
                  By {author.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{author.designation}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-gray-800 dark:text-white">
                Date
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
