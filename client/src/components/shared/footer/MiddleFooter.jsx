import React, { useContext, useEffect, useState } from "react";
import Containar from "../../../layouts/Containar";
import { socialList } from "../../constants";
import { Link } from "react-router-dom";
import ApiContext from "../../baseapi/BaseApi";
import axios from "axios";

const MiddleFooter = () => {
  const [categories, setCategories] = useState([]);

  const accountList = [
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Refunds Policy",
      link: "/refund-replace",
    },
    {
      name: "Delivery policy",
      link: "/delivery-info",
    },
    {
      name: "Terms & Condition",
      link: "/terms-condition",
    },
  ];

  const contacts = [
    {
      type: "Address",
      details: "183,184 MISCO SUPER MARKET,MRPUR-1,DHAKA-1216",
    },
    // {
    //   type: "Phone",
    //   details: "01970007503",
    //   link: "tel:+01970007503",
    // },
    {
      type: "Phone",
      details: "01914314909",
      link: "tel:+01914314909",
    },
    {
      type: "Email",
      details: "tmcsbd.hss@gmail.com",
      link: "mailto:tmcsbd.hss@gmail.com",
    },
  ];
  const baseApi = useContext(ApiContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseApi}/category`);
        setCategories(response.data.data.doc); // Assuming response.data contains the array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-primary px-10">
      <Containar>
        <div className="w-full flex justify-between flex-wrap py-10 gap-10 md:gap-0">
          <div className="w-full md:w-1/3">
            <h3 className="text-base md:text-lg text-gray-600 font-semibold uppercase">
              Yousuf Engineering
            </h3>
            <ul className="mt-3 flex flex-col gap-y-4 list-disc custom-list">
              {accountList.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item?.link}
                    className="text-base text-gray-600 hover:pl-1.5 cursor-pointer transition-all ease-linear duration-200 hover:text-gray-50 inline-block"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 pr-14">
            <h3 className="text-base md:text-lg text-gray-600 font-semibold uppercase">
              Shop Categories
            </h3>
            <ul className="mt-4 flex flex-col gap-y-4 list-disc custom-list overflow-y-auto max-h-40 scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary hover:scrollbar-thumb-opacity-100 hover:scrollbar-track-opacity-100 scrollbar-thumb-opacity-0 scrollbar-track-opacity-0 transition-all">
              {categories.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/shop/category/${item?._id}/${encodeURIComponent(
                      item?.title.replace(/\s+/g, "")
                    )}`}
                    className="text-base hover:pl-1.5 cursor-pointer text-gray-600 transition-all ease-linear duration-200 inline-block"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3">
            <div className="w-full">
              <h3 className="text-base md:text-lg text-gray-600 font-semibold uppercase">
                Contacts
              </h3>
              <div className="mt-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-600">{contact.type}</p>
                    {contact.link ? (
                      <a className="text-gray-600" href={contact.link}>
                        {contact.details}
                      </a>
                    ) : (
                      <p className="text-gray-600">{contact.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default MiddleFooter;
