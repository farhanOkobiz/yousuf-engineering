// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import ApiContext from "../baseapi/BaseApi";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { resetColor } from "../../redux/slices/colorSlice";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import SkeletonLoader from "../skeletonLoader/SkeletonLoader";
// import NewProductItem from "../productitem/NewProductItem";

// const BrandShop = () => {
//   const baseApi = useContext(ApiContext);
//   // console.log(baseApi, "base api frm brand product======");
//   const { slug } = useParams();
//   const dispatch = useDispatch();
//   const [allBrandShop, setAllBrandShop] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const productsPerPage = 20; // Number of products per page
//   const { minPrice, maxPrice } = useSelector((state) => state.priceRange);
//   // const selectedColor = useSelector((state) => state.colors.selectedColor);
//   const selectedSortOption = useSelector(
//     (state) => state.sort.selectedSortOption
//   );

//   const getSortParameter = () => {
//     switch (selectedSortOption) {
//       case "popularity":
//         return "-visitCount";
//       case "low-to-high":
//         return "price";
//       case "discount":
//         return "-discount";
//       case "high-to-low":
//         return "-price";
//       case "discount-percent":
//         return "-discountPercent";
//       case "latest":
//       default:
//         return null;
//     }
//   };

//   // Fetch products from API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Reset color if price range, brandId or sort option changes
//         // if (
//         //   selectedColor &&
//         //   (minPrice !== undefined || maxPrice !== undefined || brandId)
//         // ) {
//         //   dispatch(resetColor());
//         // }

//         const sortParam = getSortParameter();
//         const params = {
//           "price[lt]": maxPrice,
//           "price[gt]": minPrice,
//           ...(sortParam && { sort: sortParam }),
//         };

//         const response = await axios.get(
//           `http://localhost:8000/api/v1/brand/${slug}/products`
//           // { params }
//         );
//         // const response = await axios.get(`${baseApi}/brand/${slug}/products`, {
//         //   params,
//         // });

//         // Adjust totalPages based on total number of products
//         const totalProducts = response.data.totalData; // Make sure this is the correct field for total count

//         console.log(response, "response from brand products===========");
//         let fetchedProducts = response.data.data.products;

//         // const uniqueProducts = [];
//         // const seenProductIds = new Set();
//         // fetchedProducts.forEach((item) => {
//         //   if (!seenProductIds.has(item.product._id)) {
//         //     seenProductIds.add(item.product._id);
//         //     uniqueProducts.push(item);
//         //   }
//         // });
//         // // Collect all sizes for each product
//         // const productsWithSizes = uniqueProducts.map((product) => {
//         //   const sizes = product.variant?.sizes || [];
//         //   return {
//         //     ...product,
//         //     sizes, // Add sizes to the product object if needed
//         //   };
//         // });
//         setAllBrandShop(fetchedProducts);
//         // setFilteredProducts(response.data.data.options);
//         setTotalPages(Math.ceil(totalProducts / productsPerPage));
//       } catch (err) {
//         setError(err);
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [baseApi, slug, minPrice, maxPrice, selectedSortOption, dispatch]);

//   // Filter products by selected color
//   // useEffect(() => {
//   //   if (selectedColor) {
//   //     const filtered = allBrandShop.filter(
//   //       (product) =>
//   //         product.variant?.colorName.toLowerCase() ===
//   //         selectedColor.toLowerCase()
//   //     );
//   //     setFilteredProducts(filtered);
//   //     setTotalPages(Math.ceil(filtered.length / productsPerPage));
//   //   } else {
//   //     setFilteredProducts(allBrandShop);
//   //     setTotalPages(Math.ceil(allBrandShop.length / productsPerPage));
//   //   }
//   // }, [selectedColor, allBrandShop]);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//     return pageNumbers;
//   };

//   const paginatedProducts = allBrandShop.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   if (error) return <div>Error fetching products: {error.message}</div>;

