import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products as allProducts } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Promotion from "../pages/Promotion.jsx";
import Contact from "../pages/Contact.jsx";
import { ArrowRight } from "lucide-react";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import mobileslider1 from "../assets/mobileslider.jpg";
import mobileslider2 from "../assets/mobileslider2.jpg";
import offer1 from "../assets/offer1.webp";
import offer2 from "../assets/offer2.webp";
import offer3 from "../assets/offer3.webp";
import all from "../assets/together.svg";
import me from "../assets/manager.svg";
import wo from "../assets/woman.svg";
import trend from "../assets/trending.svg";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const Home = ({ selectProduct }) => {
  const { width } = useWindowSize();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const sliderImages =
    width < 768 ? [mobileslider1, mobileslider2] : [slider1, slider2];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length
      );
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentImageIndex, sliderImages.length]);

  useEffect(() => {
    let filtered;
    if (activeCategory === "All") {
      filtered = allProducts.filter((p) =>
        ["Men", "Women", "Unisex"].includes(p.category)
      );
    } else if (activeCategory === "Trending") {
      filtered = allProducts.filter((p) => p.totalSales > 500);
    } else {
      filtered = allProducts.filter((p) => p.category === activeCategory);
    }
    setDisplayedProducts(filtered.slice(0, 12));
  }, [activeCategory]);

  const offers = [
    {
      img: offer1,
      title: "Illustrious Deluxe",
      description: "Up to 20% Off",
      link: "/promotion",
    },
    {
      img: offer2,
      title: "Catsuit Noir",
      description: "Up to 20% Off",
      link: "/promotion",
    },
    {
      img: offer3,
      title: "Spring Paradise",
      description: "Up to 20% Off",
      link: "/promotion",
    },
  ];

  const categoryCards = [
    { name: "All", image: all },
    { name: "Men", image: me },
    { name: "Women", image: wo },
    { name: "Trending", image: trend },
  ];

  return (
    <div className="bg-zinc-50 text-black">
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden text-white">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
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
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
            Limited Time Offers
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
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

      <section className="bg-white py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Browse by Categories
          </h2>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {categoryCards.map((cat) => (
              <motion.div
                key={cat.name}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <button
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full p-4 sm:p-6 border flex flex-col items-center gap-4 transition-all duration-300 group ${
                    activeCategory === cat.name
                      ? "border-brand-gold border-2 shadow-lg"
                      : "border-gray-200 border-0 hover:shadow-md"
                  }`}
                >
                  <div
                    style={{
                      backgroundColor: "#FEB564",
                      maskImage: `url(${cat.image})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                  <span className="font-bold text-[#FEB564] font-display text-lg sm:text-xl">
                    {cat.name}
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* --- PRODUCT GRID PREVIEW WITH JUMPING BEHAVIOR FIXED --- */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
            layout
          >
            <AnimatePresence exitBeforeEnter>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectProduct={selectProduct}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center bg-black text-white font-bold py-3 px-8  hover:bg-gray-800 transition-colors text-lg"
            >
              View All Collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Promotion />
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
