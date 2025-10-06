import aboutHeader from "../../assets/About/about_header.png";
import Containar from "../containar/Containar";
const AboutIntroduction = () => {
  return (
    <div>
      <Containar>
        <div className="my-24 w-full grid grid-cols-1 lg:grid-cols-2 space-y-5 lg:space-y-0">
          <div className="px-2 lg:px-10">
            <h4 className="text-xl font-bold text-[#F4A51D]">
              Welcome to{" "}
              <span className="text-primary">Yousuf engineering!</span>
            </h4>
            <h1 className="text-4xl font-semibold my-4 mb-8">
              We are building a better future
            </h1>
            <p className="text-lg leading-9 text-gray-500 text-justify">
              Welcome to Yousuf Engineering, your trusted partner in reliable
              appliance solutions! At Yousuf Engineering, we specialize in
              providing expert services for refrigerators, air conditioners, and
              motherboard repairs. From high-quality maintenance to innovative
              technical solutions, we cater to both households and businesses,
              ensuring their appliances run smoothly and efficiently. With a
              commitment to excellence, reliability, and customer satisfaction,
              Yousuf Engineering keeps your home and workspaces comfortable and
              fully operational. Experience seamless service and professional
              care with Yousuf Engineering—where expertise meets trust!
            </p>
          </div>
          <div>
            <img src={aboutHeader} className="w-full rounded-lg"></img>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AboutIntroduction;
