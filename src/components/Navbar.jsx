import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Phone, ArrowLeft, Globe } from "lucide-react";
import { products as allProducts } from "../data/products.js";
import logo from "/src/assets/logo.png";
import { HashLink } from "react-router-hash-link";

// --- A small hook to detect window size ---
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

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(price);
};

// --- Framer Motion Variants for cleaner animations ---
const sidebarVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05 },
  },
};

const sidebarItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();

  // --- Search logic ---
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results.slice(0, 5));
  }, [searchTerm]);

  // --- Handlers ---
  const closeAllOverlays = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product.id}`);
    closeAllOverlays();
  };

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "EN" ? "LA" : "EN"));
  };

  const handleLinkClick = (path) => {
    if (location.pathname === path && !path.includes("#")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeAllOverlays();
  };

  // --- Link Arrays ---
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About Us", path: "/about" },
    { title: "News", path: "/news" },
  ];
  const sidebarPrimaryLinks = [...navLinks];
  const sidebarSecondaryLinks = [
    { title: "FAQ", path: "/faq" },
    { title: "Contact Us", path: "/#contact" },
    { title: "Return & Exchange", path: "/returns" },
  ];
  const sidebarLegalLinks = [
    { title: "Delivery", path: "/delivery" },
    { title: "Cookies Policy", path: "/cookies" },
    { title: "Terms & Conditions", path: "/terms" },
    { title: "Privacy Policy", path: "/privacy" },
  ];

  // --- Reusable LanguageSwitcher Component ---
  const LanguageSwitcher = ({ className }) => (
    <button
      onClick={toggleLanguage}
      className={`flex items-center font-semibold text-sm hover:text-brand-gold transition-colors ${className}`}
    >
      <Globe size={18} className="mr-1.5" />
      {language === "EN" ? "LA" : "EN"}
    </button>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1C1C1C] text-white font-sans border-b border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* --- Mobile View --- */}
            {width < 768 && (
              <div className="flex items-center justify-between w-full">
                <AnimatePresence mode="wait">
                  {!isSearchOpen ? (
                    // Default mobile header
                    <motion.div
                      key="nav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex-1 flex justify-start">
                        <NavLink to="/" onClick={() => handleLinkClick("/")}>
                          <img
                            src={logo}
                            alt="Laoperfume Logo"
                            className="h-10"
                          />
                        </NavLink>
                      </div>
                      <div className="flex-1 flex justify-end items-center space-x-4">
                        <button
                          onClick={() => setIsSearchOpen(true)}
                          aria-label="Search"
                        >
                          <Search size={24} />
                        </button>
                        <button
                          onClick={() => setIsMenuOpen(true)}
                          aria-label="Open menu"
                        >
                          <Menu size={28} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    // Mobile search view
                    <motion.div
                      key="search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center w-full gap-2"
                    >
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        aria-label="Close search"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-full py-2 px-4 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* --- Desktop View --- */}
            {width >= 768 && (
              <>
                <div className="flex flex-1 justify-start">
                  <NavLink to="/" onClick={() => handleLinkClick("/")}>
                    <img src={logo} alt="Laoperfume Logo" className="h-12" />
                  </NavLink>
                </div>
                <nav className="flex items-center space-x-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.title}
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className={({ isActive }) =>
                        `relative text-lg font-medium transition-colors duration-300 group ${
                          isActive
                            ? "text-brand-gold"
                            : "text-white hover:text-brand-gold"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.title}
                          <span
                            className={`absolute bottom-[-4px] left-0 h-[2px] bg-brand-gold transition-all duration-300 ease-out group-hover:w-full ${
                              isActive ? "w-full" : "w-0"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
                <div className="flex flex-1 justify-end items-center space-x-6">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search"
                    className="hover:text-brand-gold transition-colors"
                  >
                    <Search size={24} />
                  </button>
                  <LanguageSwitcher />
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2 text-brand-gold" />
                    <a
                      href="tel:+8562028987977"
                      className="text-lg font-medium hover:text-brand-gold transition-colors"
                    >
                      +8562028987977
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* --- Search Overlays & Mobile Results --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllOverlays}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          >
            {/* Desktop: Full Screen Search Modal */}
            {width >= 768 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="container mx-auto max-w-3xl p-6 mt-16"
                onClick={(e) => e.stopPropagation()}
              >
                <div className=" rounded-lg shadow-2xl p-6">
                  {/* Header with title and close button */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-brand-gold">
                      Search Products
                    </h2>
                    <button
                      onClick={closeAllOverlays}
                      className="p-1 text-white hover:text-brand-gold transition-colors"
                      aria-label="Close search"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="relative mt-8">
                    <input
                      type="text"
                      placeholder="Type a perfume name or brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent border-0 border-b-2 border-gray-600 text-white text-2xl focus:ring-0 focus:border-brand-gold py-3 transition-colors"
                      autoFocus
                    />
                    <Search
                      size={28}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    />{" "}
                  </div>
                  {/* Gold line separator */}
                  <div className="h-px bg-brand-gold mb-6"></div>
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-[#3A3A3A] rounded-lg p-4 max-h-96 overflow-y-auto"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Search Results
                      </h3>
                      <div className="space-y-3">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleResultClick(product)}
                            className="w-full group flex items-center gap-4 p-3 text-left hover:bg-white/5 rounded-md transition-colors"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="flex-grow">
                              <h3 className="font-semibold text-white group-hover:text-brand-gold transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-300">
                                {product.brand}
                              </p>
                            </div>
                            <p className="font-semibold text-sm text-brand-gold">
                              {formatPrice(product.price)}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {searchTerm && searchResults.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-gray-400"
                    >
                      <p>No products found for "{searchTerm}"</p>
                      <p className="text-sm mt-2">
                        Try different keywords or browse all products
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Mobile: Search Results List Below Header */}
            {width < 768 && searchResults.length > 0 && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="container mx-auto p-4 absolute top-20 left-0 right-0 bg-[#1C1C1C] rounded-b-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick(product)}
                    className="w-full group flex items-center gap-4 p-3 text-left hover:bg-white/5 rounded-md"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-sm text-white">
                        {product.name}
                      </h3>
                    </div>
                    <p className="font-semibold text-sm text-brand-gold">
                      {formatPrice(product.price)}
                    </p>
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Upgraded Mobile Menu Sidebar --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAllOverlays}
              className="fixed inset-0 bg-black/70 z-[60] md:hidden"
            />
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#1C1C1C] text-white p-6 z-[70] md:hidden flex flex-col"
            >
              {/* Sidebar Header */}
              <motion.div
                variants={sidebarItemVariants}
                className="flex justify-between items-center mb-10"
              >
                <NavLink to="/" onClick={closeAllOverlays}>
                  <img src={logo} alt="Laoperfume Logo" className="h-10" />
                </NavLink>
                <button onClick={closeAllOverlays} className="p-1">
                  <X size={28} />
                </button>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2 overflow-y-auto">
                {/* Main Links */}
                {sidebarPrimaryLinks.map((link) => (
                  <motion.div key={link.title} variants={sidebarItemVariants}>
                    <NavLink
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className={({ isActive }) =>
                        `block text-2xl font-display p-2 rounded-md transition-colors ${
                          isActive
                            ? "text-brand-gold bg-white/5"
                            : "text-white hover:text-brand-gold"
                        }`
                      }
                    >
                      {link.title}
                    </NavLink>
                  </motion.div>
                ))}

                <motion.hr
                  variants={sidebarItemVariants}
                  className="border-gray-700 my-4"
                />

                {/* Secondary Links */}
                {sidebarSecondaryLinks.map((link) => (
                  <motion.div key={link.title} variants={sidebarItemVariants}>
                    {link.path.startsWith("/#") ? (
                      <HashLink
                        smooth
                        to={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className="block text-lg p-2 rounded-md text-gray-300 hover:text-brand-gold transition-colors"
                      >
                        {link.title}
                      </HashLink>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className="block text-lg p-2 rounded-md text-gray-300 hover:text-brand-gold transition-colors"
                      >
                        {link.title}
                      </NavLink>
                    )}
                  </motion.div>
                ))}

                <motion.hr
                  variants={sidebarItemVariants}
                  className="border-gray-700 my-4"
                />

                {/* Legal Links */}
                {sidebarLegalLinks.map((link) => (
                  <motion.div key={link.title} variants={sidebarItemVariants}>
                    <NavLink
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className="block text-sm p-2 rounded-md text-gray-400 hover:text-brand-gold transition-colors"
                    >
                      {link.title}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <motion.div
                variants={sidebarItemVariants}
                className="mt-auto pt-6 border-t border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <LanguageSwitcher />
                  <a
                    href="tel:+8562028987977"
                    className="flex items-center text-sm font-medium hover:text-brand-gold transition-colors"
                  >
                    <Phone size={16} className="mr-2" />
                    +8562028987977
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
