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
      className="group relative flex flex-col h-full overflow-hidden border border-gray-200/80 bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-aos="fade-up"
      {...motionProps}
    >
      <div className="relative">
        <div className="aspect-square w-full bg-white overflow-hidden">
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

      {/* Changed from text-center to text-left and adjusted padding */}
      <div className="flex flex-1 flex-col p-4 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
          {product.brand}
        </p>

        {/* Product Name - Left aligned */}
        <h3 className="font-sans font-medium text-gray-900 mb-3 line-clamp-2 leading-tight text-sm min-h-[2.8rem]">
          <Link
            to={`/product/${product.id}`}
            onClick={() => selectProduct(product)}
            className="transition-colors duration-300 hover:text-brand-gold"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </Link>
        </h3>

        {/* Price Section - Left aligned */}
        <div className="mt-auto">
          {product.onSale && product.oldPrice ? (
            <>
              <p className="text-lg font-bold text-brand-gold">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-gray-400 line-through mt-1">
                {formatPrice(product.oldPrice)}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
