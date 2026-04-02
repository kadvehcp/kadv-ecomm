import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  return showSearch ? (
    <section className="text-center text-gray-500">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <Search className="cursor-pointer" />
      </div>
      <X
        onClick={() => setShowSearch(false)}
        className="inline cursor-pointer"
      />
    </section>
  ) : null;
};

export default SearchBar;