//   return (
//     <div>
//       <div className="grid grid-cols-2 gap-y-4 xl:gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
//         {loading ? (
//           <SkeletonLoader />
//         ) : paginatedProducts.length === 0 ? (
//           <div>No products found.</div>
//         ) : (
//           paginatedProducts.map((item) => (
//             <NewProductItem
//               key={item?._id}
//               product={item}
//               image={item?.product?.photos}
//               id={item?.product?._id}
//               subtitle={item?.brand?.title}
//               title={item?.product?.name}
//               categoryId={item?.category?._id}
//               slug={item?.brand?.slug}
//               categoryName={item?.category?.title}
//               discount={item?.discountValue}
//               discountType={item?.discountType}
//               discountPercent={item?.discountPercent}
//               priceAfterDiscount={item?.salePrice}
//               offerprice={item?.price - item?.discount}
//               freeShipping={item?.freeShipping}
//               regularprice={item?.price}
//               stock={item?.stock}
//             />
//           ))
//         )}
//       </div>
//       {filteredProducts.length > 0 && (
//         <PaginationControls
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//           getPageNumbers={getPageNumbers}
//         />
//       )}
//     </div>
//   );
// };

// const PaginationControls = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   getPageNumbers,
// }) => {
//   const pageNumbers = getPageNumbers();

//   return (
//     <div className="flex items-center justify-center mt-28 space-x-2">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`w-10 h-10 border rounded-full flex items-center justify-center ${
//           currentPage === 1
//             ? "bg-gray-300 text-gray-500"
//             : "bg-texthead text-white hover:bg-danger"
//         } transition-colors`}
//       >
//         <FaChevronLeft />
//       </button>
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={`w-10 h-10 border rounded-full flex items-center justify-center ${
//             number === currentPage
//               ? "bg-danger text-white"
//               : "bg-white text-texthead hover:bg-red-100"
//           } transition-colors`}
//         >
//           {number}
//         </button>
//       ))}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`w-10 h-10 border rounded-full flex items-center justify-center ${
//           currentPage === totalPages
//             ? "bg-gray-300 text-gray-500"
//             : "bg-texthead text-white hover:bg-danger"
//         } transition-colors`}
//       >
//         <FaChevronRight />
//       </button>
//     </div>
//   );
// };

// export default BrandShop;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import {
  FaBangladeshiTakaSign,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa6";
import api from "../axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { addToAgroCart } from "../../redux/slices/cart/agroCartSlice";
import SortOption from "./SortOption";
import ShopDrawer from "../Drawer/ShopDrawer";

