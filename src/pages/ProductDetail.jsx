// import React, { useState, useEffect } from "react";
// import { useParams, Link, Navigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { products } from "../data/products.js";
// import { Star, Minus, Plus, ShoppingCart, Tag } from "lucide-react";

// // Function to format the Lao Kip price
// const formatPrice = (price) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "LAK",
//     minimumFractionDigits: 0,
//   }).format(price);
// };

// const ProductDetail = ({ selectedProduct }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [product, setProduct] = useState(selectedProduct);
//   const { id } = useParams();

//   useEffect(() => {
//     if (!product) {
//       const foundProduct = products.find((p) => p.id === parseInt(id));
//       setProduct(foundProduct);
//     }
//     window.scrollTo(0, 0);
//   }, [id, product]);

//   if (!product) {
//     return <Navigate to="/" />;
//   }

//   // --- 1. Calculate the Total Price ---
//   // This value will automatically update whenever 'quantity' or 'product' changes.
//   const totalPrice = product.price * quantity;

//   const handleQuantityChange = (amount) => {
//     setQuantity((prev) => Math.max(1, prev + amount));
//   };

//   const pageVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } },
//     exit: { opacity: 0 },
//   };

//   const salePercentage =
//     product.onSale && product.oldPrice
//       ? Math.round(
//           ((product.oldPrice - product.price) / product.oldPrice) * 100
//         )
//       : 0;

//   return (
//     <motion.div
//       className="bg-white"
//       variants={pageVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
//           {/* Product Image */}
//           <motion.div
//             className="w-full h-80 sm:h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden lg:sticky top-28"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             {product.onSale && (
//               <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full z-10 flex items-center">
//                 <Tag size={16} className="mr-2" />-{salePercentage}%
//               </div>
//             )}
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           </motion.div>

//           {/* Product Details */}
//           <motion.div
//             className="flex flex-col"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
//               {product.brand}
//             </p>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display my-3">
//               {product.name}
//             </h1>

//             <div className="flex items-center space-x-4 mb-6">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-5 w-5 ${
//                       i < product.rating
//                         ? "text-yellow-400 fill-current"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-gray-600">({product.reviews} reviews)</span>
//             </div>

//             <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
//               This is a placeholder description for {product.name}. In a real
//               application, this would contain detailed notes about the
//               fragrance, its composition, and the story behind it.
//             </p>

//             {/* --- 2. New, Clearer Price Section --- */}
//             <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-6">
//               <div className="flex justify-between items-center text-gray-600">
//                 <span className="text-base sm:text-lg">Price per item</span>
//                 <div className="flex items-baseline gap-3">
//                   {product.onSale && product.oldPrice && (
//                     <p className="text-lg sm:text-xl text-gray-400 line-through">
//                       {formatPrice(product.oldPrice)}
//                     </p>
//                   )}
//                   <p className="text-lg sm:text-xl font-semibold text-gray-800">
//                     {formatPrice(product.price)}
//                   </p>
//                 </div>
//               </div>

//               <div className="border-t border-zinc-200 my-3"></div>

//               <div className="flex justify-between items-center">
//                 <span className="text-xl sm:text-2xl font-bold">
//                   Total Price
//                 </span>
//                 <p className="text-2xl sm:text-3xl font-bold text-brand-gold">
//                   {formatPrice(totalPrice)}
//                 </p>
//               </div>
//             </div>

//             {/* Quantity Selector */}
//             <div className="flex items-center space-x-4 mb-8">
//               <p className="font-semibold text-base sm:text-lg">Quantity:</p>
//               <div className="flex items-center border border-gray-300 rounded-md">
//                 <button
//                   onClick={() => handleQuantityChange(-1)}
//                   className="p-3 hover:bg-gray-100 rounded-l-md transition-colors"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="w-12 text-center font-bold text-lg">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => handleQuantityChange(1)}
//                   className="p-3 hover:bg-gray-100 rounded-r-md transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Action Button */}
//             <Link
//               to={`/checkout`}
//               state={{ product, quantity, totalPrice }} // Pass total price to checkout
//               className="w-full flex items-center justify-center bg-black text-white font-bold py-3 sm:py-4 px-8 rounded-md hover:bg-gray-800 transition-colors text-base sm:text-lg"
//             >
//               <ShoppingCart className="w-6 h-6 mr-3" />
//               Proceed to Checkout
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductDetail;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, Navigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { products } from "../data/products.js";
// import { Star, Minus, Plus, ShoppingCart, Tag } from "lucide-react";

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "LAK",
//     minimumFractionDigits: 0,
//   }).format(price);
// };

// const ProductDetail = ({ selectedProduct }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [product, setProduct] = useState(selectedProduct);
//   const { id } = useParams();

//   useEffect(() => {
//     if (!product) {
//       const foundProduct = products.find((p) => p.id === parseInt(id));
//       setProduct(foundProduct);
//     }
//     window.scrollTo(0, 0);
//   }, [id, product]);

//   if (!product) {
//     return <Navigate to="/" />;
//   }

//   const totalPrice = product.price * quantity;
//   const handleQuantityChange = (amount) => {
//     setQuantity((prev) => Math.max(1, prev + amount));
//   };

//   const salePercentage =
//     product.onSale && product.oldPrice
//       ? Math.round(
//           ((product.oldPrice - product.price) / product.oldPrice) * 100
//         )
//       : 0;

//   return (
//     <motion.div
//       className="bg-gray-50 font-sans"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
//           <motion.div
//             className="w-full aspect-square bg-white rounded-lg overflow-hidden lg:sticky top-28 shadow-sm"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             {product.onSale && (
//               <div className="absolute top-4 left-4 bg-brand-gold text-black text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center shadow-md">
//                 <Tag size={14} className="mr-1.5" />
//                 SAVE {salePercentage}%
//               </div>
//             )}
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           </motion.div>

