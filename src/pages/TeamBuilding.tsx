import { useTheme } from '../contexts/ThemeContext';

const TeamBuilding = () => {
  const { theme } = useTheme();
  
  const services = [
    {
      id: 1,
      title: 'Corporate Retreats',
      description: 'Multi-day experiences designed to strengthen team bonds while enjoying Vietnam\'s natural beauty.',
      image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Team Challenges',
      description: 'Exciting outdoor activities and problem-solving exercises that promote collaboration and communication.',
      image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Leadership Development',
      description: 'Specialized programs focusing on leadership skills in unique and inspiring Vietnamese settings.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'CSR Travel Initiatives',
      description: 'Meaningful community service projects that allow your team to give back while experiencing local culture.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];
  
  const caseStudies = [
    {
      id: 1,
      company: 'Tech Innovators Inc.',
      participants: 45,
      duration: '4 days',
      location: 'Sapa & Hanoi',
      description: 'A combination of strategic planning workshops and outdoor team challenges in the beautiful mountains of Sapa.',
      results: 'Improved cross-departmental communication and strengthened company culture.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      company: 'Global Finance Group',
      participants: 28,
      duration: '3 days',
      location: 'Halong Bay',
      description: 'Leadership retreat on a private cruise through the stunning limestone karsts of Halong Bay.',
      results: 'Enhanced leadership capabilities and team cohesion among senior management.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
            Corporate Experiences
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Team Building in Vietnam
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Strengthen team bonds and develop leadership through unique Vietnamese experiences
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Our Solutions
            </span>
            <h2 className="text-3xl font-bold mb-4">Team Building Programs</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Customized activities designed to foster collaboration, communication, and creativity in your team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800 shadow-md'
                }`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sample Programs Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Programs
            </span>
            <h2 className="text-3xl font-bold mb-4">Sample Programs</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Explore our range of corporate programs, all customizable to meet your team's specific objectives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-700'}`}>
              <div className="text-[#0093DE] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">1-Day Workshop</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Morning team-building activities</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Gourmet lunch experience</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Afternoon strategic planning</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Evening networking dinner</span>
                </li>
              </ul>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>Perfect for local teams looking for a productive day away from the office.</p>
              <p className="font-bold text-[#0093DE]">From $150 per person</p>
            </div>
            
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-700'}`}>
              <div className="text-[#0093DE] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">3-Day Retreat</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Luxury resort accommodation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Daily team-building activities</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Facilitated workshops</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Cultural experiences</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>All meals and transportation</span>
                </li>
              </ul>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>Ideal for teams seeking deeper connections and strategic alignment.</p>
              <p className="font-bold text-[#0093DE]">From $599 per person</p>
            </div>
            
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-700'}`}>
              <div className="text-[#0093DE] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">5-Day Leadership Journey</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Multi-destination experience</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Executive coaching sessions</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>CSR project implementation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Luxury accommodations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Comprehensive program materials</span>
                </li>
              </ul>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>Designed for leadership teams seeking transformative experiences.</p>
              <p className="font-bold text-[#0093DE]">From $1,299 per person</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl font-bold mb-4">Case Studies</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              See how other organizations have benefited from our corporate travel programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {caseStudies.map((study) => (
              <div 
                key={study.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-lg'
                }`}
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={study.image}
                    alt={study.company}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{study.company}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Participants</p>
                      <p className="font-semibold">{study.participants}</p>
                    </div>
                    
                    <div>
                      <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Duration</p>
                      <p className="font-semibold">{study.duration}</p>
                    </div>
                    
                    <div>
                      <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Location</p>
                      <p className="font-semibold">{study.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Program</p>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{study.description}</p>
                  </div>
                  
                  <div>
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Results</p>
                    <p className="font-medium text-[#0093DE]">{study.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl font-bold mb-6">Benefits of Our Team Building Programs</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Improved Team Cohesion</h3>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Our programs break down barriers between team members and departments, fostering stronger relationships and trust.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Enhanced Communication</h3>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Participants develop better communication skills through collaborative challenges and facilitated discussions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Increased Motivation</h3>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Teams return to work energized, motivated, and with a renewed sense of purpose and connection to company values.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Office team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Team activity" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Team meeting" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] text-white py-20 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Strengthen Your Team?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-white/90">
            Let us create a customized team building program that meets your organization's specific goals and objectives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-[#0093DE] hover:bg-gray-100 py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
            >
              Request a Proposal
            </a>
            <a 
              href="/package-tours" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamBuilding;
