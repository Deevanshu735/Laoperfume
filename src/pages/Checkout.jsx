// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { useLocation, Navigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { QRCodeCanvas } from "qrcode.react";
// import {
//   CreditCard,
//   Truck,
//   MessageSquare,
//   Lock,
//   MapPin,
//   CheckCircle,
//   ChevronDown,
// } from "lucide-react";

// // The custom CountryCodeSelector component is perfect and remains unchanged.
// const CountryCodeSelector = ({ countries, isLoading, value, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const selectedCountry = useMemo(
//     () => countries.find((c) => c.code === value) || countries[0],
//     [value, countries]
//   );

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         className="flex items-center justify-center w-28 h-full px-3 py-2.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
//         onClick={() => setIsOpen(!isOpen)}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           "..."
//         ) : (
//           <>
//             {selectedCountry?.flagUrl && (
//               <img
//                 src={selectedCountry.flagUrl}
//                 alt={selectedCountry.name}
//                 className="w-6 mr-2"
//               />
//             )}
//             <span className="text-sm font-medium text-gray-700">
//               {selectedCountry?.code}
//             </span>
//             <ChevronDown className="w-4 h-4 ml-auto text-gray-500" />
//           </>
//         )}
//       </button>
//       {isOpen && !isLoading && (
//         <ul className="absolute z-10 w-72 max-h-60 mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
//           {countries.map((country) => (
//             <li
//               key={country.name}
//               className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => {
//                 onChange(country.code);
//                 setIsOpen(false);
//               }}
//             >
//               <img
//                 src={country.flagUrl}
//                 alt={country.name}
//                 className="w-6 mr-3"
//               />
//               <span className="text-sm text-gray-800">{country.name}</span>
//               <span className="ml-auto text-sm text-gray-500">
//                 {country.code}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "LAK",
//     minimumFractionDigits: 0,
//   }).format(price);
// };

// const Checkout = () => {
//   const location = useLocation();
//   const { product, quantity, totalPrice } = location.state || {};

//   const [countries, setCountries] = useState([]);
//   const [isLoadingCountries, setIsLoadingCountries] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [countryCode, setCountryCode] = useState("+91");
//   const [errors, setErrors] = useState({});
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [showQr, setShowQr] = useState(false);
//   const [locationMessage, setLocationMessage] = useState("");

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           "https://restcountries.com/v3.1/all?fields=name,idd,flags"
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();

//         const formattedData = data
//           .filter((country) => country.idd.root)
//           .map((country) => ({
//             name: country.name.common,
//             code: `${country.idd.root}${
//               country.idd.suffixes ? country.idd.suffixes[0] : ""
//             }`,
//             flagUrl: country.flags.svg,
//           }))
//           .sort((a, b) => a.name.localeCompare(b.name));

//         setCountries(formattedData);
//       } catch (error) {
//         console.error("Failed to fetch countries:", error);
//         setCountries([
//           { name: "India", code: "+91", flagUrl: "https://flagcdn.com/in.svg" },
//         ]);
//       } finally {
//         setIsLoadingCountries(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const upiUrl = useMemo(() => {
//     if (!totalPrice) return "";
//     const upiId = ""; // ⚠️ REPLACE WITH YOUR UPI ID
//     const payeeName = "Laoperfume";
//     const url = new URL("upi://pay");
//     url.searchParams.set("pa", upiId);
//     url.searchParams.set("pn", payeeName.replace(/\s/g, "+"));
//     url.searchParams.set("am", totalPrice.toString());
//     url.searchParams.set("cu", "LAK");
//     url.searchParams.set("tn", `Order for ${product.name}`);
//     return url.toString();
//   }, [totalPrice, product]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (!product || !totalPrice) {
//     return <Navigate to="/" />;
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let processedValue = value;

//     if (name === "name") {
//       processedValue = value.replace(/[^a-zA-Z\s]/g, "");
//       if (formData.name === "" && value === " ") {
//         processedValue = "";
//       }
//     }

//     if (name === "phone") {
//       processedValue = value.replace(/[^0-9]/g, "");
//     }

//     setFormData((prev) => ({ ...prev, [name]: processedValue }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleLocationClick = () => {
//     if (navigator.geolocation) {
//       setLocationMessage("Fetching your location...");
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const simulatedAddress = `Approx. location near Lat: ${latitude.toFixed(
//             4
//           )}, Lon: ${longitude.toFixed(4)}`;
//           setFormData((prev) => ({ ...prev, address: simulatedAddress }));
//           setLocationMessage("Location filled successfully!");
//           if (errors.address) {
//             setErrors((prev) => ({ ...prev, address: null }));
//           }
//         },
//         () => {
//           setLocationMessage(
//             "Unable to retrieve location. Please enter manually."
//           );
//         }
//       );
//     } else {
//       setLocationMessage("Geolocation is not supported by your browser.");
//     }
//   };

