// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// import { products as allProducts } from "../data/products.js";
// import ProductCard from "../components/ProductCard.jsx";
// import Promotion from "../pages/Promotion.jsx";
// import Contact from "../pages/Contact.jsx";

// import slider1 from "../assets/slider1.webp";
// import slider2 from "../assets/slider2.webp";
// import mobileslider1 from "../assets/mobileslider.jpg";
// import mobileslider2 from "../assets/mobileslider2.jpg";
// import offer1 from "../assets/offer1.webp";
// import offer2 from "../assets/offer2.webp";
// import offer3 from "../assets/offer3.webp";
// import all from "../assets/together.svg";
// import me from "../assets/manager.svg";
// import wo from "../assets/woman.svg";
// import trend from "../assets/trending.svg";

// const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState({ width: undefined });
//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({ width: window.innerWidth });
//     }
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return windowSize;
// };

// const OfferCard = ({ offer }) => (
//   <Link to={offer.link}>
//     <div className="group block overflow-hidden bg-white shadow-sm border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
//       <div className="overflow-hidden">
//         <img
//           src={offer.img}
//           alt={offer.title}
//           className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>
//       <div className="p-6 text-center">
//         <h3 className="text-2xl font-bold font-display text-gray-900">
//           {offer.title}
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
//       </div>
//     </div>
//   </Link>
// );

// const Home = ({ selectProduct }) => {
//   const { width } = useWindowSize();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [currentOffer, setCurrentOffer] = useState(0);

//   const sliderImages =
//     width < 768 ? [mobileslider1, mobileslider2] : [slider1, slider2];

//   // Autoplay for Hero Slider
//   useEffect(() => {
//     const heroTimer = setTimeout(() => {
//       setCurrentImageIndex(
//         (prevIndex) => (prevIndex + 1) % sliderImages.length
//       );
//     }, 5000);
//     return () => clearTimeout(heroTimer);
//   }, [currentImageIndex, sliderImages.length]);

//   const offers = [
//     {
//       img: offer1,
//       title: "Illustrious Deluxe",
//       description: "Up to 20% Off",
//       link: "/products",
//     },
//     {
//       img: offer2,
//       title: "Catsuit Noir",
//       description: "Up to 20% Off",
//       link: "/products",
//     },
//     {
//       img: offer3,
//       title: "Spring Paradise",
//       description: "Up to 20% Off",
//       link: "/products",
//     },
//   ];

//   // Continuous Autoplay for Offer Carousel
//   useEffect(() => {
//     const offerTimer = setInterval(() => {
//       setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
//     }, 3000); // Change slide every 3 seconds
//     return () => clearInterval(offerTimer); // Cleanup on component unmount
//   }, [offers.length]);

//   useEffect(() => {
//     let filtered;
//     if (activeCategory === "All") {
//       filtered = allProducts.filter((p) =>
//         ["Men", "Women", "Unisex"].includes(p.category)
//       );
//     } else if (activeCategory === "Trending") {
//       filtered = allProducts.filter((p) => p.totalSales > 500);
//     } else {
//       filtered = allProducts.filter((p) => p.category === activeCategory);
//     }
//     setDisplayedProducts(filtered.slice(0, 12));
//   }, [activeCategory]);

//   const categoryCards = [
//     { name: "All", image: all },
//     { name: "Men", image: me },
//     { name: "Women", image: wo },
//     { name: "Trending", image: trend },
//   ];

//   return (
//     <div className="bg-gray-50 text-gray-900 font-sans">
//       <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden text-white">
//         <AnimatePresence>
//           <motion.div
//             key={currentImageIndex}
//             className="absolute inset-0 bg-cover bg-top md:bg-center"
//             style={{
//               backgroundImage: `url(${sliderImages[currentImageIndex]})`,
//             }}
//             initial={{ opacity: 0, scale: 1.05 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//           />
//         </AnimatePresence>
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//           <motion.h1
//             className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//           >
//             Discover Your Signature Scent
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//           >
//             A curated collection of the world's finest fragrances.
//           </motion.p>
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//           >
//             <Link
//               to="/products"
//               className="inline-block bg-brand-gold text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-all text-lg transform hover:scale-105"
//             >
//               Shop Now
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-10 sm:py-18">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
//             Limited Time Offers
//           </h2>
//         </div>

