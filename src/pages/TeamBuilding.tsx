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
          <span className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
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
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-md">
              Our Solutions
            </span>
            <h2 className="text-3xl font-bold mb-4">Team Building Programs</h2>
            <p className="text-lg opacity-80">
              Customized activities designed to foster collaboration, communication, and creativity in your team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1.5">{service.title}</h3>
                  <p className="opacity-80">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sample Programs Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Sample Programs</h2>
            <p className="text-lg opacity-80">
              Explore our range of corporate programs, all customizable to meet your team's specific objectives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-800'}`}>
              <div className="text-[#0093DE] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">1-Day Workshop</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Morning team-building activities</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gourmet lunch experience</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Afternoon strategic planning</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Evening networking dinner</span>
                </li>
              </ul>
              <p className="text-sm opacity-70 mb-4">Perfect for local teams looking for a productive day away from the office.</p>
              <p className="font-bold">From $150 per person</p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-800'}`}>
              <div className="text-[#0093DE] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">3-Day Retreat</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Luxury resort accommodation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Daily team-building activities</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Facilitated workshops</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cultural experiences</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All meals and transportation</span>
                </li>
              </ul>
              <p className="text-sm opacity-70 mb-4">Ideal for teams seeking deeper connections and strategic alignment.</p>
              <p className="font-bold">From $599 per person</p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-800'}`}>
              <div className="text-[#0093DE] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">5-Day Leadership Journey</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multi-destination experience</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Executive coaching sessions</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>CSR project implementation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Luxury accommodations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive program materials</span>
                </li>
              </ul>
              <p className="text-sm opacity-70 mb-4">Designed for leadership teams seeking transformative experiences.</p>
              <p className="font-bold">From $1,299 per person</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg opacity-80">
              See how other organizations have benefited from our corporate travel programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {caseStudies.map((study) => (
              <div 
                key={study.id}
                className={`rounded-lg overflow-hidden ${
                  theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-lg'
                }`}
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={study.image}
                    alt={study.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{study.company}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium opacity-70">Participants</p>
                      <p className="font-semibold">{study.participants}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-70">Duration</p>
                      <p className="font-semibold">{study.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-70">Location</p>
                      <p className="font-semibold">{study.location}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">{study.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium opacity-70 mb-1">Results</p>
                    <p className="italic">{study.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Inquiry Form Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-[#0093DE]' : 'bg-[#0077b3]'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Corporate Event?</h2>
            <p className="text-lg">
              Fill out the form below and our corporate events team will contact you within 24 hours.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form className={`p-8 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} text-${theme === 'light' ? 'gray-800' : 'white'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="company">Company Name</label>
                  <input 
                    type="text" 
                    id="company" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    placeholder="Your company"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Contact Person</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    placeholder="Your phone"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="group-size">Group Size</label>
                  <input 
                    type="number" 
                    id="group-size" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    placeholder="Number of participants"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="event-type">Event Type</label>
                  <select 
                    id="event-type" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                  >
                    <option value="">Select event type</option>
                    <option value="team-building">Team Building</option>
                    <option value="corporate-retreat">Corporate Retreat</option>
                    <option value="leadership-development">Leadership Development</option>
                    <option value="csr-initiative">CSR Initiative</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="message">Event Details</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-300 focus:border-[#0093DE]' 
                      : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                  } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                  placeholder="Tell us about your event objectives, preferred dates, and any specific requirements..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#0093DE] hover:bg-[#0077b3] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamBuilding;
