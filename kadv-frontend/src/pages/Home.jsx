import { useContext, useState } from "react";
import { Atom, Laptop, Sun } from "lucide-react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { placeHolderImage } from "../assets/assets";
import DisplayProducts, { Title } from "../components/DisplayProducts";

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

const Home = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = products?.slice(0, 10) || [];
  const bestSellerProducts =
    products?.filter((item) => item.bestseller).slice(0, 10) || [];

  const productSections = [
    {
      titleFirst: "LATEST",
      titleSecond: "COLLECTION",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      products: latestProducts,
    },
    {
      titleFirst: "BEST",
      titleSecond: "SELLERS",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      products: bestSellerProducts,
    },
  ];
  return (
    <section>
      <Hero />
      {productSections.map(
        ({ titleFirst, titleSecond, description, products }) => (
          <DisplayProducts
            key={`${titleFirst}-${titleSecond}`}
            {...{ titleFirst, titleSecond, description, products }}
          />
        ),
      )}
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
        src={placeHolderImage}
        alt="hero-image"
        loading="lazy"
        className="w-full sm:w-1/2 h-70 sm:h-100"
      />
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
    event.preventDefault();
    toast.success(`Subscribed: ${email}`);
    setEmail("");
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
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="on"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          disabled={!email.trim()}
          className="text-xs font-bold px-10 py-4 text-black bg-gray-400"
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
};
