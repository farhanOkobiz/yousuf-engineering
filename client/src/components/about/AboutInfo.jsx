import React from "react";
import { Link } from "react-router-dom";
import Containar from "../../layouts/Containar";
import { socialList } from "../constants";
import ProductSections from "./ProductSections";

const AboutInfo = () => {
  return (
    <section>
      <Containar>
        <div className="space-y-10">
          {/* Welcome Section */}
          <div className="px-5 py-10 lg:px-20 lg:py-20 bg-gradient-to-b from-blue-100 to-gray-100 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Welcome to Yousuf Engineering
            </h2>
            <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl mx-auto">
              Discover top-quality sewing machines and accessories to bring your
              creative ideas to life. At Yousuf Engineering, we offer a wide range
              of products designed to meet the needs of beginners and
              professionals alike.
            </p>
          </div>

          {/* Our Products Section */}
          <div className="px-5 py-10 lg:px-20 lg:py-20 bg-gradient-to-b from-indigo-100 to-gray-200 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold">Our Products</h2>
            <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl mx-auto">
              Explore our extensive range of sewing machines and accessories
              tailored to different needs and skill levels.
            </p>
            <ul className="mt-8 space-y-4 text-left max-w-3xl mx-auto">
              <li>
                <strong>Industrial Sewing Machines:</strong> Built for
                durability and heavy-duty performance in commercial settings.
              </li>
              <li>
                <strong>Domestic Sewing Machines:</strong> Perfect for
                home-based projects, offering versatility and ease of use.
              </li>
              <li>
                <strong>Embroidery Machines:</strong> Ideal for intricate
                designs and creative projects.
              </li>
              <li>
                <strong>Parts & Accessories:</strong> Includes needles, threads,
                bobbins, and other essential items.
              </li>
              <li>
                <strong>Maintenance Kits:</strong> Tools and supplies to keep
                your machines running smoothly.
              </li>
            </ul>
          </div>

          {/* Why Choose Us Section */}
          <div className="px-5 py-10 lg:px-20 lg:py-20 bg-gradient-to-b from-green-100 to-gray-200 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold">Why Choose Us?</h2>
            <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl mx-auto">
              At Yousuf Engineering, we are committed to providing exceptional
              products and services that exceed your expectations.
            </p>
            <ul className="mt-8 space-y-4 text-left max-w-3xl mx-auto">
              <li>
                <strong>Quality Assurance:</strong> All our products are tested
                for reliability and performance.
              </li>
              <li>
                <strong>Affordable Prices:</strong> Competitive pricing without
                compromising on quality.
              </li>
              <li>
                <strong>Customer Support:</strong> Dedicated team to assist with
                your queries and concerns.
              </li>
              <li>
                <strong>Expert Guidance:</strong> Professional advice to help
                you choose the right machine for your needs.
              </li>
              <li>
                <strong>Maintenance Services:</strong> Keep your machines in top
                condition with our expert repair and servicing.
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="px-5 py-10 lg:px-20 lg:py-20 bg-gradient-to-b from-blue-200 to-indigo-100 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Follow Us on Social Media
            </h2>
            <p className="mt-4 text-sm lg:text-base">
              Stay connected and follow our latest updates on social media!
            </p>
            <div className="flex justify-center gap-5 mt-10">
              {socialList.map((item, index) => {
                const Icon = item.logo;
                return (
                  <Link
                    key={index}
                    to={item.link}
                    className="transition-transform transform hover:scale-110"
                  >
                    <Icon className="w-10 h-10 bg-gray-600 p-2 text-white rounded-md" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Containar>
    </section>
  );
};

export default AboutInfo;