//           <motion.div
//             className="flex flex-col"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
//               {product.brand}
//             </p>
//             <h1 className="text-3xl sm:text-4xl font-bold font-display my-2 text-gray-900">
//               {product.name}
//             </h1>

//             <div className="flex items-center space-x-4 mb-6">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={20}
//                     className={
//                       i < product.rating
//                         ? "text-yellow-400 fill-current"
//                         : "text-gray-300"
//                     }
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-600">
//                 ({product.reviews} reviews)
//               </span>
//             </div>

//             <div className="space-y-6 text-gray-600 leading-relaxed text-base">
//               <div>
//                 <h2 className="font-bold text-gray-800 mb-2 font-display text-lg">
//                   The Scent Story
//                 </h2>
//                 <p>
//                   This is a placeholder description. In a real application,
//                   you'd describe the evocative story of the fragrance, its
//                   inspiration, and the feeling it's meant to conjure.
//                 </p>
//               </div>
//               <div>
//                 <h2 className="font-bold text-gray-800 mb-2 font-display text-lg">
//                   Scent Notes
//                 </h2>
//                 <ul className="list-disc list-inside space-y-1 text-sm">
//                   <li>
//                     <span className="font-semibold">Top:</span> Bergamot, Lemon,
//                     Black Pepper
//                   </li>
//                   <li>
//                     <span className="font-semibold">Middle:</span> Lavender,
//                     Geranium, Jasmine
//                   </li>
//                   <li>
//                     <span className="font-semibold">Base:</span> Cedarwood,
//                     Vetiver, Amber
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="my-8 border-t border-gray-200"></div>

//             {/* --- 4. FULLY RESPONSIVE Quantity & Price UI --- */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
//               {/* Quantity Selector */}
//               <div className="flex items-center">
//                 <p className="font-semibold text-gray-800 mr-4">Quantity:</p>
//                 <div className="flex items-center border border-gray-300 rounded-md">
//                   <button
//                     onClick={() => handleQuantityChange(-1)}
//                     className="p-3 hover:bg-gray-100 transition-colors"
//                   >
//                     <Minus className="w-4 h-4 text-gray-700" />
//                   </button>
//                   <span className="w-12 text-center font-bold text-lg text-gray-900">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => handleQuantityChange(1)}
//                     className="p-3 hover:bg-gray-100 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-gray-700" />
//                   </button>
//                 </div>
//               </div>

//               {/* Price Display */}
//               <div className="text-left sm:text-right">
//                 {product.onSale && (
//                   <p className="text-base text-gray-400 line-through">
//                     {formatPrice(product.oldPrice * quantity)}
//                   </p>
//                 )}
//                 <p className="text-3xl font-bold text-brand-gold">
//                   {formatPrice(totalPrice)}
//                 </p>
//               </div>
//             </div>

//             <Link
//               to={`/checkout`}
//               state={{ product, quantity, totalPrice }}
//               className="group w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-md hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
//             >
//               <ShoppingCart className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
//               Add to Cart
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
// --- The component now imports its own data ---
import { products as allProducts } from "../data/products.js";
import { Star, Minus, Plus, ShoppingCart, Tag } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(price);
};

// --- No more 'selectedProduct' prop needed ---
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find the product from the imported list based on the URL ID
    const foundProduct = allProducts.find((p) => p.id === parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false); // Set loading to false whether product is found or not
    window.scrollTo(0, 0);
  }, [id]); // This effect now only depends on the ID from the URL

  // --- Show a loading state while finding the product ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // --- If loading is finished and still no product, then redirect ---
  if (!product) {
    return <Navigate to="/" />;
  }

  const totalPrice = product.price * quantity;
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const salePercentage =
    product.onSale && product.oldPrice
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <motion.div
      className="bg-gray-50 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            className="w-full aspect-square bg-white rounded-lg overflow-hidden lg:sticky top-28 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {product.onSale && (
              <div className="absolute top-4 left-4 bg-brand-gold text-black text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center shadow-md">
                <Tag size={14} className="mr-1.5" />
                SAVE {salePercentage}%
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {product.brand}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold font-display my-2 text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < product.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed text-base">
              <div>
                <h2 className="font-bold text-gray-800 mb-2 font-display text-lg">
                  The Scent Story
                </h2>
                <p>
                  This is a placeholder description. In a real application,
                  you'd describe the evocative story of the fragrance, its
                  inspiration, and the feeling it's meant to conjure.
                </p>
              </div>
              <div>
                <h2 className="font-bold text-gray-800 mb-2 font-display text-lg">
                  Scent Notes
                </h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <span className="font-semibold">Top:</span> Bergamot, Lemon,
                    Black Pepper
                  </li>
                  <li>
                    <span className="font-semibold">Middle:</span> Lavender,
                    Geranium, Jasmine
                  </li>
                  <li>
                    <span className="font-semibold">Base:</span> Cedarwood,
                    Vetiver, Amber
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-8 border-t border-gray-200"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
              <div className="flex items-center">
                <p className="font-semibold text-gray-800 mr-4">Quantity:</p>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="text-left sm:text-right">
                {product.onSale && (
                  <p className="text-base text-gray-400 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </p>
                )}
                <p className="text-3xl font-bold text-brand-gold">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>
            <Link
              to={`/checkout`}
              state={{ product, quantity, totalPrice }}
              className="group w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-md hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
            >
              <ShoppingCart className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
              Add to Cart
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
