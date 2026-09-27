// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing motion component from Framer Motion for animations
import { motion } from "framer-motion";

// Importing EmailJS SDK
import emailjs from "@emailjs/browser";

// Importing Particles Background (same as Home component)
import ParticlesBackground from "../components/ParticlesBackground.jsx";

// Importing the contact image asset
import Astra from "../assets/Astra.png";

// Reading EmailJS credentials from environment variables (Vite)
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );

    if (formData.service && formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill this field";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({name: "",email: "",service: "",budget: "",idea: ""});
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  const statusMessage = {
    sending: "Sending...",
    success: "Message sent successfully.",
    error: "Something went wrong. Please try again later.",
    unconfigured: "The contact form is not configured yet.",
  }[status];
  const statusClass = {
    success: "text-green-400",
    error: "text-red-400",
    unconfigured: "text-red-400",
    sending: "text-yellow-400",
  }[status];

  return (
    <section
      id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Particles Background */}
      <ParticlesBackground />

  

      {/* Contact Section Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Side Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="flex flex-col">
              <label htmlFor="contact-name" className="mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div className="flex flex-col">
              <label htmlFor="contact-email" className="mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Service dropdown */}
            <div className="flex flex-col">
              <label htmlFor="contact-service" className="mb-1">
                Service Needed <span className="text-red-500">*</span>
              </label>

              <select
                id="contact-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.service ? "border-red-500" : "border-gray-500"
                } focus:outline-none focus:border-blue-500`}
              >
                <option value="" disabled>
                  Something in mind?
                </option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="Mobile Application" className="text-black">
                  Mobile Application
                </option>
                <option value="other" className="text-black">
                  Others
                </option>
              </select>

              {errors.service && (
                <p className="text-red-500 text-xs">{errors.service}</p>
              )}
            </div>

            {/* Budget field */}
            {formData.service && formData.service !== "other" && (
              <div className="flex flex-col">
                <label htmlFor="contact-budget" className="mb-1">
                  Budget <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="contact-budget"
                  name="budget"
                  placeholder="Your Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-white/10 border ${
                    errors.budget ? "border-red-500" : "border-gray-500"
                  } text-white focus:outline-none focus:border-blue-500`}
                />

                {errors.budget && (
                  <p className="text-red-500 text-xs">{errors.budget}</p>
                )}
              </div>
            )}

            {/* Idea textarea */}
            <div className="flex flex-col">
              <label htmlFor="contact-idea" className="mb-1">
                Idea <span className="text-red-500">*</span>
              </label>

              <textarea
                id="contact-idea"
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.idea ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />

              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {/* Status message */}
            {status && (
              <p className={`text-sm ${statusClass}`} role="status" aria-live="polite">
                {statusMessage}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="
                bg-blue-600 
                hover:bg-blue-700 
                disabled:opacity-60 
                text-white 
                py-3 
                rounded-md 
                font-semibold 
                transition
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}