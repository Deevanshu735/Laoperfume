// import React from "react";
// import { NavLink } from "react-router-dom";
// import { HashLink } from "react-router-hash-link"; // ✅ added
// import { Mail, Phone, MapPin } from "lucide-react";
// import logo from "../assets/logo.png";

// const Footer = () => {
//   const supportLinks = [
//     { title: "FAQ", path: "/faq" },
//     { title: "Contact Us", path: "/contact" }, // will scroll to Home's contact section
//     { title: "Return & Exchange", path: "/returns" },
//     { title: "Delivery", path: "/delivery" },
//   ];

//   const legalLinks = [
//     { title: "About Us", path: "/about" },
//     { title: "Cookies Policy", path: "/cookies" },
//     { title: "Terms & Conditions", path: "/terms" },
//     { title: "Privacy Policy", path: "/privacy" },
//   ];

//   return (
//     <footer className="bg-black text-gray-400 py-16 font-sans">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">
//           {/* Column 1: Brand Info */}
//           <div className="flex flex-col items-center md:items-start">
//             <img src={logo} alt="Laoperfume Logo" className="h-12 mb-4" />
//             <p className="text-sm max-w-xs">
//               Crafting unique and timeless fragrances that capture the essence
//               of elegance.
//             </p>
//           </div>

//           {/* Column 2: Support Links */}
//           <div>
//             <h4 className="text-white font-semibold tracking-wider uppercase mb-4">
//               Support
//             </h4>
//             <ul className="space-y-2 text-sm">
//               {supportLinks.map((link) => (
//                 <li key={link.title}>
//                   {link.path === "/contact" ? (
//                     <HashLink
//                       smooth
//                       to="/#contact"
//                       className="hover:text-brand-gold transition-colors duration-300"
//                     >
//                       {link.title}
//                     </HashLink>
//                   ) : (
//                     <NavLink
//                       to={link.path}
//                       className="hover:text-brand-gold transition-colors duration-300"
//                     >
//                       {link.title}
//                     </NavLink>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Legal Links */}
//           <div>
//             <h4 className="text-white font-semibold tracking-wider uppercase mb-4">
//               Legal
//             </h4>
//             <ul className="space-y-2 text-sm">
//               {legalLinks.map((link) => (
//                 <li key={link.title}>
//                   <NavLink
//                     to={link.path}
//                     className="hover:text-brand-gold transition-colors duration-300"
//                   >
//                     {link.title}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4: Contact Info */}
//           <div>
//             <h4 className="text-white font-semibold tracking-wider uppercase mb-4">
//               Contact Us
//             </h4>
//             <ul className="space-y-3 text-sm">
//               <li className="flex items-center justify-center md:justify-start">
//                 <MapPin className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
//                 <span>Sokpaluang Road, Vientiane, Laos</span>
//               </li>
//               <li className="flex items-center justify-center md:justify-start">
//                 <Mail className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
//                 <a
//                   href="mailto:admin@laoperfume.la"
//                   className="hover:text-brand-gold"
//                 >
//                   admin@laoperfume.la
//                 </a>
//               </li>
//               <li className="flex items-center justify-center md:justify-start">
//                 <Phone className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
//                 <a href="tel:+8562028987977" className="hover:text-brand-gold">
//                   +8562028987977
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar with Copyright */}
//         <div className="text-center text-xs mt-12 border-t border-gray-800 pt-8">
//           <p>© Lao Perfume Design by Connected IT Solutions 2025</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation
import { HashLink } from "react-router-hash-link";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const location = useLocation(); // Get the current location

  // --- THE FIX IS HERE: New handler for all footer link clicks ---
  const handleLinkClick = (path) => {
    // If the link is for the current page (and not a hash link), scroll to top.
    if (location.pathname === path && !path.includes("#")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Hash links are handled by HashLink, so no special logic needed here.
  };

  const supportLinks = [
    { title: "FAQ", path: "/faq" },
    { title: "Contact Us", path: "/#contact" },
    { title: "Return & Exchange", path: "/returns" },
    { title: "Delivery", path: "/delivery" },
  ];

  const legalLinks = [
    { title: "About Us", path: "/about" },
    { title: "Cookies Policy", path: "/cookies" },
    { title: "Terms & Conditions", path: "/terms" },
    { title: "Privacy Policy", path: "/privacy" },
  ];

  const FooterLink = ({ link }) => {
    const linkClasses =
      "hover:text-brand-gold transition-all duration-300 hover:-translate-y-px";

    return (
      <li>
        {link.path.startsWith("/#") ? (
          <HashLink smooth to={link.path} className={linkClasses}>
            {link.title}
          </HashLink>
        ) : (
          <NavLink
            to={link.path}
            className={linkClasses}
            onClick={() => handleLinkClick(link.path)}
          >
            {link.title}
          </NavLink>
        )}
      </li>
    );
  };

  return (
    <footer className="bg-[#1C1C1C] text-gray-300 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="Laoperfume Logo" className="h-12 mb-4" />
            <p className="text-sm max-w-xs leading-relaxed">
              Crafting unique and timeless fragrances that capture the essence
              of elegance.
            </p>
          </div>
          <div>
            <h4 className="font-display text-white text-xl mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <FooterLink key={link.title} link={link} />
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-white text-xl mb-5">Legal</h4>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link) => (
                <FooterLink key={link.title} link={link} />
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-white text-xl mb-5">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
                <span>Sokpaluang Road, Vientiane, Laos</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
                <a
                  href="mailto:admin@laoperfume.la"
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  admin@laoperfume.la
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
                <a
                  href="tel:+8562028987977"
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  +8562028987977
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-16 border-t border-gray-800/50 pt-8">
          <p>© Lao Perfume Design by Connected IT Solutions 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
