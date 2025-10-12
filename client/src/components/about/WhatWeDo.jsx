import Containar from "../containar/Containar";
import custom from "../../assets/About/custom.jpg";
import quality from "../../assets/About/quality.jpg";
import casee from "../../assets/About/case.jpg";
import research from "../../assets/About/research.jpg";

const workData = [
  {
    title: "Custom HVAC Solutions",
    description:
      "Yousuf Engineering delivers tailor-made air conditioning and chiller solutions designed to meet the specific cooling requirements of garment factories, commercial buildings, and industrial facilities.",
    image: custom,
  },
  {
    title: "Advanced Climate Control Technology",
    description:
      "Yousuf Engineering leverages cutting-edge VRF and VRV technology, focusing on energy efficiency, smart controls, and precision climate management for diverse applications.",
    image: research,
  },
  {
    title: "Proven Track Record",
    description:
      "Our HVAC systems have consistently delivered exceptional performance, maintaining optimal temperatures and reducing energy costs in demanding industrial and commercial environments.",
    image: quality,
  },
  {
    title: "Uncompromised Service Excellence",
    description:
      "At Yousuf Engineering, every installation undergoes rigorous quality checks and professional commissioning to ensure maximum efficiency, reliability, and customer satisfaction.",
    image: casee,
  },
];

const WhatWeDo = () => {
  return (
    <div className="my-20">
      <Containar>
        <div>
          <div className="flex justify-center">
            {/* <GiSewingMachine className="inline-block text-[#0083CB] text-center w-10 h-10 mb-4" /> */}
          </div>
          <h4 className="text-xl font-bold text-[#0083CB] text-center mb-10">
            Welcome to <span className="text-primary">YOUSUF ENGINEERING!</span>
          </h4>
          <h1 className="text-4xl text-center font-semibold mb-12">
            Engineering Excellence in Climate Control Solutions
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5 my-5">
            {workData.map((work, index) => (
              <div className="flex flex-col" key={index}>
                <div className="relative flex justify-center items-center">
                  <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-primary animate-spin-slow"></div>
                  <div className="w-60 h-60 rounded-full overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center mt-8 flex flex-col justify-between h-full">
                  <h1 className="text-2xl font-bold text-primary mb-4">
                    {work.title}
                  </h1>
                  <p className="text-lg leading-7 text-gray-600">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default WhatWeDo;
