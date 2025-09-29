import React from "react";
import Containar from "../../layouts/Containar";
import { socialList } from "../constants";

const ProductSections = () => {
  const sections = [
    {
      id: "shoes",
      title: "Step into Style with Shoes",
      description:
        "Find the perfect pair of shoes for any occasion. From casual sneakers to formal footwear, our collection offers unparalleled comfort and style.",
      bgGradient: "from-purple-200 to-blue-200",
      categories: [
        { name: "Casual Sneakers", detail: "Everyday comfort and style." },
        { name: "Formal Shoes", detail: "Elegant and sleek designs." },
        { name: "Boots", detail: "Rugged, durable, and fashionable." },
        { name: "Flats", detail: "Versatile styles for every look." },
      ],
    },
    {
      id: "accessories",
      title: "Accessorize Your Life",
      description:
        "Complete your outfits with a touch of flair. Explore our premium collection of accessories for men and women.",
      bgGradient: "from-yellow-100 to-orange-300",
      categories: [
        { name: "Watches", detail: "Timeless pieces for every occasion." },
        { name: "Jewelry", detail: "Elegant necklaces, rings, and more." },
        { name: "Bags", detail: "Stylish and functional handbags." },
        { name: "Sunglasses", detail: "Protect your eyes in style." },
      ],
    },
    {
      id: "kitchen",
      title: "Elevate Your Kitchen",
      description:
        "Transform your cooking space with high-quality kitchen essentials that blend style with functionality.",
      bgGradient: "from-green-100 to-green-300",
      categories: [
        { name: "Cookware", detail: "Durable and stylish pots and pans." },
        { name: "Tableware", detail: "Elegant plates and cutlery sets." },
        { name: "Storage", detail: "Organizers to keep your kitchen tidy." },
        { name: "Gadgets", detail: "Innovative tools for efficient cooking." },
      ],
    },
    {
      id: "home-decor",
      title: "Style Your Space",
      description:
        "Add personality to your home with our stunning collection of decorations and furniture.",
      bgGradient: "from-blue-100 to-indigo-200",
      categories: [
        { name: "Wall Art", detail: "Unique and creative designs." },
        { name: "Lighting", detail: "Modern and ambient light options." },
        { name: "Textiles", detail: "Cozy rugs and throw pillows." },
        { name: "Decor Accents", detail: "Small touches for big impact." },
      ],
    },
    {
      id: "unique-products",
      title: "Discover Unique Finds",
      description:
        "Explore a curated selection of exclusive and innovative products to make your life easier and more stylish.",
      bgGradient: "from-gray-100 to-gray-300",
      categories: [
        { name: "Eco-Friendly", detail: "Sustainable and green products." },
        { name: "Tech Gadgets", detail: "Smart solutions for everyday use." },
        { name: "Handcrafted", detail: "Beautiful, artisan-made items." },
        { name: "Gifts", detail: "Creative and thoughtful presents." },
      ],
    },
  ];

  return (
    <section className="">
      <Containar>
        {sections.map((section) => (
          <div
            key={section.id}
            className={`mb-10 p-6 lg:p-10 rounded-lg bg-gradient-to-b ${section.bgGradient}`}
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4">
              {section.title}
            </h2>
            <p className="text-sm lg:text-lg text-center mb-6">
              {section.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.categories.map((category, index) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        

        
      </Containar>
    </section>
  );
};

export default ProductSections;
