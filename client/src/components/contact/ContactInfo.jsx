import React from "react";
import Containar from "../../layouts/Containar";
import { Link } from "react-router-dom";
import { socialList } from "../constants";

const ContactInfo = () => {
  return (
    <section>
      <Containar>
        <div className="flex justify-center mb-36">
          <div className="w-[970px] lg:h-[400px] px-5 sm:px-20 py-10 sm:py-20 bg-white block relative top-0 sm:-top-28 ">
            <div>
              <h3 className="text-2xl md:text-4xl text-texthead font-medium">
                Contact Information
              </h3>
              <p className="text-base italic text-texthead font-normal mt-12">
                We will answer any questions you may have about our online
                sales, rights or partnership service right here.
              </p>
            </div>
            <div className="mt-14 flex gap-x-36 flex-wrap ">
              <div className="mb-5 lg:mb-0">
                <div>
                  <h4 className="text-xl font-medium text-texthead">
                    Dhaka Office
                  </h4>
                  <p className="mt-4 text-texthead text-sm">
                  183,184 MISCO SUPER MARKET,MRPUR-1,DHAKA-1216
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to={"mailto:tmcsbd.hss@gmail.com"}
                    className="text-sm text-texthead mb-1 block hover:text-danger"
                  >
                    tmcsbd.hss@gmail.com
                  </Link>
                  <Link
                    to={"tel:+8801914314909"}
                    className="text-sm text-texthead hover:text-danger"
                  >
                    +8801914314909
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <h3 className="text-xl text-texthead font-medium pb-5">
                Social Media
              </h3>
              <ul className="flex items-center gap-x-5">
                {socialList.map((item, index) => {
                  let Icon = item.logo;
                  const bgColor =
                    item.name === "facebook"
                      ? "bg-[#3b5998] hover:bg-opacity-70"
                      : item.name === "instagram"
                      ? "bg-[#DC1E66] hover:bg-opacity-70"
                      : item.name === "youtube"
                      ? "bg-[#FF0000] hover:bg-opacity-70"
                      : item.name === "wechat"
                      ? "bg-[#2EBA00] hover:bg-opacity-70"
                      : item.name === "tiktok"
                      ? "bg-[#69C9D0] hover:bg-opacity-70"
                      : "";
                  return (
                    <Link key={index} className="text-texthead" to={item.link}>
                      <li
                        className={`w-10 h-10 rounded-full flex items-center text-white justify-center  ${bgColor} transition-all ease-linear duration-200 hover:text-white`}
                        key={index}
                      >
                        <Icon />
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Containar>
    </section>
  );
};

export default ContactInfo;
