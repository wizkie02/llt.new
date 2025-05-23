import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { theme } = useTheme();

  const inputClasses = `w-full p-3 rounded-xl border ${
    theme === 'light' 
      ? 'border-gray-300 focus:border-[#0093DE]' 
      : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
  } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`;

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#2A3B4A]' : 'bg-[#1A202C] text-[#F7F8F9]'}`}>
      {/* Hero Section */}
      <section className="relative py-16 h-[50vh] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
            Get in touch with our team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Contact Our Vietnam Team
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Let our local experts help craft your perfect Vietnamese adventure
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Contact Info & Map */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact Info */}
              <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-md p-8`}>
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Contact Information
                  </span>
                  <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold ml-3">Office Address</h3>
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} pl-1`}>
                      88 Ly Nam De Street<br />
                      Hoan Kiem District<br />
                      Hanoi, Vietnam
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold ml-3">Phone Numbers</h3>
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} pl-1`}>
                      +84 24 7109 2468<br />
                      1800 1789 (VN)<br />
                      +84 923 456 789
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold ml-3">Email Contact</h3>
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} pl-1`}>
                      vietnam@loelovestravel.com<br />
                      bookings@loelovestravel.com<br />
                      custom@loelovestravel.com
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#0093DE] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0093DE] flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold ml-3">Office Hours</h3>
                    </div>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} pl-1`}>
                      Mon-Fri: 8:00 AM - 6:00 PM<br />
                      Sat: 9:00 AM - 1:00 PM<br />
                      Sun: Email support only
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-md p-8`}>
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Our Location
                  </span>
                  <h2 className="text-2xl font-bold mb-4">Find Us in Hanoi</h2>
                </div>

                <div className="h-[400px] rounded-xl overflow-hidden relative shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3193843173557!2d106.70330687469698!3d10.780461989362856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5bb9972!2sNguyen%20Hue%20Walking%20Street!5e0!3m2!1sen!2s!4v1653825252373!5m2!1sen!2s"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2 h-full">
              <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-md p-8 h-full flex flex-col`}>
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Send Message
                  </span>
                  <h2 className="text-2xl font-bold mb-4">Get In Touch With Us</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] mx-auto"></div>
                </div>

                <form className="space-y-6 max-w-xl mx-auto flex-1 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="first-name">First Name</label>
                      <input 
                        type="text" 
                        id="first-name" 
                        className={inputClasses}
                        placeholder="Your first name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="last-name">Last Name</label>
                      <input 
                        type="text" 
                        id="last-name" 
                        className={inputClasses}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={inputClasses}
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className={inputClasses}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="interest">Vietnam Travel Interest</label>
                    <select 
                      id="interest" 
                      className={inputClasses}
                    >
                      <option value="">Select your travel interest</option>
                      <option value="cultural">Cultural Journeys</option>
                      <option value="culinary">Vietnamese Culinary Tours</option>
                      <option value="adventure">Nature & Adventure</option>
                      <option value="honeymoon">Romantic Vietnam</option>
                      <option value="family">Family Vietnam Vacations</option>
                      <option value="photography">Photography Tours</option>
                      <option value="wellness">Wellness & Relaxation</option>
                      <option value="custom">Custom Vietnam Itinerary</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="message">Your Message</label>
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
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Our team is ready to help you plan your perfect Vietnamese adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+84247109246" 
              className="bg-white text-[#0093DE] hover:bg-gray-100 py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now
            </a>
            <a 
              href="mailto:vietnam@loelovestravel.com" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="w-16 h-16 rounded-full bg-[#0093DE] text-white shadow-lg flex items-center justify-center hover:bg-[#007ab8] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
          aria-label="Live Chat"
        >
          <span className="absolute inset-0 bg-[url('https://i.imgur.com/n9S0Lwh.png')] bg-cover bg-center opacity-10"></span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Contact;
