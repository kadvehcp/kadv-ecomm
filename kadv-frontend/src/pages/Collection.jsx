import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ArrowDown } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("Relevant");
  const [filters, setFilters] = useState({ category: [], subCategory: [] });

  const toggleFilter = (filterType) => (event) => {
    setFilters((prev) => ({
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
      label: "SUB_CATEGORY",
      key: "subCategory",
      options: ["Topwear", "Bottomwear", "Winterwear"],
    },
  ];

  const filteredProducts =
    products?.filter(
      (item) =>
        (filters.category.length === 0 ||
          filters.category.includes(item.category)) &&
        (filters.subCategory.length === 0 ||
          filters.subCategory.includes(item.subCategory)),
    ) ?? [];

  const productSortOptions = ["Relevant", "Low-to-High", "High-to-Low"];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "Low-to-High") return a.price - b.price;
    if (sortType === "High-to-Low") return b.price - a.price;
    return 0;
  });

  return (
    <section className="flex flex-col sm:flex-row gap-1 sm:gap-10 py-5 text-gray-700 border-t border-gray-400">
      <div className="min-w-60 my-5">
        <p
          onClick={() => setShowFilter((v) => !v)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <ArrowDown
            className={`sm:hidden ${showFilter ? "rotate-180" : ""}`}
          />
        </p>
        {productFilters.map(({ label, key, options }) => (
          <div
            key={key}
            className={`border border-gray-400 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-gray-500">{label}</p>

            <div className="flex flex-col gap-2 text-sm font-light text-gray-500">
              {options.map((filter) => (
                <label key={filter} className="flex gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={filter}
                    id={filter}
                    value={filter}
                    checked={filters[key].includes(filter)}
                    onChange={toggleFilter(key)}
                    className="w-3"
                  />
                  {filter}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 my-5">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title firstText="ALL" secondText="COLLECTIONS" />
          <select
            name="sortProducts"
            id="sortProducts"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="text-sm px-2 border border-gray-400"
          >
            {productSortOptions.map((sortOption) => (
              <option key={sortOption} value={sortOption}>
                Sort by: {sortOption}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-5">
          {sortedProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 mt-5">
              No products found.
            </p>
          ) : (
            sortedProducts.map(({ _id, image, name, price }) => (
              <ProductItem
                key={_id}
                id={_id}
                image={image}
                name={name}
                price={price}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Collection;