//         {width < 768 ? (
//           <div className="relative w-full overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentOffer}
//                 initial={{ x: "100%", opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: "-100%", opacity: 0 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 className="w-full" // Padding removed for full-width feel
//               >
//                 <OfferCard offer={offers[currentOffer]} />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         ) : (
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-8"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//               variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//             >
//               {offers.map((offer, index) => (
//                 <motion.div
//                   key={index}
//                   variants={{
//                     hidden: { y: 20, opacity: 0 },
//                     visible: { y: 0, opacity: 1 },
//                   }}
//                 >
//                   <OfferCard offer={offer} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         )}
//       </section>

//       <section className="py-20 sm:py-28">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
//             Browse by Categories
//           </h2>
//           <motion.div
//             className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-16"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//           >
//             {categoryCards.map((cat) => (
//               <motion.div
//                 key={cat.name}
//                 variants={{
//                   hidden: { y: 20, opacity: 0 },
//                   visible: { y: 0, opacity: 1 },
//                 }}
//               >
//                 <button
//                   onClick={() => setActiveCategory(cat.name)}
//                   className={`w-full flex flex-col items-center justify-center p-4 sm:p-6 gap-4 transition-all duration-300 group`}
//                 >
//                   <div
//                     className={`relative h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center rounded-full transition-all duration-300 ${
//                       activeCategory === cat.name
//                         ? "bg-brand-gold shadow-lg"
//                         : "bg-gray-200 group-hover:bg-gray-300"
//                     }`}
//                   >
//                     <div
//                       style={{
//                         maskImage: `url(${cat.image})`,
//                         WebkitMaskImage: `url(${cat.image})`,
//                         maskSize: "contain",
//                         maskRepeat: "no-repeat",
//                         maskPosition: "center",
//                       }}
//                       className={`h-12 w-12 sm:h-16 sm:w-16 transition-all duration-300 ${
//                         activeCategory === cat.name ? "bg-black" : "bg-gray-600"
//                       }`}
//                     />
//                   </div>
//                   <span
//                     className={`font-bold font-display text-lg sm:text-xl transition-colors duration-300 ${
//                       activeCategory === cat.name
//                         ? "text-brand-gold"
//                         : "text-gray-700 group-hover:text-black"
//                     }`}
//                   >
//                     {cat.name}
//                   </span>
//                 </button>
//               </motion.div>
//             ))}
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
//             layout
//           >
//             <AnimatePresence mode="sync">
//               {displayedProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   selectProduct={selectProduct}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3 }}
//                   layout
//                 />
//               ))}
//             </AnimatePresence>
//           </motion.div>
//           <div className="text-center mt-16">
//             <Link
//               to="/products"
//               className="group inline-flex items-center bg-gray-900 text-white font-bold py-3 px-8 hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
//             >
//               View All Collection
//               <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Promotion />
//       <section id="contact">
//         <Contact />
//       </section>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, Check } from "lucide-react";

// import { products as allProducts } from "../data/products.js";
// import ProductCard from "../components/ProductCard.jsx";
// import Promotion from "../pages/Promotion.jsx";
// import Contact from "../pages/Contact.jsx";

// import slider1 from "../assets/slider1.webp";
// import slider2 from "../assets/slider2.webp";
// import mobileslider1 from "../assets/mobileslider.jpg";
// import mobileslider2 from "../assets/mobileslider2.jpg";
// import offer1 from "../assets/offer1.webp";
// import offer2 from "../assets/offer2.webp";
// import offer3 from "../assets/offer3.webp";
// import all from "../assets/together.svg";
// import me from "../assets/manager.svg";
// import wo from "../assets/woman.svg";
// import trend from "../assets/trending.svg";

// const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState({ width: undefined });
//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({ width: window.innerWidth });
//     }
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return windowSize;
// };

