import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdPhoneEnabled } from "react-icons/md";
import Containar from "../containar/Containar";
import { Link } from "react-router-dom";

const ContractInfo = () => {
  return (
    <Containar>
      <div className=" w-4/5 md:w-full mx-auto rounded-lg font-robo my-20">
        <div className="flex  flex-col md:flex-row flex-wrap gap-6 md:gap-0  md:justify-between">
          <div className="flex flex-col sm:flex-row md:justify-center items-start gap-5 md:w-[33%]">
            <div className="">
              <MdLocationOn className="text-primary w-8 h-8 rounded-full" />
            </div>
            <div className="font-medium">
              <h2 className=" text-2xl mb-4">Address</h2>
              <p className="text-gray-500 font-light text-lg">
                183,184 MISCO SUPER MARKET,MRPUR-1
              </p>
              <p className="text-gray-500 font-light text-lg">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:justify-center items-start gap-5 md:w-[33%]">
            <div className="">
              <MdEmail className="text-primary w-8 h-8 rounded-full" />
            </div>
            <div className="font-medium text-wrap">
              <h2 className="text-2xl mb-4">Email</h2>
              <Link
                to={"mailto:tmcsbd.hss@gmail.com"}
                className="text-gray-500 font-light text-base md:text-lg"
              >
                tmcsbd.hss@gmail.com <br />
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:justify-center items-start gap-5 md:w-[33%]">
            <div className="">
              <MdPhoneEnabled className="text-primary w-8 h-8 rounded-full rotate-[110deg]" />
            </div>
            <div className=" font-medium">
              <h2 className=" text-2xl mb-4">Phone</h2>
              <div>

              </div>
              {/* <Link
                to={"telto:01970007503"}
                className="block text-gray-500 font-light text-lg"
              >
                +88 01970007503
              </Link> */}
              <Link
                to={"telto:01914314909"}
                className="block text-gray-500 font-light text-lg"
              >
                +88 01914314909
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Containar>
  );
};

export default ContractInfo;