//   const handlePaymentSelection = (method) => {
//     setPaymentMethod(method);
//     setShowQr(method === "qr");
//   };

//   // ✨ CORRECTED VALIDATION LOGIC
//   const validateForm = () => {
//     const newErrors = {};

//     if (formData.name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters long.";
//     }

//     if (formData.phone.trim().length !== 10) {
//       newErrors.phone = "Please enter a valid 10-digit phone number.";
//     }

//     if (formData.address.trim().length < 5) {
//       newErrors.address = "Please enter a complete address.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isFormValid = validateForm();

//     if (!isFormValid) {
//       return;
//     }

//     const fullPhoneNumber = `${countryCode}${formData.phone}`;
//     let message = `
//       New Laoperfume Order!
//       ------------------------
//       Image: ${product.image}
//       Product: ${product.name} (${product.brand})
//       Quantity: ${quantity}
//       Total Price: ${formatPrice(totalPrice)}
//       ------------------------
//       Customer Details:
//       Name: ${formData.name.trim()}
//       Phone: ${fullPhoneNumber}
//       Address: ${formData.address.trim()}
//       ------------------------
//       Payment Method: ${
//         paymentMethod === "cod" ? "Cash on Delivery" : "QR Code (Paid)"
//       }
//     `;

//     // ✨ CORRECTED WHATSAPP URL
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
//       message.trim()
//     )}`;
//     window.location.href = whatsappUrl;
//   };