// const OfferCard = ({ offer }) => (
//   <Link to={offer.link}>
//     <div className="group block overflow-hidden bg-white shadow-sm border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
//       <div className="overflow-hidden">
//         <img
//           src={offer.img}
//           alt={offer.title}
//           className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>
//       <div className="p-6 text-center">
//         <h3 className="text-2xl font-bold font-display text-gray-900">
//           {offer.title}
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
//       </div>
//     </div>
//   </Link>
// );

// const Home = () => {
//   const { width } = useWindowSize();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [activeBrand, setActiveBrand] = useState("All");
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [currentOffer, setCurrentOffer] = useState(0);

//   const sliderImages =
//     width < 768 ? [mobileslider1, mobileslider2] : [slider1, slider2];

//   useEffect(() => {
//     const heroTimer = setTimeout(() => {
//       setCurrentImageIndex(
//         (prevIndex) => (prevIndex + 1) % sliderImages.length
//       );
//     }, 5000);
//     return () => clearTimeout(heroTimer);
//   }, [currentImageIndex, sliderImages.length]);

//   const offers = [
//     {
//       img: offer1,
//       title: "Illustrious Deluxe",
//       description: "Up to 20% Off",
//       link: "/products",
//     },
//     {
//       img: offer2,
//       title: "Catsuit Noir",
//       description: "Up to 20% Off",
//       link: "/products",
//     },
//     {
//       img: offer3,
//       title: "Spring Paradise",
//       description: "Up to 20% Off",
//       link: "/products",
//     },
//   ];

//   useEffect(() => {
//     const offerTimer = setInterval(() => {
//       setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
//     }, 3000);
//     return () => clearInterval(offerTimer);
//   }, [offers.length]);

//   useEffect(() => {
//     let result = allProducts;
//     if (activeCategory === "Trending") {
//       result = result.filter((p) => p.totalSales > 500);
//     } else if (activeCategory === "All") {
//       result = result.filter((p) =>
//         ["Men", "Women", "Unisex"].includes(p.category)
//       );
//     } else {
//       result = result.filter((p) => p.category === activeCategory);
//     }
//     if (activeBrand !== "All") {
//       result = result.filter((p) => p.brand === activeBrand);
//     }
//     setDisplayedProducts(result.slice(0, 12));
//   }, [activeCategory, activeBrand]);

//   const categoryCards = [
//     { name: "All", image: all },
//     { name: "Men", image: me },
//     { name: "Women", image: wo },
//     { name: "Trending", image: trend },
//   ];

//   const brandFilters = ["Creation Lamis", "Dorall Collection"];

//   const handleBrandClick = (brand) => {
//     setActiveBrand(activeBrand === brand ? "All" : brand);
//   };

//   return (
//     <div className="bg-gray-50 text-gray-900 font-sans">
//       <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden text-white">
//         <AnimatePresence>
//           <motion.div
//             key={currentImageIndex}
//             className="absolute inset-0 bg-cover bg-top md:bg-center"
//             style={{
//               backgroundImage: `url(${sliderImages[currentImageIndex]})`,
//             }}
//             initial={{ opacity: 0, scale: 1.05 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//           />
//         </AnimatePresence>
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//           <motion.h1
//             className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//           >
//             Discover Your Signature Scent
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//           >
//             A curated collection of the world's finest fragrances.
//           </motion.p>
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//           >
//             <Link
//               to="/products"
//               className="inline-block bg-brand-gold text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-all text-lg transform hover:scale-105"
//             >
//               Shop Now
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-20 sm:py-28">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
//             Limited Time Offers
//           </h2>
//         </div>
//         {width < 768 ? (
//           <div className="relative w-full overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentOffer}
//                 initial={{ x: "100%", opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: "-100%", opacity: 0 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 className="w-full sm:px-4"
//               >
//                 <OfferCard offer={offers[currentOffer]} />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         ) : (
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-8"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//               variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//             >
//               {offers.map((offer, index) => (
//                 <motion.div
//                   key={index}
//                   variants={{
//                     hidden: { y: 20, opacity: 0 },
//                     visible: { y: 0, opacity: 1 },
//                   }}
//                 >
//                   <OfferCard offer={offer} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         )}
//       </section>

