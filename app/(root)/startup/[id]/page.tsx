import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();


const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [post, editorPostsData] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" }),
  ]);

  if (!post) return notFound();

  const editorPosts = editorPostsData?.select || [];
  const parsedContent = post.pitch ? md.render(post.pitch) : null;

  return (
    <>
      {/* Hero Section */}
      <section className="w-full px-6 py-16 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-[120px] animate-ping" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 opacity-25 rounded-full blur-[100px] animate-pulse" />

        <p className="mb-2 text-sm text-gray-300">{formatDate(post?._createdAt)}</p>
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">{post.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">{post.description}</p>
      </section>

      {/* Main Section */}
      <section className="px-6 py-16 bg-[#0f1117] text-white">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Image */}
          <Image
            src={post.image}
            alt="thumbnail"
            width={1000}
            height={500}
            className="rounded-xl w-full shadow-lg border border-white/10"
          />

          {/* Author Info + Category */}
          <div className="flex justify-between flex-wrap items-center gap-6 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
            <Link href={`/user/${post.author?._id}`} className="flex gap-4 items-center">
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full border-2 border-cyan-400 shadow-md"
              />
              <div>
                <p className="text-xl font-semibold">{post.author.name}</p>
                <p className="text-sm text-gray-400">@{post.author.username}</p>
              </div>
            </Link>

            <span className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
              {post.category}
            </span>
          </div>

          {/* Pitch */}
          <div className="space-y-5">
            {parsedContent ? (
              <article
                className="prose prose-invert max-w-none prose-p:leading-relaxed prose-a:text-blue-400"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="text-gray-400 italic">No details provided</p>
            )}
          </div>

          <hr className="border-gray-700" />

          {/* Editor Picks */}
          {editorPosts.length > 0 && (
            <div className="space-y-5">
              <p className="text-2xl font-semibold text-white">✨ Editor Picks</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {editorPosts.map((post: StartupTypeCard, i: number) => (
                  <StartupCard key={i} post={post} />
                ))}
              </ul>
            </div>
          )}

          {/* Views */}
          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Page;
