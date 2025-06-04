import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import LazyImage from "../components/ui/LazyImage";
import { useImagePreload } from "../hooks/useImageOptimization";
import ScrollReveal from "../components/ui/ScrollReveal";
import bg10 from "../assets/images/backgrounds/bg10.jpg";

const RomanticTravel = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Preload critical hero background image
  useImagePreload(bg10, true);

  const services = [
    {
      id: 1,
      title: "Wedding Photoshoots",
      description:
        "Capture your love against Vietnam's most picturesque backdrops with our professional photography packages.",
      image:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Surprise Proposals",
      description:
        "Create an unforgettable moment with our meticulously planned surprise proposal services.",
      image:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Honeymoon Itineraries",
      description:
        "Begin your married life with a romantic journey through Vietnam's most enchanting destinations.",
      image:
        "https://images.unsplash.com/photo-1539758462369-43adaa19bc1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const addOns = [
    {
      id: 1,
      title: "Professional Photographers",
      description:
        "Experienced photographers specializing in couple and wedding photography.",
      price: "From $300/day",
    },
    {
      id: 2,
      title: "Hair & Makeup Artists",
      description:
        "Professional stylists to ensure you look your absolute best for photos and special moments.",
      price: "From $150/session",
    },
    {
      id: 3,
      title: "Floral Arrangements",
      description:
        "Beautiful custom floral designs for proposals, photoshoots, or special dinners.",
      price: "From $100",
    },
    {
      id: 4,
      title: "Luxury Transportation",
      description:
        "Private cars, vintage vehicles, or boats for your special occasions.",
      price: "From $120/day",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Emma & James",
      location: "Australia",
      text: "Our honeymoon in Vietnam was absolutely magical! Leo Loves Travel created the perfect balance of romance, adventure, and relaxation. The private dinner on the beach in Phu Quoc was the highlight of our trip.",
      image:
        "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Michael & Sarah",
      location: "United States",
      text: "I wanted to propose to Sarah in a unique way, and Leo Loves Travel made it happen! They arranged a private boat in Halong Bay with musicians and photographers to capture the moment. She said yes, and we couldn't be happier!",
      image:
        "https://images.unsplash.com/photo-1545133875-55b651cbf4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-[#F7F9FC] text-[#292F36]"
          : "bg-[#1A202C] text-[#F7F9FC]"
      }`}
    >
      {/* Hero Section */}
      <section className="relative py-32 mt-20 mb-8 overflow-hidden rounded-b-3xl">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${bg10})` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>

        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <ScrollReveal direction="down" delay={100} distance={30}>
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-xl bg-white/20 backdrop-blur-sm">
              Love & Adventure
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} distance={40}>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Romantic Travel in Vietnam
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={500} distance={30}>
            <p className="max-w-3xl mx-auto text-xl">
              Create unforgettable romantic memories in Vietnam's most
              enchanting destinations
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up" delay={200} distance={30}>
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                For Couples
              </span>
              <h2 className="mb-4 text-3xl font-bold">Our Romantic Services</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                From wedding photoshoots to honeymoon itineraries, we specialize
                in creating magical moments for couples
              </p>
            </div>
          </ScrollReveal>

          <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                direction={index === 0 ? "left" : index === 1 ? "up" : "right"}
                delay={300 + index * 100}
                distance={40}
              >
                <div
                  className={`rounded-2xl h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    theme === "light"
                      ? "bg-white shadow-md"
                      : "bg-gray-800 shadow-md"
                  }`}
                >                  <div className="h-48 overflow-hidden">
                    <LazyImage
                      src={service.image}
                      alt={service.title}
                      preset="card"
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up" delay={200} distance={30}>
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                Inspiration
              </span>
              <h2 className="mb-4 text-3xl font-bold">Gallery of Couples</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                Moments of love captured across Vietnam's most romantic
                destinations
              </p>
            </div>
          </ScrollReveal>

          <div className="grid max-w-6xl grid-cols-2 gap-4 mx-auto md:grid-cols-4">
            <ScrollReveal direction="left" delay={300} distance={30}>              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <LazyImage
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Couple in Hoi An"
                  preset="gallery"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1566897819059-db42e135fa69?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Beach proposal"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Couple at sunset"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={600} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1583431978096-e09dc7b7fcf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Wedding photoshoot"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={700} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Couple in rice fields"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={800} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Couple on boat"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={900} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Lantern festival"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={1000} distance={30}>
              <div className="relative h-40 overflow-hidden transition-transform duration-300 shadow-md md:h-64 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Couple on beach"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up" delay={200} distance={30}>
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="mb-4 text-3xl font-bold">Love Stories</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                Hear from couples who have experienced our romantic services
              </p>
            </div>
          </ScrollReveal>

          <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal
                key={testimonial.id}
                direction={index === 0 ? "left" : "right"}
                delay={300 + index * 200}
                distance={40}
              >
                <div
                  className={`p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    theme === "light"
                      ? "bg-white shadow-lg"
                      : "bg-gray-800 shadow-lg"
                  }`}
                >                  <div className="flex items-center mb-4">
                    <LazyImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      preset="thumbnail"
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#0093DE]"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p
                        className={`text-sm ${
                          theme === "light"
                            ? "text-[#0093DE]"
                            : "text-[#58b7e8]"
                        }`}
                      >
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`italic ${
                      theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    "{testimonial.text}"
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section
        className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <ScrollReveal direction="left" delay={200} distance={40}>
                <div>
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Book Now
                  </span>
                  <h2 className="mb-4 text-3xl font-bold">
                    Book Your Romantic Experience
                  </h2>
                  <p className="mb-6 text-lg opacity-80">
                    Select your preferred dates and services to begin planning
                    your romantic journey in Vietnam.
                  </p>

                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold">
                      Add-on Services
                    </h3>
                    <div className="space-y-4">
                      {addOns.map((addon, index) => (
                        <ScrollReveal
                          key={addon.id}
                          direction="left"
                          delay={300 + index * 100}
                          distance={30}
                        >
                          <div
                            className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                              theme === "light" ? "bg-[#F2F7FC]" : "bg-gray-700"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{addon.title}</h4>
                                <p
                                  className={`text-sm ${
                                    theme === "light"
                                      ? "text-gray-600"
                                      : "text-gray-300"
                                  } mt-1`}
                                >
                                  {addon.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-[#0093DE]">
                                  {addon.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={400} distance={40}>
                <div
                  className={`p-8 rounded-2xl shadow-lg ${
                    theme === "light" ? "bg-[#F2F7FC]" : "bg-gray-700"
                  }`}
                >
                  <h3 className="mb-6 text-xl font-semibold">Booking Form</h3>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label
                          className="block mb-1 text-sm font-medium"
                          htmlFor="first-name"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          className={`w-full p-3 rounded-xl border ${
                            theme === "light"
                              ? "border-gray-300 focus:border-[#0093DE]"
                              : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                          } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        />
                      </div>

                      <div>
                        <label
                          className="block mb-1 text-sm font-medium"
                          htmlFor="last-name"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          className={`w-full p-3 rounded-xl border ${
                            theme === "light"
                              ? "border-gray-300 focus:border-[#0093DE]"
                              : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                          } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block mb-1 text-sm font-medium"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full p-3 rounded-xl border ${
                          theme === "light"
                            ? "border-gray-300 focus:border-[#0093DE]"
                            : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-1 text-sm font-medium"
                        htmlFor="service"
                      >
                        Service Type
                      </label>
                      <select
                        id="service"
                        className={`w-full p-3 rounded-xl border ${
                          theme === "light"
                            ? "border-gray-300 focus:border-[#0093DE]"
                            : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                      >
                        <option value="">Select a service</option>
                        <option value="wedding-photoshoot">
                          Wedding Photoshoot
                        </option>
                        <option value="proposal">Surprise Proposal</option>
                        <option value="honeymoon">Honeymoon Package</option>
                        <option value="anniversary">
                          Anniversary Celebration
                        </option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label
                          className="block mb-1 text-sm font-medium"
                          htmlFor="start-date"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="start-date"
                          className={`w-full p-3 rounded-xl border ${
                            theme === "light"
                              ? "border-gray-300 focus:border-[#0093DE]"
                              : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                          } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        />
                      </div>

                      <div>
                        <label
                          className="block mb-1 text-sm font-medium"
                          htmlFor="end-date"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id="end-date"
                          className={`w-full p-3 rounded-xl border ${
                            theme === "light"
                              ? "border-gray-300 focus:border-[#0093DE]"
                              : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                          } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block mb-1 text-sm font-medium"
                        htmlFor="message"
                      >
                        Special Requests
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className={`w-full p-3 rounded-xl border ${
                          theme === "light"
                            ? "border-gray-300 focus:border-[#0093DE]"
                            : "border-gray-600 bg-gray-700 focus:border-[#0093DE]"
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        placeholder="Tell us about your dream romantic experience in Vietnam..."
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/booking", {
                          state: {
                            serviceType: "romantic",
                            prefilledServices: [
                              "Wedding Photoshoot",
                              "Couple Getaway",
                            ],
                          },
                        })
                      }
                      className="w-full bg-[#0093DE] hover:bg-[#007ab8] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Request Booking
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RomanticTravel;
