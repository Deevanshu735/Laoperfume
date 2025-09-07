// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ShoppingBag, Heart } from "lucide-react";

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "LAK",
//     minimumFractionDigits: 0,
//   }).format(price);
// };

// const ProductCard = ({ product, selectProduct, ...motionProps }) => {
//   return (
//     <motion.div
//       className="group bg-white overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
//       {...motionProps} // Animation props are spread here
//     >
//       <div className="relative">
//         {/* Uniform Image Container */}
//         <div className="w-full aspect-square bg-gray-100">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover"
//             loading="lazy"
//           />
//         </div>

//         {/* Overlay with Responsive Button */}
//         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Link
//             to={`/product/${product.id}`}
//             onClick={() => selectProduct(product)}
//             className="flex items-center bg-brand-gold text-black font-bold py-2 px-4 md:py-2.5 md:px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm md:text-base "
//           >
//             <ShoppingBag className="w-5 h-5 mr-2" />
//             Buy Now
//           </Link>
//         </div>

//         {/* Heart Icon with Hover Effect */}
//         <button className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Heart size={24} className="text-black stroke-[0px] fill-white" />
//         </button>
//       </div>

//       <div className="p-4 sm:p-5 flex flex-col flex-1">
//         <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
//           {product.brand}
//         </p>
//         {/* Title with Flexible Height and Responsive Text */}
//         <h3
//           className="font-bold font-display mt-1 text-gray-800 min-h-[50px] md:min-h-[56px] text-base md:text-lg overflow-hidden"
//           style={{
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {product.name}
//         </h3>
//         <div className="mt-auto pt-2">
//           {/* Responsive Price */}
//           <p className="font-semibold text-brand-gold text-xl md:text-2xl">
//             {formatPrice(product.price)}
//           </p>
//           {product.onSale && product.oldPrice && (
//             <p className="text-sm text-gray-400 line-through">
//               {formatPrice(product.oldPrice)}
//             </p>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product, selectProduct, ...motionProps }) => {
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden border border-gray-200/80 bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-aos="fade-up"
      {...motionProps}
    >
      <div className="relative">
        <div className="aspect-square w-full bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <Link
            to={`/product/${product.id}`}
            onClick={() => selectProduct(product)}
            className="flex transform items-center bg-brand-gold py-2 px-5 text-sm font-bold text-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Buy Now
          </Link>
        </div>

        <button className="absolute top-3 right-3 z-10 scale-90 transform rounded-full bg-white/60 p-1.5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:!scale-110 hover:bg-white">
          <Heart size={20} className="stroke-1 text-gray-800" />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col bg-gray-50 p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {product.brand}
        </p>

        <h3 className="font-display text-lg font-bold leading-tight text-gray-900 mt-1 min-h-[56px]">
          <Link
            to={`/product/${product.id}`}
            onClick={() => selectProduct(product)}
            className="transition-colors duration-300 hover:text-brand-gold"
          >
            {product.name}
          </Link>
        </h3>

        {/* --- ELEGANT PRICE SECTION --- */}
        <div className="mt-auto flex flex-col items-center pt-3">
          {product.onSale && product.oldPrice ? (
            // This is for sale items
            <>
              <p className="text-xl font-bold text-brand-gold">
                {formatPrice(product.price)}
              </p>
              <p className="-mt-1 text-sm text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            </>
          ) : (
            // This is for regular priced items
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