//   return (
//     <motion.div
//       className="bg-gray-50 font-sans"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
//             Secure Checkout
//           </h1>
//           <p className="text-gray-600 mt-2 flex items-center justify-center">
//             <Lock className="w-4 h-4 mr-2 text-gray-500" />
//             Your information is encrypted and secure.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//           <motion.div
//             className="lg:col-span-1 lg:order-last bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h2 className="text-2xl font-bold font-display border-b border-gray-200 pb-4 mb-4 text-gray-800">
//               Order Summary
//             </h2>
//             <div className="flex items-center space-x-4 mb-6">
//               <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <h3 className="font-bold text-gray-800">{product.name}</h3>
//                 <p className="text-sm text-gray-500">{product.brand}</p>
//                 <p className="text-sm text-gray-500">Quantity: {quantity}</p>
//               </div>
//             </div>
//             <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(totalPrice)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Shipping</span>
//                 <span className="font-semibold text-green-600">FREE</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200 mt-2">
//                 <span>Total</span>
//                 <span className="text-brand-gold">
//                   {formatPrice(totalPrice)}
//                 </span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="lg:col-span-2 space-y-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <form onSubmit={handleSubmit} className="space-y-8" noValidate>
//               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                 <h2 className="text-2xl font-bold font-display mb-6 text-gray-800">
//                   Shipping Information
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       id="name"
//                       required
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold ${
//                         errors.name ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.name && (
//                       <p className="text-xs text-red-500 mt-1">{errors.name}</p>
//                     )}
//                   </div>
//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Phone Number
//                     </label>
//                     <div className="flex">
//                       <CountryCodeSelector
//                         isLoading={isLoadingCountries}
//                         countries={countries}
//                         value={countryCode}
//                         onChange={setCountryCode}
//                       />
//                       <input
//                         type="tel"
//                         name="phone"
//                         id="phone"
//                         required
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={`form-input w-full rounded-r-md border-gray-300 shadow-sm focus:ring-brand-gold focus:border-brand-gold ${
//                           errors.phone ? "border-red-500" : ""
//                         }`}
//                       />
//                     </div>
//                     {errors.phone && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.phone}
//                       </p>
//                     )}
//                   </div>
//                   <div className="sm:col-span-2">
//                     <div className="flex justify-between items-center mb-1">
//                       <label
//                         htmlFor="address"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Full Delivery Address
//                       </label>
//                       <button
//                         type="button"
//                         onClick={handleLocationClick}
//                         className="flex items-center text-xs font-semibold text-brand-gold hover:underline"
//                       >
//                         <MapPin className="w-4 h-4 mr-1" /> Use My Location
//                       </button>
//                     </div>
//                     <textarea
//                       value={formData.address}
//                       name="address"
//                       id="address"
//                       rows="3"
//                       required
//                       onChange={handleInputChange}
//                       className={`form-textarea w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold ${
//                         errors.address ? "border-red-500" : ""
//                       }`}
//                     ></textarea>
//                     {errors.address && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.address}
//                       </p>
//                     )}
//                     {locationMessage && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         {locationMessage}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                 <h2 className="text-2xl font-bold font-display mb-6 text-gray-800">
//                   Payment Method
//                 </h2>
//                 <div className="space-y-4">
//                   <div
//                     onClick={() => handlePaymentSelection("cod")}
//                     className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex justify-between items-center ${
//                       paymentMethod === "cod"
//                         ? "border-brand-gold bg-yellow-50/50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <Truck
//                         className={`w-6 h-6 mr-4 transition-colors ${
//                           paymentMethod === "cod"
//                             ? "text-brand-gold"
//                             : "text-gray-500"
//                         }`}
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-800">
//                           Cash on Delivery (COD)
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Pay with cash upon arrival.
//                         </p>
//                       </div>
//                     </div>
//                     {paymentMethod === "cod" && (
//                       <CheckCircle className="w-6 h-6 text-brand-gold" />
//                     )}
//                   </div>
//                   <div
//                     onClick={() => handlePaymentSelection("qr")}
//                     className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex justify-between items-center ${
//                       paymentMethod === "qr"
//                         ? "border-brand-gold bg-yellow-50/50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <CreditCard
//                         className={`w-6 h-6 mr-4 transition-colors ${
//                           paymentMethod === "qr"
//                             ? "text-brand-gold"
//                             : "text-gray-500"
//                         }`}
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-800">
//                           Pay with QR Code
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Scan to pay with your mobile app.
//                         </p>
//                       </div>
//                     </div>
//                     {paymentMethod === "qr" && (
//                       <CheckCircle className="w-6 h-6 text-brand-gold" />
//                     )}
//                   </div>
//                 </div>
//                 {showQr && (
//                   <motion.div
//                     className="mt-6 text-center bg-gray-100 p-4 rounded-md border"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                   >
//                     <p className="font-semibold mb-4 text-gray-800">
//                       Scan to Pay: {formatPrice(totalPrice)}
//                     </p>
//                     <div className="flex justify-center">
//                       <QRCodeCanvas
//                         value={upiUrl}
//                         size={200}
//                         bgColor={"#ffffff"}
//                         fgColor={"#000000"}
//                         level={"L"}
//                         includeMargin={true}
//                       />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-4">
//                       After paying, click the button below to send your details
//                       on WhatsApp.
//                     </p>
//                   </motion.div>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 className="group w-full flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-md hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg"
//               >
//                 <MessageSquare className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
//                 {paymentMethod === "cod"
//                   ? "Confirm Order on WhatsApp"
//                   : "Paid! Confirm on WhatsApp"}
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Checkout;
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
import qr from "../assets/qr.jpg";

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
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showQr, setShowQr] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product || !totalPrice) {
    return <Navigate to="/" />;
  }

  const validate = () => {
    const newErrors = {};
    const { name, phone, address } = formData;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Full Name must be at least 2 characters.";
    } else if (name.trim().length > 25) {
      newErrors.name = "Full Name cannot exceed 25 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Full Name can only contain letters and spaces.";
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Phone Number must be exactly 10 digits.";
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = "Full Delivery Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "name") {
      // Prevent starting with a space
      let cleanedValue = value.startsWith(" ") ? value.trimStart() : value;
      // Allow only alphabets and spaces, and replace multiple spaces with one
      cleanedValue = cleanedValue
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/\s\s+/g, " ");

      if (cleanedValue.length > 25) {
        cleanedValue = cleanedValue.slice(0, 25);
      }
      processedValue = cleanedValue;
    }

    if (name === "phone") {
      // Allow only numbers and limit to 10 digits
      processedValue = value.replace(/\D/g, "");
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Clear the error message for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Also validate on blur for better UX
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
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
          if (errors.address) {
            setErrors((prev) => ({ ...prev, address: null }));
          }
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
    const isValid = validate();
    if (isValid) {
      let message = `
New Laoperfume Order!
------------------------
Product: ${product.name} (${product.brand})
Quantity: ${quantity}
Total Price: ${formatPrice(totalPrice)}
------------------------
Customer Details:
Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Address: ${formData.address.trim()}
------------------------
      `;
      const whatsappUrl = `https://wa.me/7027149155?text=${encodeURIComponent(
        message.trim()
      )}`;
      window.location.href = whatsappUrl;
    }
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
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
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
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-textarea w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    ></textarea>
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
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
                      src={qr}
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
