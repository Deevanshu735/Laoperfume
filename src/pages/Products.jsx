// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { products as allProducts } from "/src/data/products.js";
// import ProductCard from "/src/components/ProductCard.jsx";
// import { SlidersHorizontal, X } from "lucide-react";

// const Products = ({ selectProduct }) => {
//   const [filteredProducts, setFilteredProducts] = useState(allProducts);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [activeBrands, setActiveBrands] = useState([]);
//   const [price, setPrice] = useState(600000);
//   const [sortBy, setSortBy] = useState("newest");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const categories = ["All", "Men", "Women", "Trending"];
//   const brands = useMemo(
//     () => [...new Set(allProducts.map((p) => p.brand))],
//     []
//   );

//   useEffect(() => {
//     let result = allProducts;

//     if (activeCategory === "Trending") {
//       result = result.filter((p) => p.totalSales > 500);
//     } else if (activeCategory === "All") {
//       result = result.filter((p) =>
//         ["Men", "Women", "Unisex"].includes(p.category)
//       );
//     } else if (activeCategory !== "All") {
//       result = result.filter((p) => p.category === activeCategory);
//     }

//     if (activeBrands.length > 0) {
//       result = result.filter((p) => activeBrands.includes(p.brand));
//     }

//     result = result.filter((p) => p.price <= price);

//     const sortedResult = [...result];
//     switch (sortBy) {
//       case "price-asc":
//         sortedResult.sort((a, b) => a.price - b.price);
//         break;
//       case "price-desc":
//         sortedResult.sort((a, b) => b.price - a.price);
//         break;
//       case "top-rated":
//         sortedResult.sort((a, b) => b.rating - a.rating);
//         break;
//       case "newest":
//       default:
//         sortedResult.sort((a, b) => b.id - a.id);
//         break;
//     }

//     setFilteredProducts(sortedResult);
//   }, [activeCategory, activeBrands, price, sortBy]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleBrandToggle = (brand) => {
//     setActiveBrands((prev) =>
//       prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
//     );
//   };

//   const FilterControls = () => (
//     <aside className="space-y-8">
//       <div>
//         <h3 className="font-bold text-lg mb-4">Sort By</h3>
//         <div className="space-y-2">
//           {["newest", "price-asc", "price-desc", "top-rated"].map((option) => (
//             <div key={option} className="flex items-center">
//               <input
//                 type="radio"
//                 id={option}
//                 name="sort"
//                 value={option}
//                 checked={sortBy === option}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="h-4 w-4 text-brand-gold focus:ring-brand-gold border-gray-300"
//               />
//               <label
//                 htmlFor={option}
//                 className="ml-3 text-sm text-gray-600 capitalize"
//               >
//                 {option.replace("-", " ")}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h3 className="font-bold text-lg mb-4">Price</h3>
//         <input
//           type="range"
//           min="0"
//           max="600000"
//           step="10000"
//           value={price}
//           onChange={(e) => setPrice(Number(e.target.value))}
//           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
//         />
//         <div className="text-center text-gray-600 mt-2">
//           Up to ₭{price.toLocaleString()}
//         </div>
//       </div>
//       <div>
//         <h3 className="font-bold text-lg mb-4">Brand</h3>
//         <div className="space-y-2">
//           {brands.map((brand) => (
//             <div key={brand} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={brand}
//                 checked={activeBrands.includes(brand)}
//                 onChange={() => handleBrandToggle(brand)}
//                 className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
//               />
//               <label htmlFor={brand} className="ml-3 text-sm text-gray-600">
//                 {brand}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );

//   return (
//     <div className="bg-white">
//       <div className="bg-zinc-50 py-12 text-center px-4 border-b">
//         <h1 className="text-4xl md:text-5xl font-bold font-display">
//           Explore All Products
//         </h1>
//         <p className="text-gray-600 mt-2">
//           {filteredProducts.length} Products Found
//         </p>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="lg:hidden mb-6 flex justify-between items-center">
//           <div className="flex justify-center flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
//                   activeCategory === cat ? "bg-black text-white" : "bg-gray-100"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
//           >
//             <SlidersHorizontal size={20} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           <div className="hidden lg:block lg:sticky top-24 h-fit">
//             <FilterControls />
//           </div>

