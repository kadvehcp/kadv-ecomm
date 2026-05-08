import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchValue, setSearchValue, showSearch, setShowSearch } =
    useContext(ShopContext);

  return showSearch ? (
    <section className="text-center text-gray-500">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          name="search"
          id="search"
          value={searchValue}
          onChange={(e) => {
            const searchingValue = e.target.value;
            setSearchValue(searchingValue);
            if (searchingValue.trim() && location.pathname !== "/collection") {
              navigate("/collection", {
                replace: true,
                state: { from: location.pathname },
              });
            }
          }}
          className="flex-1 outline-none bg-inherit text-sm"
          autoFocus
        />
        <Search className="opacity-70" />
      </div>
      <X
        onClick={() => {
          setShowSearch(false);
          setSearchValue("");
          navigate(location.state?.from || "/", { replace: true });
        }}
        className="inline cursor-pointer"
      />
    </section>
  ) : null;
};

export default SearchBar;
