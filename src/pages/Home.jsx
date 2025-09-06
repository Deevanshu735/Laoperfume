import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products as allProducts } from "/src/data/products.js";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";

// --- IMAGE IMPORTS ---
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import offer1 from "../assets/offer1.webp";
import offer2 from "../assets/offer2.webp";
import offer3 from "../assets/offer3.webp";
import Promotion from "./Promotion";

const Home = ({ selectProduct }) => {
  const trendingProducts = allProducts.filter((p) => p.category === "Trending");

  const sliderImages = [slider1, slider2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length
      );
    }, 5000); // Change slide every 5 seconds
    return () => clearTimeout(timer);
  }, [currentImageIndex, sliderImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const offers = [
    {
      img: offer1,
      title: "Illustrious Deluxe",
      description: "For Men - Up to 20% Off",
      link: "/products",
    },
    {
      img: offer2,
      title: "Catsuit Noir",
      description: "For Men - Up to 20% Off",
      link: "/products",
    },
    {
      img: offer3,
      title: "Spring Paradise",
      description: "Body Spray - Up to 20% Off",
      link: "/products",
    },
  ];

  return (
    <div className="bg-zinc-50 text-black">
      {/* Hero Slider Section */}
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden text-white">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            // --- THE FIX IS HERE ---
            // On mobile (default), we set the background position to the top.
            // On medium screens and up (md:), we set it back to the center.
            className="absolute inset-0 bg-cover bg-top md:bg-center"
            style={{
              backgroundImage: `url(${sliderImages[currentImageIndex]})`,
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-gold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover Your Signature Scent
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            A curated collection of the world's finest fragrances.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Link
              to="/products"
              className="bg-brand-gold text-black font-bold py-3 px-8 rounded-md hover:bg-opacity-80 transition-colors text-lg"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Offer Section */}
      <section className="py-10 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-2">
            Limited Time Offers
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            Indulge in exclusive savings on our most coveted collections and
            special editions.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {offers.map((offer, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={offer.link}>
                  <div className="group relative block overflow-hidden rounded-lg">
                    <img
                      src={offer.img}
                      alt={offer.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-bold font-display">
                        {offer.title}
                      </h3>
                      <p className="text-sm opacity-90">{offer.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Product Section */}
      <section className="py-5 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
            Trending Now
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            Explore our most popular and sought-after fragrances of the season.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trendingProducts.map((product) => (
              <motion.div
                key={product.id}
                className="group relative border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-gold"
                variants={itemVariants}
              >
                <div className="w-full h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-bold font-display truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {product.category}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="font-bold text-black hover:text-brand-gold transition-colors inline-flex items-center text-lg"
            >
              View All Products <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      <Promotion />
    </div>
  );
};

export default Home;
