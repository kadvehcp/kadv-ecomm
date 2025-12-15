import BestSellers from "../components/BestSellers";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";

const Home = () => {
  return (
    <section>
      <Hero />
      <LatestCollection />
      <BestSellers />
    </section>
  );
};

export default Home;
