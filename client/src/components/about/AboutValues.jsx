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
                Our mission is to deliver reliable, high-quality repair and
                maintenance services for refrigerators, air conditioners, and
                motherboards. We are committed to ensuring optimal appliance
                performance, extending the lifespan of your devices, and
                providing innovative technical solutions that cater to both
                homes and businesses. At Yousuf Engineering, customer
                satisfaction is at the heart of everything we do, and we strive
                to combine expertise, efficiency, and trust to create seamless,
                long-lasting solutions for all your appliance needs.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                Our Vision
              </h2>
              <p className="w-full leading-7 text-lg text-gray-500 text-justify">
                Our vision is to become the leading and most trusted provider of
                repair, maintenance, and technical solutions for refrigerators,
                air conditioners, and motherboards, setting the benchmark for
                excellence, innovation, and customer satisfaction. We aim to
                ensure every home and business enjoys reliable, efficient, and
                long-lasting appliance performance. By advancing our expertise,
                embracing the latest technologies, and delivering professional
                solutions, Yousuf Engineering aspires to exceed expectations,
                build lasting customer relationships, and make appliance
                reliability the standard.
              </p>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AboutValues;