//       <section className="py-10 sm:py-16">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
//             Browse Our Collection
//           </h2>

//           <motion.div
//             className="grid grid-cols-4 gap-2 sm:gap-6 mb-12"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//           >
//             {categoryCards.map((cat) => (
//               <motion.div
//                 key={cat.name}
//                 variants={{
//                   hidden: { y: 20, opacity: 0 },
//                   visible: { y: 0, opacity: 1 },
//                 }}
//               >
//                 <button
//                   onClick={() => setActiveCategory(cat.name)}
//                   className={`w-full flex flex-col items-center justify-center p-2 sm:p-4 gap-2 sm:gap-3 transition-all duration-300 group`}
//                 >
//                   <div
//                     className={`relative h-16 w-16 sm:h-24 md:h-32 sm:w-24 md:w-32 flex items-center justify-center rounded-full transition-all duration-300 ${
//                       activeCategory === cat.name
//                         ? "bg-brand-gold shadow-lg"
//                         : "bg-gray-200 group-hover:bg-gray-300"
//                     }`}
//                   >
//                     <div
//                       style={{
//                         maskImage: `url(${cat.image})`,
//                         WebkitMaskImage: `url(${cat.image})`,
//                         maskSize: "contain",
//                         maskRepeat: "no-repeat",
//                         maskPosition: "center",
//                       }}
//                       className={`h-8 w-8 sm:h-10 md:h-16 sm:w-10 md:w-16 transition-all duration-300 ${
//                         activeCategory === cat.name ? "bg-black" : "bg-gray-600"
//                       }`}
//                     />
//                   </div>
//                   <span
//                     className={`font-bold font-display text-sm sm:text-lg md:text-xl transition-colors duration-300 ${
//                       activeCategory === cat.name
//                         ? "text-brand-gold"
//                         : "text-gray-700 group-hover:text-black"
//                     }`}
//                   >
//                     {cat.name}
//                   </span>
//                 </button>
//               </motion.div>
//             ))}
//           </motion.div>

//           <motion.div
//             className="flex sm:hidden justify-center items-center gap-2 sm:gap-4 mb-16 p-1 bg-gray-200 rounded-full"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//           >
//             {brandFilters.map((brand) => (
//               <motion.button
//                 key={brand}
//                 onClick={() => handleBrandClick(brand)}
//                 variants={{
//                   hidden: { y: 20, opacity: 0 },
//                   visible: { y: 0, opacity: 1 },
//                 }}
//                 className={`relative w-full px-3 py-2 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base focus:outline-none ${
//                   activeBrand === brand
//                     ? "text-black"
//                     : "text-gray-600 hover:text-black"
//                 }`}
//               >
//                 {activeBrand === brand && (
//                   <motion.div
//                     layoutId="brand-highlighter"
//                     className="absolute inset-0 bg-brand-gold rounded-full"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//                 <span className="relative z-10">{brand}</span>
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* --- THE FIX IS HERE: Smoother animation on the product grid --- */}
//           <motion.div
//             className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
//             layout
//           >
//             <AnimatePresence>
//               {displayedProducts.map((product) => (
//                 <motion.div
//                   key={`${product.id}-${activeBrand}-${activeCategory}`} // A more unique key to ensure re-animation
//                   layout
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.4, ease: "easeInOut" }}
//                 >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>

//           <div className="text-center mt-16">
//             <Link
//               to="/products"
//               className="group inline-flex items-center bg-gray-900 text-white font-bold py-3 px-8 hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
//             >
//               View All Collection{" "}
//               <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Promotion />
//       <section id="contact">
//         <Contact />
//       </section>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { products as allProducts } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Promotion from "../pages/Promotion.jsx";
import Contact from "../pages/Contact.jsx";

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