const BrandShop = () => {
  const [productsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [gridOrList, setGridOrList] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { selectedRange, minPrice, maxPrice } = useSelector(
    (state) => state.priceRange
  );
  const sortOption = useSelector((state) => state.sort.sortOption);

  const handleAddtoCart = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
  };
  const handleBuyNow = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
    // if (token) {
    //   navigate("/checkout");
    // } else {
    //   navigate("/login");
    // }
    navigate(`/checkout/${product?._id}`);
  };

  // console.log(location);
  const lastSlug = location.pathname.split("/").pop();

  // console.log("lastSlug", lastSlug);
  // Fetch products function
  const fetchProducts = async (page, limit) => {
    try {
      let sort = "";

      // Determine the sort parameter based on the selected sortOption
      if (sortOption === "lowToHigh") {
        sort = "price"; // Ascending order of price
      } else if (sortOption === "highToLow") {
        sort = "-price"; // Descending order of price
      } else if (sortOption === "mostViewed") {
        sort = "-visitCount"; // Descending order of price
      } else if (sortOption === "bestSelling") {
        sort = "-saleNumber"; // Descending order of price
      }
      const response = await api.get(`/brand/${lastSlug}/products`, {
        params: {
          limit: limit,
          page: page,
          "price[gte]": selectedRange[0],
          "price[lte]": selectedRange[1],
          sort,
        },
      });
      setTotalProducts(response.data.totalData); // Update total products
      return response.data.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Handle errors gracefully
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts(currentPage, productsPerPage);
      setProducts(productsData);
    };

    loadProducts();
  }, [currentPage, productsPerPage, lastSlug, selectedRange, sortOption]);

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [isShopDrawerOpen, setShopDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setShopDrawerOpen((prevState) => !prevState);
  };

  let sortedProducts = [...products];

  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  return (
    <>
      <div className="py-4 font-robo md:px-5 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setGridOrList(true)}
            className={`w-9 h-9 ${gridOrList
              ? "bg-primary text-white"
              : "bg-transparent border text-text"
              } flex cursor-pointer justify-center items-center`}
          >
            <BsGrid3X3GapFill className="w-5 h-5" />
          </div>
          <div
            onClick={() => setGridOrList(false)}
            className={`w-9 h-9 border flex ${!gridOrList
              ? "bg-primary text-white"
              : "bg-transparent border text-text"
              } cursor-pointer justify-center items-center`}
          >
            <FaList className="w-5 h-5" />
          </div>
          <div className="w-9 h-9 border flex  bg-primary text-white cursor-pointer justify-center items-center md:hidden">
            <FaFilter onClick={toggleDrawer} className="w-5 h-5" />
          </div>
        </div>
        <SortOption />
      </div>

      {gridOrList ? (
        <div className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full px-5 pb-6">
            {sortedProducts?.map((product, index) => (
              <div
                key={index}
                className="rounded-lg hover:shadow-lg overflow-hidden bg-white group pb-4 border"
              >
                <div className="relative">
                  <div className="h-[300px] overflow-hidden">
                    <Link to={`/shop/${product?.slug}`}>
                      <img
                        src={product?.photos[0]}
                        alt={product?.title}
                        className="w-full group-hover:scale-105 transition-all ease-linear duration-300 h-full group rounded-none object-cover"
                      />
                    </Link>
                  </div>
                  {/* <div className="bg-primary group-hover:bg-secondary group-hover:text-primary border-primary border-2 transition-all ease-linear duration-150 text-white absolute right-4 -bottom-7 rounded-full border-4 border-white flex justify-center items-center w-16 h-16">
                    <p className="text-base uppercase font-medium">
                      {product?.size}
                    </p>
                  </div> */}
                </div>
                <div className="text-left px-4">
                  <p className="font-medium line-clamp-3 text-[0.75rem] md:text-[1rem] mt-7 mb-2 capitalize">
                    <Link to={`/shop/${product?.slug}`}>{product?.title}</Link>
                  </p>
                  {product?.price && (
                    <p className="text-[1rem] text-blue-800 font-bold flex items-center">
                      <FaBangladeshiTakaSign className="mr-1" />
                      <span>
                        <span className="text-[1rem] text-blue-800 font-bold"></span> {product?.price}
                      </span>
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="px-5 rounded-md py-1.5 text-[14px] font-medium bg-primary text-white hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-14">
          <div className="flex flex-col gap-y-10">
            {sortedProducts?.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-12 lg:gap-x-10 pb-8 border-b"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="w-full">
                    <Link to={`/shop/${product?.slug}`}>
                      <img src={product?.photos[0]} className="rounded-lg" />
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <Link
                    to={`/shop/${product?.slug}`}
                    className="font-semibold line-clamp-3 text-[0.75rem] md:text-[1rem] capitalize"
                  >
                    {product?.title}
                  </Link>

                  <p className="text-gray-600 text-[14px] line-clamp-3 leading-7 mt-3">
                    {product?.details.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                  {product?.price && (<p className="flex items-center text-[18px] mt-5">
                    <FaBangladeshiTakaSign className="inline-block mr-1" />
                    <span>
                      <span className="text-[1rem] text-blue-800 font-bold"></span> {product?.price}
                    </span>
                  </p>
                  )}

                  <div className="flex items-center gap-x-2.5 mt-7">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="px-5 rounded-md py-1.5 text-[14px] font-medium bg-primary text-white hover:bg-secondary hover:text-primary border-primary border-2 transition-all ease-linear duration-150"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {products.length == 0 && (
        <h3 className="text-[32px] text-gray-400 text-center font-medium pb-28">
          Product Not Found
        </h3>
      )}
      {/* {totalPages != 0 && (
        <div className="flex justify-center mt-16 pt-12 pb-20">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>
      )} */}
      {totalProducts > productsPerPage && (
        <div className="flex justify-center mt-16 pt-12 pb-20">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-white bg-primary rounded-lg disabled:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <ShopDrawer
        toggleDrawer={toggleDrawer}
        lastSlug={lastSlug}
        isShopDrawerOpen={isShopDrawerOpen}
      ></ShopDrawer>
    </>
  );
};

export default BrandShop;
