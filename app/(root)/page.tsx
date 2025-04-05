import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY, STARTUPS_COUNT_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;
  const currentPage = parseInt(page || "1");
  const limit = 6;

  const params = {
    search: query || null,
    page: currentPage,
    limit,
  };

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const { data: totalCount } = await sanityFetch({
    query: STARTUPS_COUNT_QUERY,
    params,
  });
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[80vh] text-center px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/3 w-72 h-72 bg-purple-500 rounded-full blur-[140px] opacity-30 animate-ping" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-25 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-3xl animate-fade-in-up transition-opacity duration-1000 ease-in-out">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Stay Updated on Tech & Coding News
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Discover the latest trends in programming, AI, web development, and tech startups.
          </p>
          <div className="mt-6">
            <SearchForm query={query} />
          </div>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-100">
            {query ? `Search results for "${query}"` : "Latest in Tech & Coding"}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No articles found</p>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 space-x-4">
          {currentPage > 1 && (
            <a
              href={`/?query=${query || ""}&page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Previous
            </a>
          )}
          {currentPage < totalPages && (
            <a
              href={`/?query=${query || ""}&page=${currentPage + 1}`}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Next
            </a>
          )}
        </div>
      </section>

      <SanityLive />
    </>
  );
}
