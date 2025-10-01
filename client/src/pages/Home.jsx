
import Partner from "../components/home/Partner";
import Product from "../components/home/Product";
import Banner from "../components/home/Banner";
import Event from "../components/home/Event";
import Service from "../components/home/Service";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <>
      <Banner />
      <Service />
      <Product />
      <Event />
      <WhyChooseUs/>
      <Partner />
    </>
  );
};

export default Home;
