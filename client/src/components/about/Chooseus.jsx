import Containar from "../containar/Containar";
// import SewingMachineIcon from "../../assets/About/SewingMachineIcon.svg";
import { GiSewingMachine } from "react-icons/gi";

const topics = [
  {
    id: 1,
    title: "Premium HVAC Systems",
    description:
      "Our air conditioning systems are engineered with precision and reliability, ensuring optimal cooling performance for industrial and commercial environments.",
  },
  {
    id: 2,
    title: "Energy-Efficient Solutions",
    description:
      "We provide advanced VRF and VRV systems that deliver superior performance while reducing energy consumption and operational costs.",
  },
  {
    id: 3,
    title: "Expert Installation & Maintenance",
    description:
      "Our certified engineers offer professional installation and preventive maintenance services, ensuring your HVAC systems operate at peak efficiency.",
  },
  {
    id: 4,
    title: "Industrial Chiller Expertise",
    description:
      "We specialize in high-capacity chiller solutions designed to meet the demanding cooling requirements of large-scale manufacturing and industrial facilities.",
  },
  {
    id: 5,
    title: "24/7 Technical Support",
    description:
      "Our dedicated support team is available round-the-clock to assist with any technical issues, emergency repairs, or service inquiries.",
  },
];

const Chooseus = () => {
  return (
    <div>
      <Containar>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h4 className="text-md font-bold text-[#0083CB] uppercase mb-5">
              Why our clients love us
            </h4>
            <h1 className="text-4xl font-semibold">Why you should choose YOUSUF ENGINEERING</h1>
          </div>
          {/* <div>
            <img
              src={SewingMachineIcon}
              className="hidden lg:block rotate-135"
              alt="Sewing Machine Decoration"
            />
          </div> */}
          <div>
            <GiSewingMachine className="inline-block text-[#0083CB] text-center w-10 h-10 mb-4" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {topics.map((topic, index) => (
            <div key={topic.id} className="mt-10">
              <p className="text-lg font-medium flex items-center">
                {String(index + 1).padStart(2, "0")}
                <div className="w-full h-px bg-gray-300 ml-4"></div>
              </p>
              <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-3xl font-medium text-gray-900 w-full md:w-1/2">
                  {topic.title}
                </h2>
                <p className="text-gray-500 w-full md:w-1/2 text-lg">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Containar>
    </div>
  );
};

export default Chooseus;
