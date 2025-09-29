/* eslint-disable no-unused-vars */
import Containar from "../components/containar/Containar";
import ContractForm from "../components/Contract/ContractForm";
import ContractInfo from "../components/Contract/ContractInfo";
import OfficeLocation from "../components/Contract/OfficeLocation";
import SocialMediaLinks from "../components/Contract/SocialMediaLinks";
import Partner from "../components/home/Partner";

const Contact = () => {
  return (
    <div className="mx-auto font-robo lg:px-0">
      <div className="h-[68px] sm:h-[83.4px] bg-[#f5f5f5] "></div>
      <OfficeLocation />
      <ContractForm />
      <ContractInfo />
      <SocialMediaLinks />
      {/* <Gallery /> */}
      <Partner />
    </div>
  );
};

export default Contact;
