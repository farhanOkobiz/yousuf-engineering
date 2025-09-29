import Containar from "../containar/Containar";
// import SewingMachineIcon from "../../assets/About/SewingMachineIcon.svg";
import { GiSewingMachine } from "react-icons/gi";

const topics = [
  {
    id: 1,
    title: "High-Quality Machines",
    description:
      "Our sewing machines are built with precision and durability, ensuring seamless stitching for every project.",
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description:
      "We provide premium sewing machines and accessories at competitive prices, making quality accessible to everyone.",
  },
  {
    id: 3,
    title: "Expert Maintenance",
    description:
      "Our expert team offers reliable maintenance services, ensuring your sewing machines perform at their best.",
  },
  {
    id: 4,
    title: "Innovative Technology",
    description:
      "We integrate the latest technology into our machines to meet modern sewing demands with efficiency and ease.",
  },
  {
    id: 5,
    title: "Customer Support",
    description:
      "Our dedicated support team is always ready to assist with any inquiries or technical issues you may encounter.",
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
            <h1 className="text-4xl font-semibold">Why you should choose Qutex</h1>
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
