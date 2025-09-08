import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  MessageSquare,
  Lock,
  MapPin,
  CheckCircle,
} from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(price);
};

const Checkout = () => {
  const location = useLocation();
  const { product, quantity, totalPrice } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showQr, setShowQr] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product || !totalPrice) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setLocationMessage("Fetching your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const simulatedAddress = `Approx. location near Lat: ${latitude.toFixed(
            4
          )}, Lon: ${longitude.toFixed(4)}`;
          setFormData((prev) => ({ ...prev, address: simulatedAddress }));
          setLocationMessage("Location filled successfully!");
        },
        () => {
          setLocationMessage(
            "Unable to retrieve location. Please enter manually."
          );
        }
      );
    } else {
      setLocationMessage("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = `
      New Laoperfume Order!
      ------------------------
      Product: ${product.name} (${product.brand})
      Quantity: ${quantity}
      Total Price: ${formatPrice(totalPrice)}
      ------------------------
      Customer Details:
      Name: ${formData.name}
      Phone: ${formData.phone}
      Address: ${formData.address}
      ------------------------
      Payment Method: ${
        paymentMethod === "cod" ? "Cash on Delivery" : "QR Code (Paid)"
      }
    `;
    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(
      message.trim()
    )}`;
    window.location.href = whatsappUrl;
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setShowQr(method === "qr");
  };

  return (
    <motion.div
      className="bg-gray-50 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
            Secure Checkout
          </h1>
          <p className="text-gray-600 mt-2 flex items-center justify-center">
            <Lock className="w-4 h-4 mr-2 text-gray-500" />
            Your information is encrypted and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* --- 1. Refined Order Summary --- */}
          <motion.div
            className="lg:col-span-1 lg:order-last bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold font-display border-b border-gray-200 pb-4 mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-sm text-gray-500">Quantity: {quantity}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span className="text-brand-gold">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* --- 2. Elegant Form & Payment --- */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold font-display mb-6 text-gray-800">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Delivery Address
                      </label>
                      <button
                        type="button"
                        onClick={handleLocationClick}
                        className="flex items-center text-xs font-semibold text-brand-gold hover:underline"
                      >
                        <MapPin className="w-4 h-4 mr-1" /> Use My Location
                      </button>
                    </div>
                    <textarea
                      value={formData.address}
                      name="address"
                      id="address"
                      rows="3"
                      required
                      className="form-textarea w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"
                      onChange={handleInputChange}
                    ></textarea>
                    {locationMessage && (
                      <p className="text-xs text-gray-500 mt-1">
                        {locationMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold font-display mb-6 text-gray-800">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {/* --- 3. Enhanced Payment Selection UI --- */}
                  <div
                    onClick={() => handlePaymentSelection("cod")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                      paymentMethod === "cod"
                        ? "border-brand-gold bg-yellow-50/50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <Truck
                        className={`w-6 h-6 mr-4 transition-colors ${
                          paymentMethod === "cod"
                            ? "text-brand-gold"
                            : "text-gray-500"
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Cash on Delivery (COD)
                        </h3>
                        <p className="text-sm text-gray-500">
                          Pay with cash upon arrival.
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "cod" && (
                      <CheckCircle className="w-6 h-6 text-brand-gold" />
                    )}
                  </div>
                  <div
                    onClick={() => handlePaymentSelection("qr")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                      paymentMethod === "qr"
                        ? "border-brand-gold bg-yellow-50/50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <CreditCard
                        className={`w-6 h-6 mr-4 transition-colors ${
                          paymentMethod === "qr"
                            ? "text-brand-gold"
                            : "text-gray-500"
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Pay with QR Code
                        </h3>
                        <p className="text-sm text-gray-500">
                          Scan to pay with your mobile app.
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "qr" && (
                      <CheckCircle className="w-6 h-6 text-brand-gold" />
                    )}
                  </div>
                </div>
                {showQr && (
                  <motion.div
                    className="mt-6 text-center bg-gray-100 p-4 rounded-md border"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <p className="font-semibold mb-2 text-gray-800">
                      Scan this QR Code to Pay
                    </p>
                    <img
                      src="https://placehold.co/200x200/png?text=Your+QR+Code"
                      alt="Payment QR Code"
                      className="mx-auto rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      After successful payment, please send your payment
                      screenshot to WhatsApp.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* --- 4. Compelling Final Button --- */}
              <button
                type="submit"
                className="group w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-md hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
              >
                <MessageSquare className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
                {paymentMethod === "cod"
                  ? "Confirm Order on WhatsApp"
                  : "Paid! Confirm on WhatsApp"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
