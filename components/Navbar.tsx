import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-8 py-4 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-300 font-work-sans z-50 sticky top-0">
      <nav className="flex justify-between items-center max-w-8xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3  hover:opacity-90 transition">
          <Image src="/logo2.png" alt="logo" width={44} height={10} />
          <span className="text-2xl font-bold text-black tracking-tight">CodeCyborg</span>
        </Link>


        {/* Right section */}
        <div className="flex items-center gap-4 text-black">
          
        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-6 text-black text-sm font-medium">
          <Link href="/about" className="hover:text-cyan-700 transition">About Us</Link>
          <Link href="/contact" className="hover:text-cyan-700 transition">Contact Us</Link>
        </div>
          {session?.user ? (
            <>
              {/* Create */}
              <Link
                href="/startup/create"
                className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-lg border border-cyan-400 hover:bg-cyan-600 hover:text-white transition-all duration-300 text-sm"
              >
                Create
              </Link>
              <Link href="/startup/create" className="sm:hidden">
                <BadgePlus className="size-6 text-cyan-600 hover:text-cyan-800 transition" />
              </Link>

              {/* Logout */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-lg border border-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm"
                >
                  Logout
                </button>
                <LogOut className="size-6 sm:hidden text-red-500 hover:text-red-700 transition" />
              </form>

              {/* Profile Avatar */}
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10 ring-2 ring-cyan-400 hover:ring-4 transition-all duration-300">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all duration-300"
              >
                Login with GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
