import Containar from "../containar/Containar";
import bdImg from "../../assets/Contact/contact-bg.jpg";
import { Link } from "react-router-dom";
import { socialLink } from "../constants/index";

const SocialMediaLinks = () => {
  return (
    // <Containar>
    <div className="my-10 lg:my-20 rounded-lg font-robo ">
      <div className="relative">
        <div
          className="h-96 md:h-80 bg-cover bg-fixed"
          style={{ backgroundImage: `url(${bdImg})` }}
        >
          <div className="absolute inset-0 bg-[rgb(0,0,0,.7)] text-white flex justify-center items-center">
            <div className="relative z-10">
              <Containar>
                <div className="flex flex-col gap-6 text-center">
                  <h2 className="font-bold text-xl">Social Media</h2>
                  <ul className="flex items-center flex-wrap gap-x-[14px]">
                    {socialLink.map((item, index) => {
                      const Icon = item?.icon;
                      return (
                        <li key={index}>
                          <Link
                            className="w-10 h-10 bg-white hover:scale-125 transition-all ease-linear duration-150 flex justify-center items-center rounded-full"
                            to={item.link}
                            style={{ color: item?.color }}
                            target="_blank"
                          >
                            <Icon />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Containar>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Containar>
  );
};

export default SocialMediaLinks;
