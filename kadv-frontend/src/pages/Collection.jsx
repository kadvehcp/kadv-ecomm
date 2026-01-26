import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ArrowDown } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
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
      filterType: "CATEGORY",
      handler: toggleFilter("category"),
      filters: ["Men", "Women", "Kids"],
    },
    {
      filterType: "SUB_CATEGORY",
      handler: toggleFilter("subCategory"),
      filters: ["Topwear", "Bottomwear", "Winterwear"],
    },
  ];

  const productSortOptions = ["Relevant", "Low-to-High", "High-to-Low"];

  const filteredProducts = products.filter(
    (item) =>
      (filters.category.length === 0 ||
        filters.category.includes(item.category)) &&
      (filters.subCategory.length === 0 ||
        filters.subCategory.includes(item.subCategory)),
  );

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
        {productFilters.map(({ filterType, handler, filters }) => (
          <div
            key={filterType}
            className={`border border-gray-400 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-gray-500">
              {filterType}
            </p>

            <div className="flex flex-col gap-2 text-sm font-light text-gray-500">
              {filters.map((filter) => (
                <label key={filter} className="flex gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={filter}
                    id={filter}
                    value={filter}
                    onChange={handler}
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
          {filteredProducts.map(({ _id, image, name, price }) => (
            <ProductItem
              key={_id}
              id={_id}
              image={image}
              name={name}
              price={price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
