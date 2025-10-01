
import { FaCogs, FaShieldAlt, FaHandshake, FaRocket } from "react-icons/fa";
import Containar from "../components/containar/Containar";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCogs className="text-4xl text-primary mb-4" />,
      title: "Expert Engineering Solutions",
      description:
        "We provide top-notch engineering solutions with advanced technology and skilled professionals to ensure quality and precision.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary mb-4" />,
      title: "Reliable & Trusted",
      description:
        "Our commitment to reliability and trust has made us a preferred choice for clients across various industries.",
    },
    {
      icon: <FaHandshake className="text-4xl text-primary mb-4" />,
      title: "Customer Focused Approach",
      description:
        "We prioritize client satisfaction and work closely with you to understand your unique requirements.",
    },
    {
      icon: <FaRocket className="text-4xl text-primary mb-4" />,
      title: "Innovative & Future Ready",
      description:
        "Innovation is at the core of our operations. We adopt modern engineering practices to stay ahead in the industry.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Containar>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            At Yousuf Engineering, we combine expertise, innovation, and reliability to deliver exceptional engineering solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Containar>
    </section>
  );
};

export default WhyChooseUs;
