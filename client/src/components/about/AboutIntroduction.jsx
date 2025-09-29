import aboutHeader from "../../assets/About/about_header.jpg";
import Containar from "../containar/Containar";
const AboutIntroduction = () => {
  return (
    <div>
      <Containar>
        <div className="my-24 w-full grid grid-cols-1 lg:grid-cols-2 space-y-5 lg:space-y-0">
          <div className="px-2 lg:px-10">
            <h4 className="text-xl font-bold text-[#F4A51D]">
              Welcome to <span className="text-primary">Qutex!</span>
            </h4>
            <h1 className="text-4xl font-semibold my-4 mb-8">
              We are building a better future
            </h1>
            <p className="text-lg leading-9 text-gray-500 text-justify">
              Welcome to Qutex, your trusted partner in the world of sewing
              excellence! At Qutex, we specialize in providing premium sewing
              machines and expert solutions designed to empower creativity and
              precision. From high-performance industrial machines to
              user-friendly models for beginners, we cater to every sewing
              enthusiast's needs. With a commitment to quality, innovation, and
              customer satisfaction, Qutex ensures seamless stitching
              experiences for fashion designers, crafters, and businesses alike.
              Transform your ideas into reality with Qutex—where precision meets
              creativity!
            </p>
          </div>
          <div>
            <img
              src={aboutHeader}
              className="w-full rounded-lg"
            ></img>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AboutIntroduction;
