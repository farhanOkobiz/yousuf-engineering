import React, { useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/header/Header";
import Footer from "../components/shared/footer/Footer";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import FixedCart from "../components/floatcart/FixedCart";
import ScrollToTop from "react-scroll-to-top";
import whatsAppIcon from "../assets/logos/wechatAppIcon.png";
import MessengerBtn from "../components/MessengerBtn";
import FooterMenu from "../pages/FooterMenu";

const RootLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
  );

  return (
    <div className="font-inter">
      <Theme>
        {/* <div className="fixed right-9 bottom-24 z-50">
          <MessengerBtn /> 
        </div> */}

        <a
          href="https://weixin.qq.com/r/shahalam29351"
          target="_blank"
          className="fixed right-10 bottom-[90px] z-[10000]"
        >
          <img src={whatsAppIcon} alt="" className="w-10" />
        </a>

        <ScrollToTop
          style={{ backgroundColor: "#F5F5F5", border: "1px solid #0083CB" }}
          smooth
          color="#0083CB"
        />

        {location.pathname != "/cart" && <FixedCart />}
        <Header />
        {/* Suspense with a Loader */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
        <Footer />
        <FooterMenu />
      </Theme>
    </div>
  );
};

export default RootLayout;
