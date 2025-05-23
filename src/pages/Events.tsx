import { useTheme } from '../contexts/ThemeContext';

const Events = () => {
  const { theme } = useTheme();
  
  const services = [
    {
      id: 1,
      title: 'Meetings & Conferences',
      description: 'Professional planning and execution of business meetings and conferences in Vietnam\'s top venues.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Incentive Travel',
      description: 'Reward your top performers with unforgettable experiences in Vietnam\'s most stunning destinations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Exhibitions',
      description: 'Full-service exhibition planning, from venue selection to booth design and logistics management.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Private Celebrations',
      description: 'Memorable birthday parties, anniversaries, and special occasions in unique Vietnamese settings.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      )
    }
  ];
  
  const partners = [
    { id: 1, name: 'Sofitel Legend Metropole Hanoi', category: 'Luxury Hotel' },
    { id: 2, name: 'JW Marriott Phu Quoc', category: 'Resort' },
    { id: 3, name: 'Sheraton Saigon', category: 'Business Hotel' },
    { id: 4, name: 'Caravelle Saigon', category: 'Historic Venue' },
    { id: 5, name: 'Banyan Tree Lang Co', category: 'Beach Resort' },
    { id: 6, name: 'Saigon Exhibition & Convention Center', category: 'Convention Center' }
  ];

  return (
    <div className={`min-h-screen relative ${theme === 'light' ? 'bg-gradient-to-b from-[#F8FAFC] to-[#F2F7FC] text-[#292F36]' : 'bg-gradient-to-b from-[#1A202C] to-[#131A25] text-[#F7F9FC]'}`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-[#FFCB3C]/5 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-[#E4784D]/5 blur-3xl opacity-60"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-md">
            Corporate & Private Events
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Events & Conferences in Vietnam
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Professional event planning and management services for corporate and private occasions throughout Vietnam
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-sm">
              Our Expertise
            </span>
            <h2 className="text-3xl font-bold mb-4">Professional Event Services</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              From corporate conferences to private celebrations, we handle every detail to ensure your event is a success
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`p-6 rounded-xl shadow-md border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === 'light' 
                    ? 'bg-white border-gray-100' 
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="text-[#0093DE] mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="opacity-80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Event Planning Workflow */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-sm">
              How We Work
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Event Planning Process</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              A streamlined approach to ensure your event exceeds expectations
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] mx-auto mt-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gradient-to-b from-[#58b7e8] to-[#6dc0eb] z-0"></div>
              
              {/* Timeline Items */}
              <div className="relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-start mb-12">
                  <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Consultation & Briefing</h3>
                    <p className="opacity-80">
                      We begin with a detailed consultation to understand your event objectives, audience, budget, and vision.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    1
                  </div>
                  
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="h-0 md:h-auto invisible md:visible">Spacer</div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-start mb-12">
                  <div className="flex-1 md:text-right md:pr-8 order-2 md:order-3">
                    <div className="h-0 md:h-auto invisible md:visible">Spacer</div>
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    2
                  </div>
                  
                  <div className="flex-1 md:pl-8 order-3 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Proposal & Planning</h3>
                    <p className="opacity-80">
                      We create a detailed proposal including venue options, program outline, logistics, and budget breakdown.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-start mb-12">
                  <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Coordination & Preparation</h3>
                    <p className="opacity-80">
                      Our team handles all logistics, vendor coordination, and preparations to ensure a seamless event.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    3
                  </div>
                  
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="h-0 md:h-auto invisible md:visible">Spacer</div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1 md:text-right md:pr-8 order-2 md:order-3">
                    <div className="h-0 md:h-auto invisible md:visible">Spacer</div>
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0093DE] text-white font-bold mb-4 md:mb-0 md:mx-4 order-1 md:order-2 shadow-lg">
                    4
                  </div>
                  
                  <div className="flex-1 md:pl-8 order-3 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Execution & Follow-up</h3>
                    <p className="opacity-80">
                      Our professional team manages the event day execution, followed by a comprehensive debrief and evaluation.
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
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FFCB3C]/20 text-[#FFCB3C] text-sm font-medium mb-4 shadow-sm">
              Our Portfolio
            </span>
            <h2 className="text-3xl font-bold mb-4">Event Highlights</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              A glimpse of the successful events we've organized across Vietnam
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative h-72 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Corporate conference" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold p-6">Annual Tech Conference, Hanoi</p>
              </div>
            </div>
            
            <div className="group relative h-72 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Gala dinner" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold p-6">Charity Gala Dinner, Ho Chi Minh City</p>
              </div>
            </div>
            
            <div className="group relative h-72 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Beach wedding" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold p-6">Destination Wedding, Phu Quoc</p>
              </div>
            </div>
            
            <div className="group relative h-72 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Team building" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold p-6">Corporate Retreat, Halong Bay</p>
              </div>
            </div>
            
            <div className="group relative h-72 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Product launch" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold p-6">Product Launch Event, Da Nang</p>
              </div>
            </div>
            
            <div className="group relative h-72 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Music festival" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                <p className="text-white font-semibold p-6">Cultural Festival, Hoi An</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#64A86B]/20 text-[#64A86B] text-sm font-medium mb-4 shadow-sm">
              Premium Partnerships
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Venue Partners</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              We collaborate with Vietnam's finest venues to create exceptional events
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div 
                key={partner.id}
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  theme === 'light' 
                    ? 'bg-white shadow-sm border border-gray-100' 
                    : 'bg-gray-800 shadow-sm border border-gray-700'
                }`}
              >
                <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                <p className="text-sm opacity-70">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] rounded-t-3xl text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto relative">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4 shadow-sm">
              Get Started Today
            </span>
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Event?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Contact our events team to discuss your requirements and receive a customized proposal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-block bg-white text-[#0093DE] font-bold py-3 px-8 rounded-xl hover:bg-[#f2f7fc] transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Contact Us
              </a>
              <a 
                href="#" 
                className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
