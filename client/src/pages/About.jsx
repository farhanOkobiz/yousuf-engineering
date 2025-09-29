// import React from 'react'

import AboutIntroduction from "../components/about/AboutIntroduction";
import AboutValues from "../components/about/AboutValues";
import Chooseus from "../components/about/Chooseus";
import OurJourney from "../components/about/OurJourney";
import WhatWeDo from "../components/about/WhatWeDo";
import Partner from "../components/home/Partner";
import BradCumbs from "../components/shared/BradCumbs";

const About = () => {
  return (
    <div className="font-robo lg:px-0">
      <div className="h-[68px] sm:h-[83.4px] bg-[#f5f5f5] "></div>
      <BradCumbs title="Know About Qutex " brad="About"></BradCumbs>
      <AboutIntroduction></AboutIntroduction>
      <AboutValues></AboutValues>
      <WhatWeDo></WhatWeDo>
      {/* <OurTeam></OurTeam> */}
      {/* <OurJourney></OurJourney> */}
      <Chooseus></Chooseus>
      <Partner></Partner>
    </div>
  );
};

export default About;
