import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Compass, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const values = [
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be a globally recognized name in luxury fragrance, synonymous with quality, innovation, and ethical craftsmanship.",
    },
    {
      icon: Heart,
      title: "Our Mission",
      description:
        "To create exceptional fragrances using the finest ingredients, allowing our customers to express their individuality through scent.",
    },
    {
      icon: Compass,
      title: "Our Values",
      description:
        "We are committed to creativity, sustainability, and customer delight, ensuring every bottle reflects our dedication to excellence.",
    },
  ];

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
            "url('https://placehold.co/1920x800/1a1a1a/FEB564/png?text=Our+Story')",
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
            The Essence of Laoperfume
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Our Story Section */}
        <motion.section
          className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg border border-gray-200 shadow-sm mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-6">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Founded on the principles of passion and artistry, Laoperfume began
            as a dream to capture fleeting moments and transform them into
            timeless scents. We believe that a fragrance is more than just a
            product; it's a personal signature, an invisible accessory that
            tells a unique story. Our journey started in a small workshop in
            Vientiane, where we meticulously blended rare ingredients to create
            perfumes that evoke emotion and inspire confidence.
          </p>
        </motion.section>

        {/* Values Section */}
        <motion.section
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center"
                variants={sectionVariants}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-50 p-4 rounded-full">
                    <Icon className="w-8 h-8 text-brand-gold" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            );
          })}
        </motion.section>
      </div>

      {/* Call to Action Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-display">
            Explore Our Collection
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            Discover the perfect scent that tells your story. Browse our curated
            selection of fine fragrances.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-colors text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
