import Containar from "../components/containar/Containar";
import thankyoulogo from "../assets/thank-you/thank-you_logo.jpg";
import logo from "../assets/logo/logo.png";

const Thankyou = () => {
  return (
    <div className="font-robo">
      {/* Header Bar */}
      <div className="h-[89.4px]"></div>

      <Containar>
        <div className="flex flex-col items-center justify-center my-16">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            {/* Brand Name */}
            <h1 className="text-5xl text-primary font-bold mb-6 tracking-tight">
              Qutex
            </h1>

            {/* Thank You Message */}
            <h2 className="text-2xl font-bold mb-2">
              Thank you for submit your information!
            </h2>

            {/* Thank You Image */}
            {/* <img src={thankyoulogo} alt="Thank You Logo" className="w-60 h-60 mt-4 mb-6" /> */}

            {/* Logo */}
            <img
              src={logo}
              alt="Thank You Logo"
              className="w-60 h-60 mt-4 mb-6 p-10 animate-spin360"
            />

            {/* Track Order Button */}
            <button className="border-2 border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition">
              Contact Us: 01914314909
            </button>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Thankyou;
