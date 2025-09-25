import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products as allProducts } from "../data/products.js";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(price);
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const relatedProductsRef = React.useRef(null);

  useEffect(() => {
    // Reset state when product ID changes
    setLoading(true);
    setQuantity(1);

    // Find the current product
    const currentProduct = allProducts.find((p) => p.id === parseInt(id));

    if (currentProduct) {
      setProduct(currentProduct);

      // Calculate related products
      let related = allProducts.filter(
        (p) =>
          p.category === currentProduct.category && p.id !== currentProduct.id
      );

      if (related.length < 4) {
        const trendingProducts = allProducts.filter(
          (p) =>
            p.totalSales > 500 &&
            p.id !== currentProduct.id &&
            !related.some((rp) => rp.id === p.id)
        );
        related = [...related, ...trendingProducts];
      }

      const shuffledRelated = shuffleArray(related).slice(0, 8);
      setRelatedProducts(shuffledRelated);
    } else {
      setProduct(null);
    }

    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const scrollRelatedProducts = (direction) => {
    if (relatedProductsRef.current) {
      const container = relatedProductsRef.current;
      const scrollAmount = 300; // Adjust this value as needed
      const newPosition =
        direction === "right"
          ? scrollPosition + scrollAmount
          : scrollPosition - scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse text-xl">Loading Product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-brand-gold hover:underline">
          Return to Products
        </Link>
      </div>
    );
  }

  const totalPrice = product.price * quantity;
  const salePercentage =
    product.onSale && product.oldPrice
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <motion.div
      className="bg-gray-50 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:sticky top-28"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-full aspect-square bg-white rounded-lg overflow-hidden shadow-sm relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.onSale && (
                <div className="absolute top-4 left-4 bg-brand-gold text-black text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center shadow-md">
                  <Tag size={14} className="mr-1.5" />
                  SAVE {salePercentage}%
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {product.brand}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold font-display my-2 text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < product.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed text-base">
              <div>
                <h2 className="font-bold text-gray-800 mb-2 font-display text-lg">
                  The Scent Story
                </h2>
                <p>
                  This exquisite fragrance combines top notes of bergamot and
                  lemon with a heart of lavender and jasmine, resting on a base
                  of cedarwood and amber. Perfect for both daytime elegance and
                  evening sophistication.
                </p>
              </div>
              <div>
                <h2 className="font-bold text-gray-800 mb-2 font-display text-lg">
                  Scent Notes
                </h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <span className="font-semibold">Top:</span> Bergamot, Lemon,
                    Black Pepper
                  </li>
                  <li>
                    <span className="font-semibold">Middle:</span> Lavender,
                    Geranium, Jasmine
                  </li>
                  <li>
                    <span className="font-semibold">Base:</span> Cedarwood,
                    Vetiver, Amber
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-8 border-t border-gray-200"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
              <div className="flex items-center">
                <p className="font-semibold text-gray-800 mr-4">Quantity:</p>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="text-left sm:text-right">
                {product.onSale && (
                  <p className="text-base text-gray-400 line-through">
                    {formatPrice(product.oldPrice * quantity)}
                  </p>
                )}
                <p className="text-3xl font-bold text-brand-gold">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>
            <Link
              to={`/checkout`}
              state={{ product, quantity, totalPrice }}
              className="group w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-md hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
              onClick={() => {
                console.log("Adding to cart:", product, quantity);
              }}
            >
              <ShoppingCart className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
              Buy Now
            </Link>
          </motion.div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-24 border-t border-gray-200 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              You May Also Like
            </h2>

            {/* Navigation buttons */}
            <div className="flex justify-end mb-4 space-x-2">
              {/* <button
                onClick={() => scrollRelatedProducts("left")}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollRelatedProducts("right")}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button> */}
            </div>

            {/* Horizontal scroll container */}
            <div
              ref={relatedProductsRef}
              className="flex overflow-x-auto pb-6 hide-scrollbar space-x-4 sm:space-x-6"
              style={{ scrollBehavior: "smooth" }}
            >
              {relatedProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-64 md:w-72" // Fixed width for consistent sizing
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default ProductDetail;
