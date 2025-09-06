import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Phone } from "lucide-react";
import logo from "/src/assets/logo.png"; // Make sure you have logo.png in src/assets/

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About Us", path: "/about" },
    { title: "News", path: "/news" },
  ];

  const sidebarLinks = [
    ...navLinks,
    { title: "FAQ", path: "/faq" },
    { title: "Contact Us", path: "/contact" },
    { title: "Return & Exchange", path: "/returns" },
    { title: "Delivery", path: "/delivery" },
    { title: "Cookies Policy", path: "/cookies" },
    { title: "Terms & Conditions", path: "/terms" },
    { title: "Privacy Policy", path: "/privacy" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- THE FIX IS HERE --- */}
          {/* The flexbox justification and visibility classes are corrected for mobile */}
          <div className="flex items-center justify-between h-20">
            {/* --- Mobile View --- */}
            <div className="md:hidden flex-1 flex justify-start">
              <button aria-label="Search">
                <Search size={24} />
              </button>
            </div>

            <div className="md:hidden flex-1 flex justify-center">
              <NavLink to="/">
                <img src={logo} alt="Laoperfume Logo" className="h-10" />
              </NavLink>
            </div>

            <div className="md:hidden flex-1 flex justify-end">
              <button onClick={toggleMenu} aria-label="Open menu">
                <Menu size={28} />
              </button>
            </div>

            {/* --- Desktop View --- */}
            <div className="hidden md:flex flex-1 justify-start">
              <NavLink to="/">
                <img src={logo} alt="Laoperfume Logo" className="h-12" />
              </NavLink>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-300 hover:text-brand-gold ${
                      isActive ? "text-brand-gold" : "text-white"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex flex-1 justify-end items-center">
              <Phone size={18} className="mr-2 text-brand-gold" />
              <a
                href="tel:+8562028987977"
                className="text-lg font-medium hover:text-brand-gold transition-colors"
              >
                +8562028987977
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/60 z-50 md:hidden"
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-black text-white p-6 z-50 md:hidden overflow-y-auto pb-10"
            >
              <div className="flex justify-between items-center mb-10">
                <NavLink to="/" onClick={toggleMenu}>
                  <img src={logo} alt="Laoperfume Logo" className="h-12" />
                </NavLink>
                <button onClick={toggleMenu} aria-label="Close menu">
                  <X size={28} />
                </button>
              </div>
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
                className="flex flex-col space-y-5"
              >
                {sidebarLinks.map((link) => (
                  <motion.div key={link.title} variants={linkVariants}>
                    <NavLink
                      to={link.path}
                      onClick={toggleMenu}
                      className="text-2xl font-display hover:text-brand-gold transition-colors"
                    >
                      {link.title}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
