import { useTheme } from "../contexts/ThemeContext";
import ScrollReveal from "../components/ui/ScrollReveal";
import bg2 from "../assets/images/backgrounds/bg4.jpg";

const Contact = () => {
  const { theme } = useTheme();

  const inputClasses = `w-full p-3 rounded-xl border ${
    theme === "light"
      ? "border-gray-300 focus:border-[#0093DE]"
      : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
  } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`;

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-[#F7F9FC] text-[#2A3B4A]"
          : "bg-[#1A202C] text-[#F7F8F9]"
      }`}
    >
      {/* Hero Section */}
      <section className="relative py-20 h-[70vh] flex items-center justify-center rounded-b-3xl overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundPosition: "50% 50%",
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>

        <div className="container relative z-10 px-4 mx-auto text-center text-white sm:px-6 lg:px-8">
          <ScrollReveal direction="down" delay={200}>
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-xl bg-white/20 backdrop-blur-sm">
              Get in touch with our team
            </span>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
              Contact Our <span className="text-[#0093de]">Vietnam</span> Team
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={600}>
            <p className="max-w-2xl mx-auto text-lg text-white md:text-xl">
              Let our local experts help craft your perfect Vietnamese adventure
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-5 max-w-7xl">
            {/* Left Column - Contact Info & Map */}
            <div className="space-y-8 lg:col-span-3">
              {/* Contact Info */}
              <div
                className={`${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                } rounded-2xl shadow-md p-8`}
              >
                <div className="mb-8 text-center">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Contact Information
                  </span>
                  <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div
                    className={`p-6 rounded-2xl ${
                      theme === "light" ? "bg-white" : "bg-gray-700"
                    } shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-base font-semibold">
                        Office Address
                      </h3>
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      } pl-1`}
                    >
                      2 Ng. 337 P. Định Công, Định Công,
                      <br />
                      Hoàng Mai,
                      <br /> Hà Nội, Vietnam
                    </p>
                  </div>

                  <div
                    className={`p-6 rounded-2xl ${
                      theme === "light" ? "bg-white" : "bg-gray-700"
                    } shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-base font-semibold">
                        Phone Numbers
                      </h3>
                    </div>
                    <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"} pl-1 space-y-2`}>
                      <div>
                        <p className="font-medium text-[#0093DE]">Customer Support 24/7</p>
                        <p>+84 865 843 276</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-600">WhatsApp</p>
                        <p>+84 865 843 276</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-600">Zalo</p>
                        <p>+84 865 843 276</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-2xl ${
                      theme === "light" ? "bg-white" : "bg-gray-700"
                    } shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-base font-semibold">
                        Email Contact
                      </h3>
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      } pl-1`}
                    >
                      vietnam@leolovestravel.com
                      <br />
                      bookings@leolovestravel.com
                      <br />
                      custom@leolovestravel.com
                    </p>
                  </div>

                  <div
                    className={`p-6 rounded-2xl ${
                      theme === "light" ? "bg-white" : "bg-gray-700"
                    } shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="ml-3 text-base font-semibold">
                        Office Hours
                      </h3>
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      } pl-1`}
                    >
                      Mon-Fri: 8:00 AM - 6:00 PM
                      <br />
                      Sat: 9:00 AM - 1:00 PM
                      <br />
                      Sun: Email support only
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div
                className={`${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                } rounded-2xl shadow-md p-8`}
              >
                <div className="mb-8 text-center">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Our Location
                  </span>
                  <h2 className="mb-4 text-2xl font-bold">Find Us in Hanoi</h2>
                </div>

                <div className="relative w-full h-[400px] overflow-hidden shadow-md rounded-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2810726963826!2d105.82795993399861!3d20.981367329551393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adccb75bdbb3%3A0x54b14af746c78953!2zMiBOZy4gMzM3IFAuIMSQ4buLbmggQ8O0bmcsIMSQ4buLbmggQ8O0bmcsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1748418597634!5m2!1sen!2s"
                    style={{
                      border: 0,
                      width: "100%",
                      height: "100%",
                      padding: 0,
                      transform: "translateY(-180px)"
                    }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="h-full lg:col-span-2">
              <div
                className={`${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                } rounded-2xl shadow-md p-8 h-full flex flex-col`}
              >
                <div className="mb-8 text-center">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Send Message
                  </span>
                  <h2 className="mb-4 text-2xl font-bold">
                    Get In Touch With Us
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] mx-auto"></div>
                </div>

                <form className="flex flex-col flex-1 w-full mx-auto space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium"
                        htmlFor="first-name"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className={inputClasses}
                        placeholder="Your first name"
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2 text-sm font-medium"
                        htmlFor="last-name"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className={inputClasses}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={inputClasses}
                      placeholder="Your email address"
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={inputClasses}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="interest"
                    >
                      Vietnam Travel Interest
                    </label>
                    <select id="interest" className={inputClasses}>
                      <option value="">Select your travel interest</option>
                      <option value="cultural">Cultural Journeys</option>
                      <option value="culinary">
                        Vietnamese Culinary Tours
                      </option>
                      <option value="adventure">Nature & Adventure</option>
                      <option value="honeymoon">Romantic Vietnam</option>
                      <option value="family">Family Vietnam Vacations</option>
                      <option value="photography">Photography Tours</option>
                      <option value="wellness">Wellness & Relaxation</option>
                      <option value="custom">Custom Vietnam Itinerary</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="message"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={inputClasses}
                      placeholder="Tell us about your dream Vietnam journey..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0093DE] hover:bg-[#007ab8] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] text-white py-16 mt-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Need Immediate Assistance?
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl text-white/90">
            Our team is ready to help you plan your perfect Vietnamese adventure
          </p>          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:+84865843276"
              className="bg-white text-[#0093DE] hover:bg-gray-100 py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold inline-flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Us Now (24/7)
            </a>
            <a
              href="mailto:vietnam@leolovestravel.com"
              className="inline-flex items-center justify-center px-8 py-3 text-white transition-all duration-300 transform bg-transparent border-2 border-white hover:bg-white/10 rounded-xl hover:-translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
