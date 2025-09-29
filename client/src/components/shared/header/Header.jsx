import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import Search from "./Search";

const header = () => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <div className="p-3 block sm:hidden">
        <Search />
      </div>
    </>
  );
};

export default header;
