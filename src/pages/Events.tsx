import { useTheme } from "../contexts/ThemeContext";
import LazyImage from "../components/ui/LazyImage";
import { useImagePreload } from "../hooks/useImageOptimization";
import bg5 from "../assets/images/backgrounds/bg5.jpg";

const Events = () => {
  const { theme } = useTheme();
  
  // Preload critical hero background image
  useImagePreload(bg5, true);

  const services = [
    {
      id: 1,
      title: "Meetings & Conferences",
      description:
        "Professional planning and execution of business meetings and conferences in Vietnam's top venues.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Incentive Travel",
      description:
        "Reward your top performers with unforgettable experiences in Vietnam's most stunning destinations.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Exhibitions",
      description:
        "Full-service exhibition planning, from venue selection to booth design and logistics management.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Private Celebrations",
      description:
        "Memorable birthday parties, anniversaries, and special occasions in unique Vietnamese settings.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
          />
        </svg>
      ),
    },
  ];

  const partners = [
    { id: 1, name: "Sofitel Legend Metropole Hanoi", category: "Luxury Hotel" },
    { id: 2, name: "JW Marriott Phu Quoc", category: "Resort" },
    { id: 3, name: "Sheraton Saigon", category: "Business Hotel" },
    { id: 4, name: "Caravelle Saigon", category: "Historic Venue" },
    { id: 5, name: "Banyan Tree Lang Co", category: "Beach Resort" },
    {
      id: 6,
      name: "Saigon Exhibition & Convention Center",
      category: "Convention Center",
    },
  ];

  return (
    <div
      className={`min-h-screen relative ${
        theme === "light"
          ? "bg-[#F7F9FC] text-[#292F36]"
          : "bg-[#1A202C] text-[#F7F9FC]"
      }`}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-[#FFCB3C]/5 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-[#E4784D]/5 blur-3xl opacity-60"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 mt-20 mb-16 overflow-hidden rounded-b-3xl">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${bg5})` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>

        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-md bg-white/20 backdrop-blur-sm">
            Corporate & Private Events
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ color: "#e2f1f9" }}
          >
            Events & Conferences in Vietnam
          </h1>
          <p className="max-w-3xl mx-auto text-xl opacity-90">
            Professional event planning and management services for corporate
            and private occasions throughout Vietnam
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Our Expertise
            </span>
            <h2 className="mb-4 text-3xl font-bold">
              Professional Event Services
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              From corporate conferences to private celebrations, we handle
              every detail to ensure your event is a success
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-6 rounded-2xl shadow-md border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === "light"
                    ? "bg-white border-gray-100"
                    : "bg-gray-800 border-gray-700"
                }`}
              >
                <div className="text-[#0093DE] mb-4">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p
                  className={`${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Planning Workflow */}
      <section
        className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              How We Work
            </span>
            <h2 className="mb-4 text-3xl font-bold">
              Our Event Planning Process
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              A streamlined approach to ensure your event exceeds expectations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute hidden md:block left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gradient-to-b from-[#58b7e8] to-[#6dc0eb] z-0"></div>

              {/* Timeline Items */}
              <div className="relative z-10 px-4 md:px-0">
                {/* Step 1 */}
                <div className="flex flex-col items-start mb-12 md:flex-row">
                  <div className="flex-1 order-2 md:text-right md:pr-8 md:order-1">
                    <h3 className="mb-2 text-xl font-bold">
                      Consultation & Briefing
                    </h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      We begin with a detailed consultation to understand your
                      event objectives, audience, budget, and vision.
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    1
                  </div>

                  <div className="flex-1 order-3 md:pl-8">
                    <ol className="invisible h-0 text-gray-600 md:h-auto md:visible">
                      <li className="font-bold">What to Expect:</li>
                      <li>One-on-one discovery session</li>
                      <li>Preliminary questionnaire</li>
                      <li>Initial brainstorming of concepts</li>
                    </ol>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-start mb-12 md:flex-row">
                  <div className="flex-1 order-2 md:text-right md:pr-8 md:order-3">
                    <ol className="invisible h-0 text-gray-600 md:h-auto md:visible">
                      <li className="font-bold">Deliverables:</li>
                      <li>Customized event blueprint</li>
                      <li>Venue shortlist and visual mockups</li>
                      <li>Estimated budget and schedule</li>
                    </ol>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    2
                  </div>

                  <div className="flex-1 order-3 md:pl-8 md:order-1">
                    <h3 className="mb-2 text-xl font-bold">
                      Proposal & Planning
                    </h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      We create a detailed proposal including venue options,
                      program outline, logistics, and budget breakdown.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-start mb-12 md:flex-row">
                  <div className="flex-1 order-2 md:text-right md:pr-8 md:order-1">
                    <h3 className="mb-2 text-xl font-bold">
                      Coordination & Preparation
                    </h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Our team handles all logistics, vendor coordination, and
                      preparations to ensure a seamless event.
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    3
                  </div>

                  <div className="flex-1 order-3 md:pl-8">
                    <ol className="invisible h-0 text-gray-600 md:h-auto md:visible">
                      <li className="font-bold">Includes:</li>
                      <li>Vendor booking and briefing</li>
                      <li>Timeline creation and distribution</li>
                      <li>Rehearsals and contingency planning</li>
                    </ol>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-start md:flex-row">
                  <div className="flex-1 order-2 md:text-right md:pr-8 md:order-3">
                    <ol className="invisible h-0 text-gray-600 md:h-auto md:visible">
                      <li className="font-bold">Post-Event Services:</li>
                      <li>On-site coordination and supervision</li>
                      <li>Feedback collection and reporting</li>
                      <li>Final report with improvement recommendations</li>
                    </ol>
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    4
                  </div>

                  <div className="flex-1 order-3 md:pl-8 md:order-1">
                    <h3 className="mb-2 text-xl font-bold">
                      Execution & Follow-up
                    </h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Our professional team manages the event day execution,
                      followed by a comprehensive debrief and evaluation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h2 className="mb-4 text-3xl font-bold">Event Highlights</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              A glimpse of the successful events we've organized across Vietnam
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden shadow-md group h-72 rounded-2xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Corporate conference"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="p-6 font-semibold text-white">
                  Annual Tech Conference, Hanoi
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group h-72 rounded-2xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Gala dinner"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="p-6 font-semibold text-white">
                  Charity Gala Dinner, Ho Chi Minh City
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group h-72 rounded-2xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Beach wedding"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="p-6 font-semibold text-white">
                  Destination Wedding, Phu Quoc
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group h-72 rounded-2xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Team building"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="p-6 font-semibold text-white">
                  Corporate Retreat, Halong Bay
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group h-72 rounded-2xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Product launch"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="p-6 font-semibold text-white">
                  Product Launch Event, Da Nang
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group h-72 rounded-2xl">
              <LazyImage
                src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Award ceremony"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="p-6 font-semibold text-white">
                  Industry Awards Ceremony, Hue
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/contact"
              className="inline-flex items-center bg-[#0093DE] hover:bg-[#007ab8] text-white py-3 px-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Request Event Portfolio
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Venue Partners */}
      <section
        className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Our Network
            </span>
            <h2 className="mb-4 text-3xl font-bold">Premium Venue Partners</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              We collaborate with Vietnam's finest venues to create exceptional
              event experiences
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === "light"
                    ? "bg-white shadow-md"
                    : "bg-gray-700 shadow-md"
                }`}
              >
                <h3 className="mb-1 text-xl font-bold">{partner.name}</h3>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-[#0093DE]" : "text-[#58b7e8]"
                  } font-medium`}
                >
                  {partner.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
