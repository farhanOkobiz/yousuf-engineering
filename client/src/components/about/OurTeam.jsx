import Containar from "../containar/Containar";
import { socialLink } from "../constants/index";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    id: 1,
    name: "K.M. Riadh Faisal",
    role: "Vice Chairman",
  },
  {
    id: 2,
    name: "Rajib Chawdhury",
    role: "CEO & Managing Director",
  },
  {
    id: 3,
    name: "Md. Murad Khan",
    role: "Director",
  },
  {
    id: 4,
    name: "Md. Oakil Ahmad Babul",
    role: "Director",
  },
  {
    id: 5,
    name: "Mosharaf Hossan",
    role: "Director",
  },
  {
    id: 6,
    name: "Md. Ashraful Islam Robin",
    role: "Director",
  },
];

const OurTeam = () => {
  return (
    <div className="py-24">
      <Containar>
        <div>
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Meet With Our Dream Team
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-14">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="h-[400px] bg-cover bg-center relative rounded-lg group"
                style={{
                  backgroundImage: `url(${member.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-0 bottom-0"></div>
                <h2 className="absolute w-full py-5 px-5 bg-[rgba(0,0,0,0.5)] text-white bottom-0 left-0 tracking-wide">
                  <span className="text-xl">{member.name}</span> <br />
                  <span className="text-sm">{member.role}</span>
                </h2>
                <div className="absolute bottom-5 right-0 group-hover:block group-hover:right-10 duration-500 flex flex-col gap-6">
                  <ul className=" flex-col items-center flex-wrap gap-[14px] mt-3 hidden">
                    {socialLink.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li className="text-black" key={index}>
                          <Link
                            className="w-0 h-0 duration-300 group-hover:w-10 group-hover:h-10 justify-center bg-white hover:scale-125 transition-all ease-linear items-center flex rounded-full text-[15px] hover:text-white"
                            to="/"
                            style={{ color: item.color }}
                          >
                            <Icon />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <button className="py-4 px-10 bg-primary font-medium text-white hidden">
            See Full Team
          </button>
        </div>
      </Containar>
    </div>
  );
};

export default OurTeam;