//           <div className="lg:col-span-3">
//             <div className="hidden lg:flex justify-center flex-wrap gap-3 sm:gap-4 mb-12">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-5 py-2 rounded-md font-semibold ${
//                     activeCategory === cat
//                       ? "bg-black text-white"
//                       : "bg-zinc-100"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* --- PRODUCTS GRID WITH ANIMATION FIX --- */}
//             <motion.div
//               className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-8"
//               layout
//             >
//               <AnimatePresence exitBeforeEnter>
//                 {filteredProducts.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     selectProduct={selectProduct}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                     layout
//                   />
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-20 col-span-full">
//                 <h3 className="text-2xl font-bold">No Products Found</h3>
//                 <p className="text-gray-500 mt-2">
//                   Try adjusting your filters to find what you're looking for.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsSidebarOpen(false)}
//               className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             />
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 p-6 overflow-y-auto"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Filters</h2>
//                 <button onClick={() => setIsSidebarOpen(false)}>
//                   <X />
//                 </button>
//               </div>
//               <FilterControls />
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Products;

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products as allProducts } from "/src/data/products.js";
import ProductCard from "/src/components/ProductCard.jsx";
import { SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrands, setActiveBrands] = useState([]);
  const [price, setPrice] = useState(600000);
  const [sortBy, setSortBy] = useState("newest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ["All", "Men", "Women", "Trending"];
  const brands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand))],
    []
  );

  useEffect(() => {
    let result = allProducts;
    if (activeCategory === "Trending")
      result = result.filter((p) => p.totalSales > 500);
    else if (activeCategory === "All")
      result = result.filter((p) =>
        ["Men", "Women", "Unisex"].includes(p.category)
      );
    else if (activeCategory !== "All")
      result = result.filter((p) => p.category === activeCategory);
    if (activeBrands.length > 0)
      result = result.filter((p) => activeBrands.includes(p.brand));
    result = result.filter((p) => p.price <= price);
    const sortedResult = [...result];
    switch (sortBy) {
      case "price-asc":
        sortedResult.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedResult.sort((a, b) => b.price - a.price);
        break;
      case "top-rated":
        sortedResult.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        sortedResult.sort((a, b) => b.id - a.id);
        break;
    }
    setFilteredProducts(sortedResult);
  }, [activeCategory, activeBrands, price, sortBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBrandToggle = (brand) => {
    setActiveBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const FilterControls = () => (
    <aside className="space-y-4">
      <div>
        <h3 className="font-display font-bold text-xl mb-4 text-gray-800 border-b pb-2">
          Sort By
        </h3>
        <div className="space-y-3">
          {["newest", "price-asc", "price-desc", "top-rated"].map((option) => (
            <label
              key={option}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                value={option}
                checked={sortBy === option}
                onChange={(e) => setSortBy(e.target.value)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center transition-colors group-hover:border-brand-gold peer-checked:border-brand-gold">
                <div className="w-2.5 h-2.5 bg-brand-gold rounded-full transform scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="ml-3 text-sm text-gray-600 capitalize group-hover:text-black">
                {option.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display font-bold text-xl mb-4 text-gray-800 border-b pb-2">
          Price
        </h3>
        <input
          type="range"
          min="0"
          max="600000"
          step="10000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer custom-range"
        />
        <div className="text-center text-gray-600 mt-2">
          Up to ₭{price.toLocaleString()}
        </div>
      </div>
      <div>
        <h3 className="font-display font-bold text-xl mb-4 text-gray-800 border-b pb-2">
          Brand
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={activeBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-brand-gold peer-checked:border-brand-gold peer-checked:bg-brand-gold">
                <svg
                  className="w-3 h-3 text-white transform scale-0 peer-checked:scale-100 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-3 text-sm text-gray-600 group-hover:text-black">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="bg-gray-50">
      <div className="bg-white py-12 text-center px-4 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
          Explore All Products
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredProducts.length} Products Found
        </p>
      </div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-12">
        <div className="lg:hidden mb-6 flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-full text-gray-700"
          >
            <SlidersHorizontal size={20} />
          </button>
          <div className="flex-grow overflow-x-auto whitespace-nowrap hide-scrollbar">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 flex-shrink-0 ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:items-start gap-8">
          <div className="hidden lg:block lg:sticky top-28">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <FilterControls />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="hidden lg:flex justify-center flex-wrap gap-3 sm:gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-8"
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 col-span-full">
                <h3 className="text-2xl font-bold font-display">
                  No Products Found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-display">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X />
                </button>
              </div>
              <FilterControls />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
