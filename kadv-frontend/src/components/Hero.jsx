import { assets } from "../assets/assets";
import Title from "./Title";

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 text-gray-500">
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <Title />
          <h2 className="text-2xl sm:text-4xl">Hello, World!</h2>
          <Title />
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

export default Hero;
