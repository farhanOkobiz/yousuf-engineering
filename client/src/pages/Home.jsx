import { useState, useEffect } from "react";
import Partner from "../components/home/Partner";
import Product from "../components/home/Product";
import Banner from "../components/home/Banner";
import Event from "../components/home/Event";
import Service from "../components/home/Service";

const Home = () => {
  return (
    <>
      <Banner />
      <Service />
      <Product />
      <Event />
      <Partner />
    </>
  );
};

export default Home;
