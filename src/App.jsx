// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import MainLayout from "./layouts/MainLayout.jsx";
// import Home from "./pages/Home.jsx";
// import Products from "./pages/Products.jsx";
// import ProductDetail from "./pages/ProductDetail.jsx";
// import Checkout from "./pages/Checkout.jsx";
// import AboutUs from "./pages/AboutUs.jsx";
// import News from "./pages/News.jsx";
// import Faq from "./pages/Faq.jsx";
// import Return from "./pages/Return.jsx";
// import Delivery from "./pages/Delivery.jsx";
// import Cookies from "./pages/Cookies.jsx";
// import Terms from "./pages/Terms.jsx";
// import Privacy from "./pages/Privacy.jsx";
// import ScrollToHash from "./components/ScrollToHash.jsx";

// function App() {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // This function sets the product that the user clicks on.
//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//   };

//   return (
//     <Router>
//       <ScrollToHash />
//       <AnimatePresence mode="wait">
//         <Routes>
//           <Route path="/" element={<MainLayout />}>
//             <Route
//               index
//               element={<Home selectProduct={handleProductSelect} />}
//             />
//             <Route
//               path="products"
//               element={<Products selectProduct={handleProductSelect} />}
//             />
//             <Route
//               path="product/:id"
//               element={<ProductDetail selectedProduct={selectedProduct} />}
//             />
//             <Route path="checkout" element={<Checkout />} />
//             <Route path="about" element={<AboutUs />} />
//             <Route path="news" element={<News />} />

//             {/* Routes for all informational pages */}
//             <Route path="faq" element={<Faq />} />
//             <Route path="returns" element={<Return />} />
//             <Route path="delivery" element={<Delivery />} />
//             <Route path="cookies" element={<Cookies />} />
//             <Route path="terms" element={<Terms />} />
//             <Route path="privacy" element={<Privacy />} />
//           </Route>
//         </Routes>
//       </AnimatePresence>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react"; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import AOS library and its styles
import AOS from "aos";
import "aos/dist/aos.css";

import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import News from "./pages/News.jsx";
import Faq from "./pages/Faq.jsx";
import Return from "./pages/Return.jsx";
import Delivery from "./pages/Delivery.jsx";
import Cookies from "./pages/Cookies.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // This initializes the AOS library when the app loads
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
      offset: 50, // Offset (in px) from the original trigger point
    });
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Router>
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={<Home selectProduct={handleProductSelect} />}
            />
            <Route
              path="products"
              element={<Products selectProduct={handleProductSelect} />}
            />
            <Route
              path="product/:id"
              element={<ProductDetail selectedProduct={selectedProduct} />}
            />
            <Route path="checkout" element={<Checkout />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="news" element={<News />} />
            <Route path="faq" element={<Faq />} />
            <Route path="returns" element={<Return />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
