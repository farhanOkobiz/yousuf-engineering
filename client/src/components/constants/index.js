import {
  FaEnvelope,
  // FaFacebook,
  // FaInstagram,
  // FaLinkedin,
  FaPhoneAlt,
  FaYoutube,
  FaTelegram,
  FaWeixin,
  FaWhatsapp
} from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

export const menulist = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Product",
    link: "/shop",
  },
  {
    title: "Gallery",
    link: "/gallery",
  },
  {
    title: "Clients",
    link: "/clients",
  },
  {
    title: "About",
    link: "/about",
  },
   {
    title: "Blog",
    link: "/blogs",
  },
  {
    title: "Contact Us",
    link: "/contact-us",
  },
  {
    title: "Hotline",
    icon: FaPhoneAlt,
    link: "tel:+8801914314909",
    color: "#E63946",
  },
];

export const socialLink = [
  {
    title: "Facebook",
    icon: FaFacebookF,
    link: "https://www.facebook.com/profile.php?id=100054376337057 ",
    color:"#1877F2"
  },
  // {
  //   title: "Youtube",
  //   icon: FaYoutube,
  //   link: "https://www.youtube.com/@shahalam846",
  //   color:"#C11616"
  // },
  {
    title: "WhatsApp",
    icon: FaWhatsapp, // WhatsApp icon from React Icons
    link: "https://wa.me/8801914314909", // WhatsApp link with international number
    color: "#25D366",
  },
  // {
  //   title: "Telegram",
  //   icon: FaTelegram,
  //   link: "https://t.me/+88018187729352",
  //   color: "#0088cc",
  // },
  // {
  //   title: "WeChat",
  //   icon: FaWeixin, 
  //   link: "weixin://dl/chat?shahalam2935", 
  //   color: "#1AAD19",
  // },
];

export const contactInfo = [
  // {
  //   title: "Contact Number",
  //   contact: "01970007503",
  //   link: "tel:01970007503",
  //   icon: FaPhoneAlt,
  // },
  {
    title: "Contact Number",
    contact: "01914314909",
    link: "tel:01914314909",
    icon: FaPhoneAlt,
  },
  {
    title: "Email",
    contact: "tmcsbd.hss@gmail.com",
    link: "mailto:tmcsbd.hss@gmail.com",
    icon: FaEnvelope,
  },
];



import partner1 from "../../assets/partners/clients-image-copyright-1.webp";
import partner2 from "../../assets/partners/clients-image-copyright-2.webp";
import partner3 from "../../assets/partners/clients-image-copyright-3.webp";
import partner4 from "../../assets/partners/clients-image-copyright-4.webp";
import partner5 from "../../assets/partners/clients-image-copyright-5.webp";
import partner6 from "../../assets/partners/clients-image-copyright-6.webp";

export const partnerList = [
  {
    logo: partner1,
    name: "Qutex",
  },
  {
    logo: partner2,
    name: "Qutex",
  },
  {
    logo: partner3,
    name: "Qutex",
  },
  {
    logo: partner4,
    name: "Qutex",
  },
  {
    logo: partner5,
    name: "Qutex",
  },
  {
    logo: partner6,
    name: "Qutex",
  },
  {
    logo: partner2,
    name: "Qutex",
  },
  {
    logo: partner3,
    name: "Qutex",
  },
  {
    logo: partner4,
    name: "Qutex",
  },
  {
    logo: partner5,
    name: "Qutex",
  },
  {
    logo: partner6,
    name: "Qutex",
  },
];
