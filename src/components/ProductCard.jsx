import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";

// Function to format the Lao Kip price
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product, selectProduct }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { y: 20, opacity: 0 },
  };

  // Automatically calculate the sale percentage
  const salePercentage = product.onSale
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      className="group relative border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-gold bg-white"
      variants={itemVariants}
      layout // Ensures smooth animation when filtering
    >
      {/* Sale & Wishlist Badges */}
      <div className="absolute top-3 left-3 z-10">
        {product.onSale && (
          <div className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center">
            -{salePercentage}%
          </div>
        )}
      </div>
      <button className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-sm p-1.5 rounded-full text-gray-500 hover:text-red-500 transition-colors">
        <Heart size={20} />
      </button>

      <div className="w-full h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-gray-500 text-xs font-semibold uppercase">
          {product.brand}
        </p>
        <h3 className="text-base font-bold font-display mt-1 h-12">
          {product.name}
        </h3>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-xl font-semibold text-green-600">
              {formatPrice(product.price)}
            </p>
            {product.onSale && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* "Buy Now" button appears on hover */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link
          to={`/product/${product.id}`}
          onClick={() => selectProduct(product)}
          className="flex items-center bg-brand-gold text-black font-bold py-2 px-6 rounded-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Buy Now
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
