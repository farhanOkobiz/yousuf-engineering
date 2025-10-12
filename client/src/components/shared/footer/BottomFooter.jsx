import React from "react";
import Containar from "../../../layouts/Containar";
import logo from "../../../assets/logos/logoblack.png";
import { Link } from "react-router-dom";

const BottomFooter = () => {
  return (
    <footer className="font-inter py-5 bg-[#2B3445] px-10 bottom-40 lg:top-0">
      <Containar>
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-400 text-center">
            ©2025 Yousuf Engineering, All rights reserved. Developed by
            <span className="text-white mx-2">
              <Link target="_blanck" to={"https://www.okobiz.com/"}>
                okobiz.
              </Link>
            </span>
          </p>
        </div>
      </Containar>
    </footer>
  );
};

export default BottomFooter;
