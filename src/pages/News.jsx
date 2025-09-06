import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "The Art of Perfumery: A Deep Dive into Scent Creation",
    date: "September 05, 2025",
    excerpt:
      "Join us as we explore the intricate process of creating a signature scent, from sourcing rare ingredients to the final bottling.",
    image:
      "https://placehold.co/800x600/1a1a1a/ffffff/png?text=Behind+the+Scenes",
    category: "Inspiration",
  },
  {
    id: 2,
    title: "Laoperfume Awarded for Ethical Sourcing Practices",
    date: "August 22, 2025",
    excerpt:
      "We are proud to be recognized for our commitment to sustainability and ethical partnerships with growers around the world.",
    image: "https://placehold.co/800x600/f0e68c/000000/png?text=Award+Winner",
    category: "Company News",
  },
  {
    id: 3,
    title: 'Announcing Our New Winter Collection: "Ember & Frost"',
    date: "August 15, 2025",
    excerpt:
      "Get a sneak peek at our upcoming collection, featuring warm, spicy notes designed to capture the spirit of the winter season.",
    image: "https://placehold.co/800x600/333333/ffffff/png?text=New+Collection",
    category: "Products",
  },
  {
    id: 4,
    title: "How to Choose the Perfect Fragrance for Any Occasion",
    date: "July 30, 2025",
    excerpt:
      "A comprehensive guide to help you select a scent that complements your style, whether it's a professional meeting or a night out.",
    image:
      "https://placehold.co/800x600/daa520/000000/png?text=Fragrance+Guide",
    category: "Lifestyle",
  },
];

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="bg-zinc-50 text-black"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <div
        className="relative h-[50vh] bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x800/000000/FEB564/png?text=Journal')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold text-brand-gold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From the Laoperfume Journal
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mt-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Stories, inspiration, and news from the world of fragrance.
          </motion.p>
        </div>
      </div>

      {/* News Grid Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {newsArticles.map((article) => (
            <motion.div
              key={article.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="w-full h-56 bg-gray-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-brand-gold uppercase mb-2">
                  {article.category}
                </p>
                <h3 className="text-xl font-bold font-display mb-3 flex-grow">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{article.excerpt}</p>
                <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                  <p className="text-xs text-gray-500">{article.date}</p>
                  <a
                    href="#"
                    className="flex items-center font-bold text-sm text-black group-hover:text-brand-gold transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-display">Stay Updated</h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            Have questions or want to be the first to know about new arrivals?
            Contact us or subscribe to our newsletter.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-colors text-lg"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Us
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default News;
