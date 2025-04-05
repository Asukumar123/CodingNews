import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="group relative rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 transition-transform hover:scale-[1.025] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:border-cyan-500 duration-300">
      {/* Gradient border glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20 opacity-20 group-hover:opacity-40 transition duration-300 blur-2xl pointer-events-none z-0" />

      <div className="relative z-10 space-y-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm text-gray-300">
          <p>{formatDate(_createdAt)}</p>
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">{views}</span>
          </div>
        </div>

        {/* Title & Author */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-sm text-cyan-200 font-medium hover:underline">
                {author?.name}
              </p>
            </Link>
            <h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-cyan-400 transition">
              <Link href={`/startup/${_id}`}>{title}</Link>
            </h3>
          </div>
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image || "/default-avatar.png"}
              alt={author?.name || "Author"}
              width={44}
              height={44}
              className="rounded-full border-2 border-cyan-300 hover:ring-2 hover:ring-cyan-400 transition"
            />
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>

        {/* Image */}
        {image && (
          <div className="overflow-hidden rounded-xl mt-2">
            <img
              src={image}
              alt={title}
              className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition"
            />
          </div>
        )}

        {/* Bottom Bar */}
        <div className="flex justify-between items-center mt-4">
          <Link
            href={`/?query=${category?.toLowerCase()}`}
            className="text-sm text-cyan-300 hover:underline"
          >
            #{category}
          </Link>
          <Button
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 text-xs rounded-full hover:from-cyan-600 hover:to-blue-700 transition"
            asChild
          >
            <Link href={`/startup/${_id}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
