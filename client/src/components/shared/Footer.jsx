/* eslint-disable no-unused-vars */

import Containar from "../containar/Containar";
import logo from "../../assets/logo/logo.png";
import { contactInfo, menulist, socialLink } from "../constants";
import { Link, NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="bg-secondary text-black pt-20 font-robo px-4 md:px-2 lg:px-0">
        <div className="pb-16">
          <Containar>
            <div className=" grid grid-cols-12 gap-y-4  md:gap-10">
              {/* Section 1 */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 h-auto">
                <div className="w-[68px]">
                  <img className="w-full" src={logo} />
                </div>
                <h2 className="text-xl text-text font-bold mb-3 mt-5">
                  We Are Yousuf Engineering
                </h2>
                <p className="text-[14px] leading-7 text-justify text-gray-600">
                  We Are Yousuf Engineering – Committed to delivering comprehensive HVAC solutions including Air Conditioning, VRF, VRV, and Chiller systems that empower businesses, industries, and commercial establishments with energy-efficient climate control, enhanced comfort, and optimized performance for sustainable operations.
                </p>
              </div>

              {/* Section 3 */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <h2 className="text-xl font-bold mb-4">Links</h2>
                    <ul className="navLink flex flex-col md:flex-row md:flex-wrap lg:flex-col md:gap-3 lg:gap-0 md:gap-y-2">
                      {menulist.map((item, index) => (
                        <li key={index}>
                          <NavLink
                            to={item?.link}
                            className={({ isActive }) =>
                              isActive
                                ? "  text-primary text-[14px]"
                                : "text-gray-600  text-[14px] hover:text-primary transition-all ease-linear duration-150"
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-12 lg:col-span-7">
                    <h2 className="text-xl font-bold my-4 lg:mt-0">Office</h2>
                    <p className="text-gray-600 text-[14px] text-capitalize">
                      62/B North Pirerbag 60ft Mirpur Dhaka-1216.
                    </p>

                    <ul className="mt-5 flex flex-col gap-y-3">
                      {contactInfo.map((item, index) => {
                        const Icon = item?.icon;
                        return (
                          <li
                            className="hover:text-primary text-gray-600 transition-all ease-linear duration-150"
                            key={index}
                          >
                            <div className="flex gap-x-2   text-[14px] items-center">
                              <h3>
                                <Icon className="" />
                              </h3>
                              <Link target="_blanck" to={item?.link}>
                                {item?.contact}
                              </Link>
                            </div>{" "}
                          </li>
                        );
                      })}
                    </ul>

                    <div className=" mt-8">
                      <h3 className="text-[16px] font-bold">Get in touch</h3>
                      <ul className="flex items-center flex-wrap gap-x-2 mt-3">
                        {socialLink.map((item, index) => {
                          const Icon = item?.icon;
                          return (
                            <li className="text-black" key={index}>
                              <Link
                                target="_blanck"
                                className="w-8 h-8 justify-center hover:bg-primary transition-all ease-linear duration-150 items-center flex rounded-full text-text text-[15px] border border-[#828282] hover:border-primary hover:text-white"
                                to={item?.link}
                              >
                                <Icon />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="col-span-12 lg:col-span-4">
                <h2 className="text-xl font-bold mb-4">Maps</h2>
                <iframe
                  className="h-[200px] w-full border-none"
                  src="https://maps.google.com/maps?q=23.7918356,90.3678483&z=18&output=embed"
                  title="Yousuf Engineering location"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </Containar>
        </div>
      </div>

      <div className=" bg-primary  text-sm">
        <Containar>
          <div className="flex justify-between flex-wrap px-5 lg:px-0 py-5 text-white">
            <p className="text-[12px] sm:text-[14px]">
              Yousuf Engineering © 2025. All Rights Reserved.
            </p>
            <a
              href="https://okobiz.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-[12px] sm:text-[14px]">
                Developed by <span className="font-bold">okobiz</span>
              </p>
            </a>
          </div>
        </Containar>
      </div>
    </footer>
  );
};

export default Footer;
