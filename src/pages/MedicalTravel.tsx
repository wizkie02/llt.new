import { useTheme } from '../contexts/ThemeContext';

const MedicalTravel = () => {
  const { theme } = useTheme();
  
  const services = [
    {
      id: 1,
      title: 'Health Check-up Tours',
      description: 'Comprehensive health examinations at Vietnam\'s leading hospitals combined with relaxing vacation experiences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Cosmetic & Plastic Surgery',
      description: 'High-quality cosmetic procedures at internationally accredited clinics with personalized recovery plans.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Recovery & Relaxation',
      description: 'Specialized post-procedure recovery programs in serene environments with medical supervision.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];
  
  const hospitals = [
    {
      id: 1,
      name: 'Vinmec International Hospital',
      location: 'Multiple locations across Vietnam',
      specialties: ['General Health Check-ups', 'Cardiology', 'Orthopedics'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'FV Hospital',
      location: 'Ho Chi Minh City',
      specialties: ['Plastic Surgery', 'Dermatology', 'Ophthalmology'],
      image: 'https://images.unsplash.com/photo-1516549655669-df64a6dc7da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'JW Plastic Surgery Center',
      location: 'Hanoi',
      specialties: ['Cosmetic Surgery', 'Reconstructive Surgery', 'Non-surgical Procedures'],
      image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
            Health & Wellness
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Medical Tourism in Vietnam
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Combine world-class healthcare with the healing beauty of Vietnam's landscapes
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-md">
              Healthcare Solutions
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Medical Travel Services</h2>
            <p className="text-lg opacity-80">
              Access Vietnam's top healthcare facilities while enjoying the comfort and relaxation of a well-planned vacation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`p-4 rounded-2xl border-l-4 ${service.id % 2 === 0 ? 'border-[#6dc0eb]' : 'border-[#58b7e8]'} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-md' 
                    : 'bg-gray-800 shadow-md'
                }`}
              >
                <div className={`${service.id % 2 === 0 ? 'text-[#6dc0eb]' : 'text-[#58b7e8]'} mb-3`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-1.5">{service.title}</h3>
                <p className="opacity-80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Building Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Our Medical Travel Services?</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Internationally Accredited Facilities</h3>
                      <p className="opacity-80">
                        We partner exclusively with JCI-accredited hospitals and clinics that meet international standards for quality and patient safety.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Multilingual Support</h3>
                      <p className="opacity-80">
                        Our team provides translation and interpretation services to ensure clear communication between you and your healthcare providers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0093DE] flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Privacy & Confidentiality</h3>
                      <p className="opacity-80">
                        We maintain the highest standards of privacy and confidentiality for all our medical travel clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Medical facility" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Medical consultation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Recovery spa" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Wellness retreat" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hospital Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Hospital Partners</h2>
            <p className="text-lg opacity-80">
              We collaborate with Vietnam's leading medical institutions to provide exceptional care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hospitals.map((hospital) => (
              <div 
                key={hospital.id}
                className={`rounded-lg overflow-hidden ${
                  theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-lg'
                }`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{hospital.name}</h3>
                  <p className="text-sm opacity-70 mb-4">{hospital.location}</p>
                  
                  <h4 className="font-semibold mb-2">Specialties:</h4>
                  <ul className="space-y-1">
                    {hospital.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#28965A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Consultation Form Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-[#0093DE]' : 'bg-[#0077b3]'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get a Consultation</h2>
            <p className="text-lg">
              Fill out the form below to receive a confidential consultation about our medical travel services.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form className={`p-8 rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} text-${theme === 'light' ? 'gray-800' : 'white'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
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
                  <label className="block text-sm font-medium mb-1" htmlFor="country">Country of Residence</label>
                  <input 
                    type="text" 
                    id="country" 
                    className={`w-full p-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-300 focus:border-[#0093DE]' 
                        : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                    } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    placeholder="Your country"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="service-type">Service of Interest</label>
                <select 
                  id="service-type" 
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-300 focus:border-[#0093DE]' 
                      : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                  } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                >
                  <option value="">Select a service</option>
                  <option value="health-checkup">Health Check-up Tour</option>
                  <option value="cosmetic-surgery">Cosmetic/Plastic Surgery</option>
                  <option value="recovery">Recovery & Relaxation</option>
                  <option value="dental">Dental Procedures</option>
                  <option value="other">Other Medical Services</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="message">Additional Information</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-300 focus:border-[#0093DE]' 
                      : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                  } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                  placeholder="Please provide any specific details about your medical travel needs..."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <label htmlFor="privacy" className="ml-2 text-sm">
                    I understand that my information will be kept confidential and only used to process my medical travel inquiry.
                  </label>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#0093DE] hover:bg-[#0077b3] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Submit Consultation Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicalTravel;
