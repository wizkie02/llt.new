import { ReactNode, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/horizontal_1.png";

interface FooterLinkProps {
  to: string;
  children: ReactNode;
  delay?: number;
}

const FooterLink = ({ to, children, delay = 0 }: FooterLinkProps) => {
  return (
    <li
      className="transition-all duration-300 transform hover:translate-x-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        to={to}
        className="text-gray-700 hover:text-[#0093DE] transition-colors duration-300 flex items-center group"
      >
        <span className="mr-1.5 text-[#0093DE] opacity-70 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300">
          ›
        </span>
        {children}
      </Link>
    </li>
  );
};

interface SocialIconProps {
  href: string;
  children: ReactNode;
  delay?: number;
}

const SocialIcon = ({ href, children, delay = 0 }: SocialIconProps) => {
  return (
    <a
      href={href}
      className="bg-white shadow-md hover:shadow-lg hover:bg-[#0093DE]/10 p-2 rounded-full text-gray-700 hover:text-[#0093DE] transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </a>
  );
};

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}

// A reusable animated card component with IntersectionObserver
const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a delay so animations occur sequentially
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Once it's visible, we don't need to observe it anymore
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [delay]);

  // Different entrance animations based on direction
  const entranceStyles = {
    up: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
    down: isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10",
    left: isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
    right: isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-10",
    scale: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${entranceStyles[direction]} ${className}`}
    >
      {children}
    </div>
  );
};

// Component for animated decorative dots
const DecorativeDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#0093DE]/10"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 20}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

// Removed Hover3DCard component - replaced with simple div wrapper

const Footer = () => {
  const { theme } = useTheme();  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);

  // Show scroll-to-top button only when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollVisible(true);
      } else {
        setScrollVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowErrorMessage(false);

    try {
      // Send email to webhook
      const response = await fetch('https://hook.eu2.make.com/ll3ihyl5e5nmz378seyguhai60o54ghw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'website_footer',
          timestamp: new Date().toISOString(),
          message: `New newsletter subscription from ${email}`
        }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setEmail("");
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setShowErrorMessage(true);
    }

    setIsSubmitted(false);

    // Hide messages after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
    }, 5000);
  };

  const currentYear = new Date().getFullYear();
  const destinations = [
    { name: "Halong Bay", path: "/tour/2" },
    { name: "Hoi An Ancient Town", path: "/tour/4" },
    { name: "Sapa Rice Terraces", path: "/tour/3" },
    { name: "Mekong Delta", path: "/tour/5" },
    { name: "Hanoi Old Quarter", path: "/tour/7" },
    { name: "Hue Imperial City", path: "/tour/8" },
  ];
  const services = [
    { name: "Travel Services", path: "/travel-services" },
    { name: "Team Building", path: "/team-building" },
    { name: "Events & Conferences", path: "/events" },
    { name: "Romantic Travel", path: "/romantic-travel" },
    { name: "Medical Travel", path: "/medical-travel" },
  ];

  return (
    <footer
      className={`${
        theme === "light"
          ? "bg-[#F7F9FC] text-[#292F36]"
          : "bg-[#1A202C] text-[#F7F9FC]"
      } relative overflow-hidden`}
    >
      {/* Custom animation keyframes - added at the top of component */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(10px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.7); opacity: 0 }
          50% { opacity: 0.5 }
          100% { transform: scale(1.3); opacity: 0 }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Gradient line at top of footer */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb]"></div>

      {/* Decorative animated elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#0093DE]/5 to-teal-400/5 blur-2xl animate-pulse"></div>
      <div
        className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-gradient-to-r from-[#0093DE]/5 to-teal-400/5 blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-40 right-30 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400/5 to-[#0093DE]/5 blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Decorative dots */}
      <DecorativeDots />

      {/* Newsletter Section - Before the main footer */}
      <div className="relative z-10 pt-12">        <div className="container px-4 mx-auto">
          <AnimatedCard delay={100} direction="up">
            <div
              className={`${
                theme === "light"
                  ? "bg-gradient-to-r from-[#0093DE]/10 to-[#6dc0eb]/10"
                  : "bg-gradient-to-r from-[#0093DE]/20 to-[#6dc0eb]/20"
              } rounded-2xl p-6 backdrop-blur-sm border border-[#0093DE]/10 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative items-center justify-between lg:flex">
                <div className="mb-4 lg:w-1/2 lg:mb-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#0093DE] mb-2 flex items-center">
                    <div className="relative mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10 w-6 h-6"
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
                      <div
                        className="absolute inset-0 bg-[#0093DE]/20 rounded-full animate-pulse"
                        style={{ animationDuration: "2s" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full animate-[pulse-ring_3s_ease-out_infinite]"
                        style={{ border: "1px solid rgba(0, 147, 222, 0.3)" }}
                      ></div>                    </div>
                    Stay Updated with Us
                  </h3>
                  <p
                    className={`${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    } text-sm mb-0 lg:pr-8`}
                  >                    Get exclusive deals and travel insights for your Vietnam adventure
                  </p>
                </div>                <div className="flex justify-center lg:w-1/2 lg:justify-end">
                  {showSuccessMessage ? (
                    <div className="flex items-center px-4 py-3 text-green-700 border border-green-200 rounded-lg shadow-md bg-green-50 animate-fade-in">
                      <svg
                        className="w-5 h-5 mr-3 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        Thank you for subscribing! You'll receive the latest deals soon.
                      </span>
                    </div>
                  ) : showErrorMessage ? (
                    <div className="flex items-center px-4 py-3 text-red-700 border border-red-200 rounded-lg shadow-md bg-red-50 animate-fade-in">
                      <svg
                        className="w-5 h-5 mr-3 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        An error occurred. Please try again later.
                      </span>
                    </div>
                  ) : (
                    <form
                      className="flex flex-col w-full gap-2 sm:flex-row lg:max-w-md"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className={`flex-grow px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0093DE] ${
                          theme === "light"
                            ? "bg-white/80 text-gray-700"
                            : "bg-gray-800/80 text-gray-200"
                        } border border-gray-200 text-sm shadow-inner`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitted}
                      />
                      <button
                        type="submit"
                        className={`bg-[#0093DE] hover:bg-[#007ab8] text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                          isSubmitted ? "opacity-70 cursor-not-allowed" : ""
                        } relative overflow-hidden`}
                        disabled={isSubmitted}
                      >
                        <span className="relative z-10">
                          {isSubmitted ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            "Subscribe"
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%] opacity-0 hover:opacity-100 transition-opacity"></div>
                      </button>
                    </form>
                  )}</div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      <div className="container relative z-10 px-4 pt-10 pb-6 mx-auto">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          <AnimatedCard delay={200} direction="up">
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={logo}
                  alt="Leo Loves Travel"
                  className="w-auto h-8 mr-3"
                />
                {/* <h4 className="text-lg font-bold text-[#0093DE]">About Us</h4> */}
              </div>
              <p
                className={`text-sm ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                } mb-4`}
              >
                Leo Loves Travel specializes in authentic Vietnamese
                experiences, connecting travelers with the heart and soul of
                Vietnam.
              </p>
              <div className="flex mt-6 space-x-3">
                <SocialIcon
                  href="https://www.instagram.com/leo.lovestravel/"
                  delay={0}
                >
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
                      strokeWidth={1.5}
                      d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a3 3 0 003-3V6a3 3 0 00-3-3h-9a3 3 0 00-3 3v12a3 3 0 003 3z"
                    />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href="https://www.tiktok.com/@leolovestravel1999"
                  delay={100}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.849-1.304-1.99-1.304-3.215V0h-3.094v16.108c0 .695-.224 1.347-.632 1.838-.408.49-.96.76-1.555.76-.595 0-1.147-.27-1.555-.76-.408-.491-.632-1.143-.632-1.838 0-.695.224-1.347.632-1.838.408-.49.96-.76 1.555-.76.173 0 .344.018.51.053V9.497c-.17-.023-.34-.035-.51-.035-1.62 0-3.142.631-4.287 1.776S5.093 13.99 5.093 15.61c0 1.62.63 3.142 1.776 4.287s2.667 1.776 4.287 1.776c1.62 0 3.142-.631 4.287-1.776s1.776-2.667 1.776-4.287V8.562c1.297.813 2.82 1.242 4.374 1.233V6.701c-.835.007-1.64-.234-2.272-.698z" />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href="https://www.linkedin.com/in/leo-loves-travel-a0064b366/"
                  delay={200}
                >
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
                      strokeWidth={1.5}
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    />
                    <circle cx="4" cy="4" r="2" strokeWidth={1.5} />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={300} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">
                Destinations
              </h4>
              <ul className="space-y-2 text-sm">
                {destinations.map((destination, index) => (
                  <FooterLink
                    key={destination.name}
                    to={destination.path}
                    delay={index * 50}
                  >
                    {destination.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </AnimatedCard>          <AnimatedCard delay={400} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">
                Experiences
              </h4>
              <ul className="space-y-2 text-sm">
                {services.map((service, index) => (
                  <FooterLink
                    key={service.name}
                    to={service.path}
                    delay={index * 50}
                  >
                    {service.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={500} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li
                  className={`flex items-start ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    2 Ng. 337 P. Định Công, Định Công, Hoàng Mai, Hà Nội,
                    Vietnam
                  </span>
                </li>
                <li
                  className={`flex items-center ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@leolovestravel.com</span>
                </li>
                <li
                  className={`flex items-center ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+84 (0) 865 843 276</span>
                </li>
                <li
                  className={`flex items-center ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Mon-Fri: 9AM-6PM (GMT+7)</span>
                </li>
              </ul>
            </div>
          </AnimatedCard>
        </div>

        {/* Copyright */}
        <AnimatedCard delay={700} direction="up">
          <div
            className={`mt-8 pt-6 border-t ${
              theme === "light" ? "border-gray-200" : "border-gray-700"
            } text-center`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center">
                {/* <img
                  src={logo}
                  alt="Leo Loves Travel"
                  className="w-auto h-6 mr-2"
                /> */}
                <span
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  © {currentYear} Leo Loves Travel. All rights reserved.
                </span>
              </div>
              <div
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#0093DE] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <span className="mx-2">|</span>
                <Link
                  to="/terms-of-service"
                  className="hover:text-[#0093DE] transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-4 p-3.5 rounded-full bg-[#0093DE] text-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl z-50 ${
          scrollVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
