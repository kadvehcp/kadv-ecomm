import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { X, ListFilter } from "lucide-react";
import DisplayProducts from "../components/DisplayProducts";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("Relevant");
  const [filters, setFilters] = useState({ category: [], subCategory: [] });
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    if (!showFilter) return;
    document.body.style.overflow = "clip";
    return () => {
      document.body.style.removeProperty("overflow");
      if (!document.body.getAttribute("style")?.trim())
        document.body.removeAttribute("style");
    };
  }, [showFilter]);

  const applyFilter = (filterType) => (event) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(event.target.value)
        ? prev[filterType].filter((item) => item !== event.target.value)
        : [...prev[filterType], event.target.value],
    }));
  };

  const productFilters = [
    {
      label: "CATEGORY",
      key: "category",
      options: ["Men", "Women", "Kids"],
    },
    {
      label: "SUB CATEGORY",
      key: "subCategory",
      options: ["Topwear", "Bottomwear", "Winterwear"],
    },
  ];

  const filteredProducts =
    products?.filter((item) => {
      const matchCategory =
        filters.category.length === 0 ||
        filters.category.includes(item.category);
      const matchSubCategory =
        filters.subCategory.length === 0 ||
        filters.subCategory.includes(item.subCategory);
      const searchQuery = search?.toLowerCase().trim();
      const matchSearch =
        !search ||
        !showSearch ||
        item.price.toString().includes(searchQuery) ||
        item.name.toLowerCase().includes(searchQuery);

      return matchCategory && matchSubCategory && matchSearch;
    }) ?? [];

  const productSortOptions = ["Relevant", "Low-to-High", "High-to-Low"];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "Low-to-High") return a.price - b.price;
    if (sortType === "High-to-Low") return b.price - a.price;
    return 0;
  });

  return (
    <section className="flex flex-col gap-2 py-5 text-gray-700 border-t border-gray-400">
      <div className="flex justify-between">
        <button
          onClick={() => {
            setTempFilters(filters);
            setShowFilter(true);
          }}
          className="flex items-center cursor-pointer gap-4 px-3 py-2 border border-gray-400"
        >
          <span className="text-sm">Filter</span>
          <ListFilter size={16} />
        </button>
        {showFilter && (
          <div
            onClick={() => setShowFilter(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-sm p-4 rounded-xl shadow-lg border border-gray-400 relative"
            >
              <button
                onClick={() => setShowFilter(false)}
                className="absolute top-4 right-4 text-gray-500 text-lg cursor-pointer"
              >
                <X />
              </button>
              <h2 className="text-lg font-medium mb-4">FILTER</h2>
              {productFilters.map(({ label, key, options }) => (
                <div key={key} className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-500">
                    {label}
                  </h3>
                  <div className="flex flex-col gap-2 mx-4 text-sm text-gray-500">
                    {options.map((filter) => (
                      <label
                        htmlFor={`${key}-${filter}`}
                        key={filter}
                        className="flex gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`${key}-${filter}`}
                          value={filter}
                          checked={tempFilters[key].includes(filter)}
                          onChange={applyFilter(key)}
                          className="w-4"
                        />
                        {filter}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    setFilters(tempFilters);
                    setShowFilter(false);
                  }}
                  className="flex-1 bg-gray-400 text-white py-2 font-medium"
                >
                  APPLY
                </button>
                <button
                  onClick={() => {
                    const resetFilters = { category: [], subCategory: [] };
                    setTempFilters(resetFilters);
                  }}
                  className="flex-1 border border-gray-400 py-2 font-medium"
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 border text-sm border-gray-400">
          <h3 className="px-3 py-2">Sort by:</h3>
          <select
            name="sortType"
            id="sortType"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-3 py-2 border-l border-gray-400"
          >
            {productSortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-1 my-2">
        <DisplayProducts
          titleFirst="ALL"
          titleSecond="PRODUCTS"
          products={sortedProducts}
        />
      </div>
    </section>
  );
};

export default Collection;
