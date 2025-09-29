import { GiChestnutLeaf, GiSewingMachine } from "react-icons/gi";
import Containar from "../containar/Containar";
import custom from "../../assets/About/Custom.jpg";
import quality from "../../assets/About/Quality.jpg";
import casee from "../../assets/About/Case.jpg";
import research from "../../assets/About/Research.jpg";

const workData = [
  {
    title: "Custom Industrial Sewing Solutions",
    description:
      "Qutex delivers tailor-made industrial sewing machine solutions designed to meet the specific needs of garment factories, upholstery businesses, and other industries.",
    image: custom, // Replace with the appropriate image path
  },
  {
    title: "Innovation in Sewing Technology",
    description:
      "Qutex is at the forefront of sewing innovation, focusing on cutting-edge research to enhance speed, precision, and versatility in industrial sewing machines.",
    image: research, // Replace with the appropriate image path
  },
  {
    title: "Proven Success Stories",
    description:
      "Our industrial sewing machines have consistently delivered exceptional results, increasing productivity and reducing downtime in demanding production environments.",
    image: quality, // Replace with the appropriate image path
  },
  {
    title: "Uncompromised Quality Assurance",
    description:
      "At Qutex, every sewing machine undergoes stringent quality checks to ensure maximum durability, performance, and customer satisfaction.",
    image: casee, // Replace with the appropriate image path
  },
];

const WhatWeDo = () => {
  return (
    <div className="my-20">
      <Containar>
        <div>
          <div className="flex justify-center">
            <GiSewingMachine className="inline-block text-[#0083CB] text-center w-10 h-10 mb-4" />
          </div>
          <h4 className="text-xl font-bold text-[#0083CB] text-center mb-10">
            Welcome to <span className="text-primary">Qutex!</span>
          </h4>
          <h1 className="text-4xl text-center font-semibold mb-12">
            Crafting Excellence in Sewing Machine Solutions
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
