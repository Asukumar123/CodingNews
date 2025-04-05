import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-700 via-purple-800 to-indigo-800 min-h-[230px] flex items-center justify-center rounded-b-3xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-pulse text-center">
          📰 Submit Latest Coding News
        </h1>
      </section>

      {/* Full Width Form */}
      <div className="w-full px-6 sm:px-10 py-12">
        <p className="text-lg mb-6 max-w-3xl mx-auto text-gray-300 text-center">
          Found something exciting in the world of programming? New framework, big tech update,
          game-changing AI tool, or a major GitHub release? Share it with the community below.
        </p>

        <StartupForm />
      </div>
    </main>
  );
};

export default Page;
