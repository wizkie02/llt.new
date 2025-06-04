import { useTheme } from "../contexts/ThemeContext";
import ScrollReveal from "../components/ui/ScrollReveal";
import bg9 from "../assets/images/backgrounds/bg9.jpg";

const TeamBuilding = () => {
  const { theme } = useTheme();

  const services = [
    {
      id: 1,
      title: "Corporate Retreats",
      description:
        "Multi-day experiences designed to strengthen team bonds while enjoying Vietnam's natural beauty.",
      image:
        "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Team Challenges",
      description:
        "Exciting outdoor activities and problem-solving exercises that promote collaboration and communication.",
      image:
        "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Leadership Development",
      description:
        "Specialized programs focusing on leadership skills in unique and inspiring Vietnamese settings.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "CSR Travel Initiatives",
      description:
        "Meaningful community service projects that allow your team to give back while experiencing local culture.",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const caseStudies = [
    {
      id: 1,
      company: "Tech Innovators Inc.",
      participants: 45,
      duration: "4 days",
      location: "Sapa & Hanoi",
      description:
        "A combination of strategic planning workshops and outdoor team challenges in the beautiful mountains of Sapa.",
      results:
        "Improved cross-departmental communication and strengthened company culture.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      company: "Global Finance Group",
      participants: 28,
      duration: "3 days",
      location: "Halong Bay",
      description:
        "Leadership retreat on a private cruise through the stunning limestone karsts of Halong Bay.",
      results:
        "Enhanced leadership capabilities and team cohesion among senior management.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
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
          style={{
            backgroundImage: `url(${bg9})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>

        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <ScrollReveal direction="down" delay={100} distance={30}>
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-xl bg-white/20 backdrop-blur-sm">
              Corporate Experiences
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} distance={40}>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ color: "#e2f1f9" }}
            >
              Team Building in Vietnam
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={500} distance={30}>
            <p className="max-w-3xl mx-auto text-xl">
              Strengthen team bonds and develop leadership through unique
              Vietnamese experiences
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
                Our Solutions
              </span>
              <h2 className="mb-4 text-3xl font-bold">
                Team Building Programs
              </h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                Customized activities designed to foster collaboration,
                communication, and creativity in your team
              </p>
            </div>
          </ScrollReveal>

          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                direction={
                  index % 4 === 0 || index % 4 === 3 ? "left" : "right"
                }
                delay={300 + index * 100}
                distance={50}
              >
                <div
                  className={`rounded-2xl overflow-hidden transition-all h-full duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    theme === "light"
                      ? "bg-white shadow-md"
                      : "bg-gray-800 shadow-md"
                  }`}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
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

      {/* Sample Programs Section */}
      <section
        className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up" delay={200} distance={30}>
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                Programs
              </span>
              <h2 className="mb-4 text-3xl font-bold">Sample Programs</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                Explore our range of corporate programs, all customizable to
                meet your team's specific objectives
              </p>
            </div>
          </ScrollReveal>

          <div className="relative grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <ScrollReveal direction="left" delay={300} distance={40}>
              <div
                className={`p-6 pb-12 rounded-2xl transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-xl ${
                  theme === "light" ? "bg-[#F2F7FC]" : "bg-gray-700"
                }`}
              >
                <div className="text-[#0093DE] mb-4">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">1-Day Workshop</h3>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Morning team-building activities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Gourmet lunch experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Afternoon strategic planning
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Evening networking dinner
                    </span>
                  </li>
                </ul>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  } mb-4`}
                >
                  Perfect for local teams looking for a productive day away from
                  the office.
                </p>
                <p className="absolute bottom-6 right-6 font-bold text-[#0093DE] w-full text-right">
                  From $150 per person
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400} distance={40}>
              <div
                className={`relative p-6 pb-12 rounded-2xl h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === "light" ? "bg-[#F2F7FC]" : "bg-gray-700"
                }`}
              >
                <div className="text-[#0093DE] mb-4">
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
                </div>
                <h3 className="mb-2 text-xl font-bold">3-Day Retreat</h3>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Luxury resort accommodation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Daily team-building activities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Facilitated workshops
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Cultural experiences
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      All meals and transportation
                    </span>
                  </li>
                </ul>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  } mb-4`}
                >
                  Ideal for teams seeking deeper connections and strategic
                  alignment.
                </p>
                <p className="absolute bottom-6 right-6 font-bold text-[#0093DE] w-full text-right">
                  From $599 per person
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500} distance={40}>
              <div
                className={`relative p-6 pb-12 rounded-2xl h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === "light" ? "bg-[#F2F7FC]" : "bg-gray-700"
                }`}
              >
                <div className="text-[#0093DE] mb-4">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  5-Day Leadership Journey
                </h3>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Multi-destination experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Executive coaching sessions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      CSR project implementation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Luxury accommodations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      Comprehensive program materials
                    </span>
                  </li>
                </ul>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  } mb-4`}
                >
                  Designed for leadership teams seeking transformative
                  experiences.
                </p>
                <p className="absolute bottom-6 right-6 font-bold text-[#0093DE] w-full text-right">
                  From $1,299 per person
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <ScrollReveal direction="up" delay={200} distance={30}>
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="mb-4 text-3xl font-bold">Case Studies</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                See how other organizations have benefited from our corporate
                travel programs
              </p>
            </div>
          </ScrollReveal>

          <div className="grid max-w-5xl grid-cols-1 gap-12 mx-auto md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <ScrollReveal
                key={study.id}
                direction={index === 0 ? "left" : "right"}
                delay={300 + index * 100}
                distance={40}
              >
                <div
                  className={`rounded-2xl h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    theme === "light"
                      ? "bg-white shadow-lg"
                      : "bg-gray-800 shadow-lg"
                  }`}
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.company}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{study.company}</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            theme === "light"
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          Participants
                        </p>
                        <p className="font-semibold">{study.participants}</p>
                      </div>

                      <div>
                        <p
                          className={`text-sm font-medium ${
                            theme === "light"
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          Duration
                        </p>
                        <p className="font-semibold">{study.duration}</p>
                      </div>

                      <div>
                        <p
                          className={`text-sm font-medium ${
                            theme === "light"
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          Location
                        </p>
                        <p className="font-semibold">{study.location}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p
                        className={`text-sm font-medium ${
                          theme === "light" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Program
                      </p>
                      <p
                        className={`${
                          theme === "light" ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        {study.description}
                      </p>
                    </div>

                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme === "light" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Results
                      </p>
                      <p className="font-medium text-[#0093DE]">
                        {study.results}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <ScrollReveal direction="left" delay={200} distance={30} className="text-center lg:text-left">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Why Choose Us
                  </span>
                  <h2 className="mb-6 text-3xl font-bold">
                    Benefits of Our Team Building Programs
                  </h2>
                </ScrollReveal>

                <div className="px-4 space-y-6 lg:px-0">
                  <ScrollReveal direction="left" delay={300} distance={30}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
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
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">
                          Improved Team Cohesion
                        </h3>
                        <p
                          className={`${
                            theme === "light"
                              ? "text-gray-600"
                              : "text-gray-300"
                          }`}
                        >
                          Our programs break down barriers between team members
                          and departments, fostering stronger relationships and
                          trust.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={400} distance={30}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
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
                            strokeWidth={2}
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">
                          Enhanced Communication
                        </h3>
                        <p
                          className={`${
                            theme === "light"
                              ? "text-gray-600"
                              : "text-gray-300"
                          }`}
                        >
                          Participants develop better communication skills
                          through collaborative challenges and facilitated
                          discussions.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={500} distance={30}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
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
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">
                          Increased Motivation
                        </h3>
                        <p
                          className={`${
                            theme === "light"
                              ? "text-gray-600"
                              : "text-gray-300"
                          }`}
                        >
                          Teams return to work energized, motivated, and with a
                          renewed sense of purpose and connection to company
                          values.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ScrollReveal direction="right" delay={300} distance={30}>
                  <div className="h-48 overflow-hidden transition-transform duration-300 transform shadow-xl rounded-2xl md:h-64 hover:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Team collaboration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={400} distance={30}>
                  <div className="h-48 overflow-hidden transition-transform duration-300 transform shadow-xl rounded-2xl md:h-64 hover:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Office team"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={500} distance={30}>
                  <div className="h-48 overflow-hidden transition-transform duration-300 transform shadow-xl rounded-2xl md:h-64 hover:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Team activity"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={600} distance={30}>
                  <div className="h-48 overflow-hidden transition-transform duration-300 transform shadow-xl rounded-2xl md:h-64 hover:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Team meeting"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamBuilding;
