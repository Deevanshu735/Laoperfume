import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import heroImage from "../assets/hn1.jpeg";
import news1 from "../assets/n1.jpeg";
import news2 from "../assets/n21.jpeg";
import news3 from "../assets/n31.jpeg";
import news4 from "../assets/n41.jpeg";

const newsArticles = [
  {
    id: 1,
    title: "The Art of Perfumery: A Deep Dive into Scent Creation",
    date: "September 05, 2025",
    excerpt:
      "Join us as we explore the intricate process of creating a signature scent, from sourcing rare ingredients to the final bottling.",
    image: news1,
    category: "Inspiration",
  },
  {
    id: 2,
    title: "Laoperfume Awarded for Ethical Sourcing Practices",
    date: "August 22, 2025",
    excerpt:
      "We are proud to be recognized for our commitment to sustainability and ethical partnerships with growers around the world.",
    image: news2,
    category: "Company News",
  },
  {
    id: 3,
    title: 'Announcing Our New Winter Collection: "Ember & Frost"',
    date: "August 15, 2025",
    excerpt:
      "Get a sneak peek at our upcoming collection, featuring warm, spicy notes designed to capture the spirit of the winter season.",
    image: news3,
    category: "Products",
  },
  {
    id: 4,
    title: "How to Choose the Perfect Fragrance for Any Occasion",
    date: "July 30, 2025",
    excerpt:
      "A comprehensive guide to help you select a scent that complements your style, whether for a professional meeting or a night out.",
    image: news4,
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
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const [latestArticle, ...otherArticles] = newsArticles;

  return (
    <motion.div
      className="bg-gray-50 text-gray-800 font-sans"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* --- 1. Sophisticated Hero Section --- */}
      <div
        className="relative h-[50vh] bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold text-white"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From the <span className="text-brand-gold">Laoperfume</span> Journal
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mt-4 text-gray-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Stories, inspiration, and news from the world of fragrance.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* --- 2. Dynamic "Featured Article" Layout --- */}
          <motion.div variants={itemVariants} className="mb-16">
            <a
              href="#"
              className="group block md:grid md:grid-cols-2 md:gap-10 items-center bg-white border border-gray-200/80 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full h-64 md:h-full bg-gray-100 overflow-hidden">
                <img
                  src={latestArticle.image}
                  alt={latestArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <p className="text-xs font-semibold text-brand-gold uppercase mb-2">
                  {latestArticle.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-gray-900">
                  {latestArticle.title}
                </h2>
                <p className="text-gray-600 text-base mb-5">
                  {latestArticle.excerpt}
                </p>
                <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                  <p className="text-xs text-gray-500">{latestArticle.date}</p>
                  <div className="flex items-center font-bold text-sm text-black group-hover:text-brand-gold transition-colors">
                    Read More{" "}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* --- 3. Elegant News Card Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <a
                  href="#"
                  className="group flex flex-col bg-white border border-gray-200/80 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1"
                >
                  <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute top-4 left-4 bg-brand-gold text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                      {article.category}
                    </p>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-display mb-3 flex-grow text-gray-900">
                      {article.title}
                    </h3>
                    <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                      <p className="text-xs text-gray-500">{article.date}</p>
                      <div className="flex items-center font-bold text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- 4. Consistent Call to Action Section --- */}
      <section className=" py-20 ">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-display">Stay Updated</h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            Have questions or want to be the first to know about new arrivals?
            Contact us anytime.
          </p>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center bg-brand-gold text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-all text-lg transform hover:scale-105"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Us
          </HashLink>
        </div>
      </section>
    </motion.div>
  );
};

export default News;
