 

const ProductList = ({ products ,loading }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow hover:shadow-lg transition bg-white overflow-hidden"
        >
          {/* Product Image */}
          <div className="h-56 w-full">
            <img
              src={product.photos[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h2 className="text-lg font-semibold line-clamp-1">
              {product.title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Brand:</span>{" "}
              {product.brand?.title}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Category:</span>{" "}
              {product.category?.title}
            </p>

            {/* Advantages */}
            {product.advantages?.length > 0 && (
              <ul className="text-sm text-gray-700 mt-2 list-disc pl-5 space-y-1">
                {product.advantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            )}

            {/* Specifications */}
            {product.specification?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-sm">Specifications:</p>
                <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
                  {product.specification.map((spec) => (
                    <li key={spec._id}>{spec.model}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price (if exists) */}
            {product.price && (
              <p className="mt-3 text-primary font-bold text-lg">
                ৳ {product.price}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
