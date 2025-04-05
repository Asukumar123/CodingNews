import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <form
      action="/"
      className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md w-full max-w-3xl mt-6"
    >
      <input
        name="query"
        defaultValue={query}
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
        placeholder="Search coding news, AI trends, and tech startups..."
      />

      <div className="flex gap-2 items-center">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white px-3 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Search className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
