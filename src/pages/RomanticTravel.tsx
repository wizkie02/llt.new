import { useTheme } from '../contexts/ThemeContext';

const RomanticTravel = () => {
  const { theme } = useTheme();
  
  const services = [
    {
      id: 1,
      title: 'Wedding Photoshoots',
      description: 'Capture your love against Vietnam\'s most picturesque backdrops with our professional photography packages.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Surprise Proposals',
      description: 'Create an unforgettable moment with our meticulously planned surprise proposal services.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Honeymoon Itineraries',
      description: 'Begin your married life with a romantic journey through Vietnam\'s most enchanting destinations.',
      image: 'https://images.unsplash.com/photo-1539758462369-43adaa19bc1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];
  
  const addOns = [
    {
      id: 1,
      title: 'Professional Photographers',
      description: 'Experienced photographers specializing in couple and wedding photography.',
      price: 'From $300/day'
    },
    {
      id: 2,
      title: 'Hair & Makeup Artists',
      description: 'Professional stylists to ensure you look your absolute best for photos and special moments.',
      price: 'From $150/session'
    },
    {
      id: 3,
      title: 'Floral Arrangements',
      description: 'Beautiful custom floral designs for proposals, photoshoots, or special dinners.',
      price: 'From $100'
    },
    {
      id: 4,
      title: 'Luxury Transportation',
      description: 'Private cars, vintage vehicles, or boats for your special occasions.',
      price: 'From $120/day'
    }
  ];
  
  const testimonials = [
    {
      id: 1,
      name: 'Emma & James',
      location: 'Australia',
      text: 'Our honeymoon in Vietnam was absolutely magical! Loelovestravel created the perfect balance of romance, adventure, and relaxation. The private dinner on the beach in Phu Quoc was the highlight of our trip.',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      name: 'Michael & Sarah',
      location: 'United States',
      text: 'I wanted to propose to Sarah in a unique way, and Loelovestravel made it happen! They arranged a private boat in Halong Bay with musicians and photographers to capture the moment. She said yes, and we couldn\'t be happier!',
      image: 'https://images.unsplash.com/photo-1545133875-55b651cbf4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
            Love & Adventure
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Romantic Travel in Vietnam
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Create unforgettable romantic memories in Vietnam's most enchanting destinations
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-md">
              For Couples
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Romantic Services</h2>
            <p className="text-lg opacity-80">
              From wedding photoshoots to honeymoon itineraries, we specialize in creating magical moments for couples
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      
      {/* Gallery Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Gallery of Couples</h2>
            <p className="text-lg opacity-80">
              Moments of love captured across Vietnam's most romantic destinations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Couple in Hoi An" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566897819059-db42e135fa69?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Beach proposal" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Couple at sunset" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583431978096-e09dc7b7fcf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Wedding photoshoot" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Couple in rice fields" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Couple on boat" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Lantern festival" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Couple on beach" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Love Stories</h2>
            <p className="text-lg opacity-80">
              Hear from couples who have experienced our romantic services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className={`p-8 rounded-lg ${
                  theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-lg'
                }`}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm opacity-70">{testimonial.location}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Book Your Romantic Experience</h2>
                <p className="text-lg mb-6 opacity-80">
                  Select your preferred dates and services to begin planning your romantic journey in Vietnam.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Add-on Services</h3>
                  <div className="space-y-4">
                    {addOns.map((addon) => (
                      <div 
                        key={addon.id}
                        className={`p-4 rounded-lg ${
                          theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-800'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{addon.title}</h4>
                            <p className="text-sm opacity-80 mt-1">{addon.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#0093DE]">{addon.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={`p-8 rounded-lg ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-800'}`}>
                <h3 className="text-xl font-semibold mb-6">Booking Form</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="first-name">First Name</label>
                      <input 
                        type="text" 
                        id="first-name" 
                        className={`w-full p-3 rounded-lg border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="last-name">Last Name</label>
                      <input 
                        type="text" 
                        id="last-name" 
                        className={`w-full p-3 rounded-lg border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                      />
                    </div>
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
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="service">Service Type</label>
                    <select 
                      id="service" 
                      className={`w-full p-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-300 focus:border-[#0093DE]' 
                          : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                      } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                    >
                      <option value="">Select a service</option>
                      <option value="wedding-photoshoot">Wedding Photoshoot</option>
                      <option value="proposal">Surprise Proposal</option>
                      <option value="honeymoon">Honeymoon Package</option>
                      <option value="anniversary">Anniversary Celebration</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="start-date">Start Date</label>
                      <input 
                        type="date" 
                        id="start-date" 
                        className={`w-full p-3 rounded-lg border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="end-date">End Date</label>
                      <input 
                        type="date" 
                        id="end-date" 
                        className={`w-full p-3 rounded-lg border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="message">Special Requests</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className={`w-full p-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-300 focus:border-[#0093DE]' 
                          : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                      } focus:outline-none focus:ring-1 focus:ring-[#0093DE]`}
                      placeholder="Tell us about any special requests or ideas for your romantic experience..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#0093DE] hover:bg-[#0077b3] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    Submit Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RomanticTravel;
