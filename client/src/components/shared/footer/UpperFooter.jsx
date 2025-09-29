import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Containar from "../../../layouts/Containar";
import { socialList } from "../../constants";
import logo from "../../../assets/logos/logoblack.png";
import { Link } from "react-router-dom";

const UpperFooter = () => {
  return (
    <div className="py-2 font-inter bg-[#4e4e4c] px-10 border-b border-b-gray-700">
      <Containar>
        <div className="w-full flex justify-between flex-wrap">
          <img src={logo} alt="logo" className="w-32" />

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
      </Containar>
    </div>
  );
};

export default UpperFooter;
