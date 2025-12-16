import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Atom, Laptop, Sun } from "lucide-react";

const Home = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = products.slice(0, 10);
  const bestSellerProducts = products
    .filter((item) => item.bestseller)
    .slice(0, 10);
  const OUR_POLICIES = [
    {
      PolicyIcon: Atom,
      policyHeading: "Easy Exchange",
      policyBody: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    },
    {
      PolicyIcon: Laptop,
      policyHeading: "Easy Return",
      policyBody: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    },
    {
      PolicyIcon: Sun,
      policyHeading: "Customer Support",
      policyBody: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    },
  ];
  return (
    <section>
      <Hero />
      <LatestCollection products={latestProducts} />
      <BestSellers products={bestSellerProducts} />
      <OurPolicy policies={OUR_POLICIES} />
      <NewsLetterBox />
    </section>
  );
};

export default Home;

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 text-gray-500">
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <Title firstText="WELCOME TO" secondText="KADV-ECOMM" />
          <h2 className="text-2xl sm:text-4xl">Hello, World!</h2>
          <Title firstText="THE ONLINE" secondText="CLOTHING STORE" />
        </div>
      </div>
      <img
        src={assets.hero_img}
        alt="hero-image"
        loading="lazy"
        className="w-full sm:w-1/2"
      />
    </section>
  );
};

const LatestCollection = ({ products }) => {
  return (
    <section className="my-10">
      <div className="text-center py-5 text-2xl sm:text-4xl">
        <Title firstText="LATEST" secondText="COLLECTION" />
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque unde
          quae ipsa ratione possimus.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
        {products.map(({ _id, image, name, price }) => (
          <ProductItem
            key={_id}
            id={_id}
            image={image}
            name={name}
            price={price}
          />
        ))}
      </div>
    </section>
  );
};

const BestSellers = ({ products }) => {
  return (
    <section className="my-10">
      <div className="text-center py-5 text-2xl sm:text-4xl">
        <Title firstText="BEST" secondText="SELLERS" />
        <p className="w-4/5 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque unde
          quae ipsa ratione possimus.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
        {products.map(({ _id, image, name, price }) => (
          <ProductItem
            key={_id}
            id={_id}
            image={image}
            name={name}
            price={price}
          />
        ))}
      </div>
    </section>
  );
};

const OurPolicy = ({ policies }) => {
  return (
    <section className="flex flex-col sm:flex-row justify-between gap-10 sm:gap-4 text-center my-10 text-xs sm:text-sm md:text-base text-gray-700">
      {policies.map(({ PolicyIcon, policyHeading, policyBody }) => (
        <div key={policyHeading}>
          {PolicyIcon && <PolicyIcon className="m-auto mb-5 w-10 h-10" />}
          <h2 className="text-base sm:text-lg md:text-xl font-semibold my-2">
            {policyHeading}
          </h2>
          <p className="text-gray-500">{policyBody}</p>
        </div>
      ))}
    </section>
  );
};

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const onSubmitHandler = (event) => {
    console.log(`Form Submitted Sucessfully with email id: ${email}`);
    event.preventDefault();
  };
  return (
    <section className="text-center my-10">
      <h2 className="text-2xl font-medium text-gray-700">Subscribe Now</h2>
      <p className="my-2 text-xs sm:text-sm md:text-base text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptates
        facere quod provident temporibus explicabo non numquam nobis cumque
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-4 mx-auto my-5 pl-5 border border-gray-400"
      >
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          className="text-xs font-bold px-10 py-4 text-black bg-gray-400"
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
};
