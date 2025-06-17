import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useImagePreload } from '../hooks/useImageOptimization';
import bg8 from '../assets/images/backgrounds/bg8.jpg';
import ScrollReveal from '../components/ui/ScrollReveal';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import SEOBreadcrumb from '../components/SEOBreadcrumb';
import { pageConfigs } from '../utils/seoOptimization';

const TravelServices = () => {
  const { theme } = useTheme();
  
  // Preload critical hero background image
  useImagePreload(bg8, true);
  
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelDates: "",
    travelers: "",
    interests: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Prepare data for webhook
      const webhookData = {
        timestamp: new Date().toISOString(),
        source: "travel_services_form",
        name: formData.name,
        email: formData.email,
        travelDates: formData.travelDates,
        travelers: formData.travelers,
        interests: formData.interests,
        message: formData.message
      };

      // Send to webhook
      const response = await fetch("https://hook.eu2.make.com/wzjbmk51on9sh5dwsnntewa1k66u7sao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      // Show success message
      setSubmitMessage("Thank you for your request! We have received your information and will respond to you as soon as possible with a customized itinerary.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        travelDates: "",
        travelers: "",
        interests: "",
        message: ""
      });

    } catch (error) {
      console.error("Travel services form submission failed:", error);
      setSubmitMessage("Sorry, there was an error sending your request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const services = [
    {
      id: 1,
      title: 'Airport Transfers',
      description: 'Comfortable and reliable transportation from any airport in Vietnam to your accommodation.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Hotel Bookings',
      description: 'Access to exclusive rates at Vietnam\'s best hotels, from budget-friendly to luxury accommodations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Visa Assistance',
      description: 'Expert guidance and support for obtaining your Vietnam visa with minimal hassle.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'SIM Card & Local Concierge',
      description: 'Stay connected with local SIM cards and access to 24/7 local concierge services.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];
  return (
    <>
      <SEO
        title={pageConfigs.travelServices.title}
        description={pageConfigs.travelServices.description}
        keywords={pageConfigs.travelServices.keywords}
        url="https://leolovestravel.com/travel-services"
        type="website"
      />
      <StructuredData
        type="TravelAgency"
        data={pageConfigs.travelServices.structuredData}
      />
      <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
        <SEOBreadcrumb />
        {/* Hero Section */}
      <section className="relative py-32 mb-8 overflow-hidden rounded-b-3xl">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ 
            backgroundImage: `url(${bg8})`, 
            backgroundPosition: '50% 50%'
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>
        
        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <ScrollReveal direction="down" delay={100} distance={30}>
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-xl bg-white/20 backdrop-blur-sm">
              Supporting Your Journey
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={300} distance={40}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#e4f2f9] drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
              Travel Services in Vietnam
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={500} distance={30}>
            <p className="text-xl max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              Comprehensive travel support services to ensure your Vietnam experience is smooth and hassle-free
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
                Travel Essentials
              </span>
              <h2 className="mb-4 text-3xl font-bold">Support Services</h2>
              <p className="max-w-2xl mx-auto text-lg opacity-80">
                We handle all the details so you can focus on enjoying your journey through Vietnam
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            {services.map((service, index) => (
              <ScrollReveal 
                key={service.id} 
                direction={index % 2 === 0 ? "left" : "right"}
                delay={200 + (index * 100)}
                distance={50}
              >
                <div 
                  className={`p-6 rounded-2xl border-l-4 ${service.id % 2 === 0 ? 'border-[#0093DE]' : 'border-[#64A86B]'} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    theme === 'light' 
                      ? 'bg-white shadow-md' 
                      : 'bg-gray-800 shadow-md'
                  }`}
                >
                  <div className={`${service.id % 2 === 0 ? 'text-[#0093DE]' : 'text-[#64A86B]'} mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Customize Trip Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <ScrollReveal direction="left" delay={300} distance={50}>
                <div className='px-4 md:px-0'>
                  <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                    Personalized Service
                  </span>
                  <h2 className="mb-4 text-3xl font-bold">Customize My Trip</h2>
                  <p className="mb-6 text-lg opacity-80">
                    Tell us about your dream Vietnam experience, and our travel experts will craft a personalized itinerary just for you.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="mb-3 text-xl font-semibold">Why Customize Your Trip?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Travel at your own pace and on your preferred dates</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Focus on your specific interests and preferences</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Benefit from our local expertise and insider knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#64A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Enjoy a seamless experience with all details taken care of</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 justify-evenly lg:justify-start">
                    <a 
                      href="https://wa.me/84865843276" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-white transition-colors bg-green-500 shadow-md rounded-xl hover:bg-green-600 hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      WhatsApp
                    </a>
                    
                    <a 
                      href="https://m.me/leolovestravel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 shadow-md rounded-xl hover:bg-blue-600 hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
                      </svg>
                      Messenger
                    </a>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={500} distance={50}>
                <div className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-[#F2F7FC]' : 'bg-gray-700'}`}>
                  <h3 className="mb-6 text-xl font-semibold">Request a Custom Itinerary</h3>
                  
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block mb-1 text-sm font-medium" htmlFor="name">Full Name</label>                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full p-3 rounded-xl border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium" htmlFor="email">Email Address</label>                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full p-3 rounded-xl border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        placeholder="Your email"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium" htmlFor="travel-dates">Travel Dates</label>                        <input 
                          type="text" 
                          id="travel-dates" 
                          value={formData.travelDates}
                          onChange={(e) => handleInputChange("travelDates", e.target.value)}
                          className={`w-full p-3 rounded-xl border ${
                            theme === 'light' 
                              ? 'border-gray-300 focus:border-[#0093DE]' 
                              : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                          } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                          placeholder="When do you plan to travel?"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium" htmlFor="travelers">Number of Travelers</label>                        <input 
                          type="number" 
                          id="travelers" 
                          value={formData.travelers}
                          onChange={(e) => handleInputChange("travelers", e.target.value)}
                          className={`w-full p-3 rounded-xl border ${
                            theme === 'light' 
                              ? 'border-gray-300 focus:border-[#0093DE]' 
                              : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                          } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                          placeholder="How many people?"
                          min="1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium" htmlFor="interests">Travel Interests</label>                      <select 
                        id="interests" 
                        value={formData.interests}
                        onChange={(e) => handleInputChange("interests", e.target.value)}
                        className={`w-full p-3 rounded-xl border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        required
                      >
                        <option value="">Select your primary interest</option>
                        <option value="culture">Culture & Heritage</option>
                        <option value="adventure">Adventure & Outdoor</option>
                        <option value="food">Food & Culinary</option>
                        <option value="relaxation">Relaxation & Wellness</option>
                        <option value="photography">Photography</option>
                        <option value="family">Family-friendly</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium" htmlFor="message">Your Dream Trip</label>                      <textarea 
                        id="message" 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`w-full p-3 rounded-xl border ${
                          theme === 'light' 
                            ? 'border-gray-300 focus:border-[#0093DE]' 
                            : 'border-gray-600 bg-gray-700 focus:border-[#0093DE]'
                        } focus:outline-none focus:ring-2 focus:ring-[#0093DE]`}
                        placeholder="Tell us about your ideal Vietnam experience..."
                        required
                      ></textarea>
                    </div>
                      <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0093DE] hover:bg-[#007ab8] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:transform-none disabled:shadow-none"
                    >
                      {isSubmitting ? "Sending..." : "Submit Request"}
                    </button>

                    {submitMessage && (
                      <div className={`p-4 rounded-xl ${
                        submitMessage.includes("Thank you") 
                          ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                          : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
                      }`}>
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal direction="up" delay={200} distance={30}>
              <div className="mb-16 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                  Common Questions
                </span>
                <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="max-w-2xl mx-auto text-lg opacity-80">
                  Find answers to common questions about our travel services in Vietnam
                </p>
              </div>
            </ScrollReveal>
            
            <div className="space-y-4">
              <ScrollReveal direction="up" delay={300} distance={20}>
                {/* FAQ Item 1 */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md overflow-hidden mb-4`}>
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFAQ(0)}
                  >
                    <h3 className="m-0 text-xl font-bold">Do I need a visa to visit Vietnam?</h3>
                    <span className="flex-shrink-0 ml-4">
                      <svg 
                        className={`w-6 h-6 transition-transform transform ${openFAQs.includes(0) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 max-h-0 overflow-hidden ${openFAQs.includes(0) ? 'max-h-96' : ''}`}>
                    <div className="p-6 pt-0">
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Most visitors to Vietnam require a visa. However, citizens of some countries may be eligible for visa exemptions for short stays. Our visa assistance service can help determine your requirements and guide you through the application process.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={400} distance={20}>
                {/* FAQ Item 2 */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md overflow-hidden mb-4`}>
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFAQ(1)}
                  >
                    <h3 className="m-0 text-xl font-bold">How far in advance should I book airport transfers?</h3>
                    <span className="flex-shrink-0 ml-4">
                      <svg 
                        className={`w-6 h-6 transition-transform transform ${openFAQs.includes(1) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 max-h-0 overflow-hidden ${openFAQs.includes(1) ? 'max-h-96' : ''}`}>
                    <div className="p-6 pt-0">
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        We recommend booking airport transfers at least 48 hours before your arrival to ensure availability. For peak travel seasons, booking a week in advance is advisable. Emergency bookings may be accommodated based on availability.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={500} distance={20}>
                {/* FAQ Item 3 */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md overflow-hidden mb-4`}>
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFAQ(2)}
                  >
                    <h3 className="m-0 text-xl font-bold">What types of accommodation can you book?</h3>
                    <span className="flex-shrink-0 ml-4">
                      <svg 
                        className={`w-6 h-6 transition-transform transform ${openFAQs.includes(2) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 max-h-0 overflow-hidden ${openFAQs.includes(2) ? 'max-h-96' : ''}`}>
                    <div className="p-6 pt-0">
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        We can arrange a wide range of accommodations to suit all budgets and preferences, from luxury resorts and boutique hotels to homestays and guesthouses. All our partner accommodations are personally vetted for quality and service.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={600} distance={20}>
                {/* FAQ Item 4 */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md overflow-hidden mb-4`}>
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFAQ(3)}
                  >
                    <h3 className="m-0 text-xl font-bold">How do I stay connected while traveling in Vietnam?</h3>
                    <span className="flex-shrink-0 ml-4">
                      <svg 
                        className={`w-6 h-6 transition-transform transform ${openFAQs.includes(3) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 max-h-0 overflow-hidden ${openFAQs.includes(3) ? 'max-h-96' : ''}`}>
                    <div className="p-6 pt-0">
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        We offer pre-arranged SIM cards with data packages that can be ready upon your arrival. Alternatively, most hotels, cafes, and restaurants in tourist areas provide free Wi-Fi. Our concierge service can also assist with any connectivity issues during your stay.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={700} distance={20}>
                {/* FAQ Item 5 */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md overflow-hidden`}>
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFAQ(4)}
                  >
                    <h3 className="m-0 text-xl font-bold">What payment methods do you accept?</h3>
                    <span className="flex-shrink-0 ml-4">
                      <svg 
                        className={`w-6 h-6 transition-transform transform ${openFAQs.includes(4) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 max-h-0 overflow-hidden ${openFAQs.includes(4) ? 'max-h-96' : ''}`}>
                    <div className="p-6 pt-0">
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        We accept major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and in some cases, cash payments for services booked in person at our offices. All online payments are secured with industry-standard encryption.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>      </section>
      
    </div>
    </>
  );
};

export default TravelServices;
