import { useState } from "react";
import Containar from "../containar/Containar";

const values = [
  {
    id: 1,
    valuesType: "Expert",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "Expertise and insightful evidence-based solutions are at the heart of everything we do. Expertise and insightful evidence-based solutions are at the heart of everything we do. Expertise and insightful evidence-based solutions are at the heart of everything we do. Expertise and insightful evidence-based solutions are at the heart of everything we do.",
  },
  {
    id: 2,
    valuesType: "Grounded",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "Our teams and partners work closely with local communities, engaging them in every level of decision-making. Our teams and partners work closely with local communities, engaging them in every level of decision-making. Our teams and partners work closely with local communities, engaging them in every level of decision-making. Our teams and partners work closely with local communities, engaging them in every level of decision-making.",
  },
  {
    id: 3,
    valuesType: "Impactful",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments.",
  },
  {
    id: 4,
    valuesType: "Bold",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "We model innovative approaches and are not afraid to challenge trategies that are failing. We model innovative approaches and are not afraid to challenge trategies that are failing. We model innovative approaches and are not afraid to challenge trategies that are failing.We model innovative approaches and are not afraid to challenge trategies that are failing.",
  },
];

const AboutValues = () => {
  const [value, setValue] = useState(values[0]);

  const handelValues = (id) => {
    setValue(values[id - 1]);
  };
  return (
    <div className="bg-[#FBF7F0] md:py-12">
      <Containar>
        <div className="lg:my-4 p-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5 xl:gap-x-10 space-y-10 lg:space-y-0">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                Our Mission
              </h2>
              <p className="w-full  leading-7 text-lg text-justify text-gray-500">
                At Qutex, our mission is to revolutionize the sewing industry by
                delivering innovative, high-quality sewing machines and services
                that empower creativity and precision. We are dedicated to
                supporting individuals and businesses by providing reliable,
                efficient, and user-friendly solutions tailored to meet their
                unique needs. Through excellence in craftsmanship and a
                commitment to customer satisfaction, we aim to inspire
                creativity and elevate sewing experiences worldwide.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                Our Vision
              </h2>
              <p className="w-full leading-7 text-lg text-gray-500 text-justify">
                Our vision is to become a global leader in the sewing machine
                industry, known for innovation, reliability, and
                customer-centric solutions. We strive to foster a community of
                creators, designers, and businesses who trust Qutex as their
                partner in achieving excellence. By driving technological
                advancements and sustainable practices, we envision a future
                where Qutex empowers every individual to unlock their full
                creative potential and bring their ideas to life.
              </p>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AboutValues;