const OfferCard = ({ offer }) => (
  <Link to={offer.link}>
    <div className="group block overflow-hidden bg-white shadow-sm border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
      <div className="overflow-hidden">
        <img
          src={offer.img}
          alt={offer.title}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold font-display text-gray-900">
          {offer.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
      </div>
    </div>
  </Link>
);

const Home = () => {
  const { width } = useWindowSize();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(0);

  const sliderImages =
    width < 768 ? [mobileslider1, mobileslider2] : [slider1, slider2];

  useEffect(() => {
    const heroTimer = setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length
      );
    }, 5000);
    return () => clearTimeout(heroTimer);
  }, [currentImageIndex, sliderImages.length]);

  const offers = [
    {
      img: offer1,
      title: "Illustrious Deluxe",
      description: "Up to 20% Off",
      link: "/products",
    },
    {
      img: offer2,
      title: "Catsuit Noir",
      description: "Up to 20% Off",
      link: "/products",
    },
    {
      img: offer3,
      title: "Spring Paradise",
      description: "Up to 20% Off",
      link: "/products",
    },
  ];

  useEffect(() => {
    const offerTimer = setInterval(() => {
      setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(offerTimer);
  }, [offers.length]);

  useEffect(() => {
    let result = allProducts;
    if (activeCategory === "Trending") {
      result = result.filter((p) => p.totalSales > 500);
    } else if (activeCategory === "All") {
      result = result.filter((p) =>
        ["Men", "Women", "Unisex"].includes(p.category)
      );
    } else {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeBrand !== "All") {
      result = result.filter((p) => p.brand === activeBrand);
    }
    setDisplayedProducts(result.slice(0, 12));
  }, [activeCategory, activeBrand]);

  const categoryCards = [
    { name: "All", image: all },
    { name: "Men", image: me },
    { name: "Women", image: wo },
    { name: "Trending", image: trend },
  ];

  const brandFilters = ["Creation Lamis", "Dorall Collection"];

  const handleBrandClick = (brand) => {
    setActiveBrand(activeBrand === brand ? "All" : brand);
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
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
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover Your Signature Scent
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            A curated collection of the world's finest fragrances.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              to="/products"
              className="inline-block bg-brand-gold text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-all text-lg transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Limited Time Offers
          </h2>
        </div>
        {width < 768 ? (
          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOffer}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full sm:px-4"
              >
                <OfferCard offer={offers[currentOffer]} />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  <OfferCard offer={offer} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>

      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Browse Our Collection
          </h2>
          <motion.div
            className="grid grid-cols-4 gap-2 sm:gap-6 mb-12"
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
                  className={`w-full flex flex-col items-center justify-center p-2 sm:p-4 gap-2 sm:gap-3 transition-all duration-300 group`}
                >
                  <div
                    className={`relative h-16 w-16 sm:h-24 md:h-32 sm:w-24 md:w-32 flex items-center justify-center rounded-full transition-all duration-300 ${
                      activeCategory === cat.name
                        ? "bg-brand-gold shadow-lg"
                        : "bg-gray-200 group-hover:bg-gray-300"
                    }`}
                  >
                    <div
                      style={{
                        maskImage: `url(${cat.image})`,
                        WebkitMaskImage: `url(${cat.image})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                      className={`h-8 w-8 sm:h-10 md:h-16 sm:w-10 md:w-16 transition-all duration-300 ${
                        activeCategory === cat.name ? "bg-black" : "bg-gray-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-bold font-display text-sm sm:text-lg md:text-xl transition-colors duration-300 ${
                      activeCategory === cat.name
                        ? "text-brand-gold"
                        : "text-gray-700 group-hover:text-black"
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex sm:hidden justify-center items-center gap-2 sm:gap-4 mb-16 p-1 bg-gray-200 rounded-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {brandFilters.map((brand) => (
              <motion.button
                key={brand}
                onClick={() => handleBrandClick(brand)}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className={`relative w-full px-3 py-2 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base focus:outline-none ${
                  activeBrand === brand
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {activeBrand === brand && (
                  <motion.div
                    layoutId="brand-highlighter"
                    className="absolute inset-0 bg-brand-gold rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{brand}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
            layout
          >
            <AnimatePresence>
              {displayedProducts.map((product) => (
                <motion.div
                  key={`${product.id}-${activeBrand}-${activeCategory}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="group inline-flex items-center bg-gray-900 text-white font-bold py-3 px-8 hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
            >
              View All Collection{" "}
              <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
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
