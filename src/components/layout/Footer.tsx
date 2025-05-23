import { ReactNode, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface FooterLinkProps {
  to: string;
  children: ReactNode;
  delay?: number;
}

const FooterLink = ({ to, children, delay = 0 }: FooterLinkProps) => {
  return (
    <li className="transform transition-all duration-300 hover:translate-x-1" style={{ transitionDelay: `${delay}ms` }}>
      <Link 
        to={to} 
        className="text-gray-700 hover:text-[#0093DE] transition-colors duration-300 flex items-center group"
      >
        <span className="mr-1.5 text-[#0093DE] opacity-70 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300">›</span> 
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
      className="bg-white shadow-md hover:shadow-lg hover:bg-[#0093DE]/10 p-2 rounded-full text-gray-700 hover:text-[#0093DE] transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
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
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

// A reusable animated card component with IntersectionObserver
const AnimatedCard = ({ children, className = "", delay = 0, direction = "up" }: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
    }, { threshold: 0.1 });
    
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
    up: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
    down: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10',
    left: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
    right: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
    scale: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
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
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}
    </div>
  );
};

interface Hover3DCardProps {
  children: ReactNode;
  className?: string;
}

// Custom hover card component with 3D effect
const Hover3DCard = ({ children, className = "" }: Hover3DCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    // Limit the rotation to a small amount
    const rotateX = (posY / rect.height) * -8;
    const rotateY = (posX / rect.width) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  return (
    <div
      ref={cardRef}
      className={`transition-all duration-200 ${isHovering ? 'z-10' : ''} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)` : 'perspective(1000px) rotateX(0) rotateY(0)',
      }}
    >
      {children}
    </div>
  );
};

interface PaymentCardProps {
  imageSrc: string;
  name: string;
  delay?: number;
}

const PaymentCard = ({ imageSrc, name, delay = 0 }: PaymentCardProps) => {
  return (
    <div 
      className="hover:scale-110 transition-transform duration-300 group" 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden bg-white rounded-md shadow-sm group-hover:shadow-md transition-all duration-300">
        <div className="absolute inset-0 bg-[#0093DE]/0 group-hover:bg-[#0093DE]/5 transition-colors duration-300"></div>
        <img 
          src={imageSrc} 
          alt={name} 
          className="h-8 px-3 py-1 relative z-10"
        />
      </div>
      <div className="mt-1 text-xs text-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{name}</div>
    </div>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate processing
    setTimeout(() => {
      setShowSuccessMessage(true);
      setEmail('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setShowSuccessMessage(false);
      }, 3000);
    }, 600);
  };
  
  const currentYear = new Date().getFullYear();
  
  const paymentMethods = [
    { name: 'Visa', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" },
    { name: 'MasterCard', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" },
    { name: 'JCB', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png" },
    { name: 'MoMo', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MoMo_Logo.png/800px-MoMo_Logo.png" },
    { name: 'VNPay', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" }
  ];
  
  const partners = [
    { name: 'Vietnam Airlines', img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Vietnam_Airlines_logo.svg/1200px-Vietnam_Airlines_logo.svg.png" },
    { name: 'Bamboo Airways', img: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Bamboo_Airways_logo.svg/1200px-Bamboo_Airways_logo.svg.png" },
    { name: 'VietJet Air', img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Vietjet_Air_logo.svg/1200px-Vietjet_Air_logo.svg.png" },
    { name: 'Vietnam Tourist', img: "https://dtinews.vn/upload/news/old/tintuc/2016/08/13/VN-guide.jpg" }
  ];
  
  const destinations = [
    { name: 'Halong Bay', path: '/destination/halong-bay' },
    { name: 'Hoi An Ancient Town', path: '/destination/hoi-an' },
    { name: 'Sapa Rice Terraces', path: '/destination/sapa' },
    { name: 'Mekong Delta', path: '/destination/mekong' },
    { name: 'Hanoi Old Quarter', path: '/destination/hanoi' },
    { name: 'Hue Imperial City', path: '/destination/hue' }
  ];
  
  const services = [
    { name: 'Cultural Tours', path: '/travel-services' },
    { name: 'Adventure Tours', path: '/team-building' },
    { name: 'Food & Culinary', path: '/events' },
    { name: 'Romantic Getaways', path: '/romantic-travel' },
    { name: 'Wellness Retreats', path: '/medical-travel' },
    { name: 'Package Tours', path: '/package-tours' }
  ];
  
  return (
    <footer className="bg-[#F2F7FC] text-gray-800 relative overflow-hidden">
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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0093DE] via-teal-400 to-[#0093DE]"></div>
      
      {/* Decorative animated elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#0093DE]/5 to-teal-400/5 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-gradient-to-r from-[#0093DE]/5 to-teal-400/5 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-40 right-30 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400/5 to-[#0093DE]/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Decorative dots */}
      <DecorativeDots />
      
      {/* Newsletter Section - Before the main footer */}
      <div className="relative z-10 pt-12">
        <div className="container mx-auto px-4">
          <AnimatedCard delay={100} direction="up">
            <Hover3DCard className="bg-gradient-to-r from-[#0093DE]/10 to-teal-500/10 rounded-xl p-6 backdrop-blur-sm border border-[#0093DE]/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="lg:flex items-center justify-between relative">
                <div className="lg:w-1/2 mb-4 lg:mb-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#0093DE] mb-2 flex items-center">
                    <div className="relative mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div className="absolute inset-0 bg-[#0093DE]/20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                      <div className="absolute inset-0 rounded-full animate-[pulse-ring_3s_ease-out_infinite]" style={{ border: '1px solid rgba(0, 147, 222, 0.3)' }}></div>
                    </div>
                    Subscribe to our newsletter
                  </h3>
                  <p className="text-gray-700 text-sm mb-0 lg:pr-8">Get exclusive deals and travel insights for your Vietnam adventure</p>
                </div>
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  {!showSuccessMessage ? (
                    <form className="flex flex-col sm:flex-row gap-2 w-full lg:max-w-md" onSubmit={handleSubmit}>
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0093DE] bg-white/80 text-gray-700 border border-gray-200 text-sm shadow-inner"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitted}
                      />
                      <button 
                        type="submit" 
                        className={`bg-[#0093DE] hover:bg-[#007ab8] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''} relative overflow-hidden`}
                        disabled={isSubmitted}
                      >
                        <span className="relative z-10">
                          {isSubmitted ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            'Subscribe'
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%] opacity-0 hover:opacity-100 transition-opacity"></div>
                      </button>
                    </form>
                  ) : (
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200 flex items-center animate-fade-in shadow-md">
                      <svg className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Thank you for subscribing! You'll receive our latest deals soon.</span>
                    </div>
                  )}
                </div>
              </div>
            </Hover3DCard>
          </AnimatedCard>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-10 pb-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <AnimatedCard delay={200} direction="left">
            <Hover3DCard className="transform transition-all duration-500">
              <div className="mb-4">                <img 
                  src="src/assets/horizontal_1.png" 
                  alt="Vietnam Tours Logo" 
                  className="h-8 transition-transform duration-300 mix-blend-multiply"
                  style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
                />
                <p className="text-xs italic text-[#0093DE] mt-1">Discover Vietnam with us</p>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Our expert local guides will help you discover the authentic beauty of Vietnam through carefully crafted experiences.
              </p>
              <div className="flex space-x-3">
                <SocialIcon href="#" delay={100}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" delay={200}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" delay={300}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </SocialIcon>
              </div>
            </Hover3DCard>
          </AnimatedCard>
          
          <AnimatedCard delay={300} direction="up">
            <Hover3DCard className="transform transition-all duration-500">
              <h3 className="text-base font-semibold mb-3 relative inline-block text-[#0093DE]">
                Popular Destinations
                <span className="absolute -bottom-1 left-0 w-2/3 h-0.5 bg-gradient-to-r from-[#0093DE] to-teal-400"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                {destinations.map((destination, index) => (
                  <FooterLink 
                    key={destination.path} 
                    to={destination.path} 
                    delay={100 + (index * 50)}
                  >
                    {destination.name}
                  </FooterLink>
                ))}
              </ul>
            </Hover3DCard>
          </AnimatedCard>
          
          <AnimatedCard delay={400} direction="up">
            <Hover3DCard className="transform transition-all duration-500">
              <h3 className="text-base font-semibold mb-3 relative inline-block text-[#0093DE]">
                Our Services
                <span className="absolute -bottom-1 left-0 w-2/3 h-0.5 bg-gradient-to-r from-[#0093DE] to-teal-400"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                {services.map((service, index) => (
                  <FooterLink 
                    key={service.path} 
                    to={service.path} 
                    delay={100 + (index * 50)}
                  >
                    {service.name}
                  </FooterLink>
                ))}
              </ul>
            </Hover3DCard>
          </AnimatedCard>
          
          <AnimatedCard delay={500} direction="right">
            <Hover3DCard className="transform transition-all duration-500">
              <h3 className="text-base font-semibold mb-3 relative inline-block text-[#0093DE]">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-2/3 h-0.5 bg-gradient-to-r from-[#0093DE] to-teal-400"></span>
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                  <div className="relative bg-gray-200 p-2 rounded-full mr-2 mt-0.5 text-[#0093DE] group-hover:bg-[#0093DE]/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-0 group-hover:opacity-100 bg-[#0093DE]/10"></div>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Address</span>
                    <span className="block text-gray-700">36 Hang Dao St, Hoan Kiem, Hanoi, Vietnam</span>
                  </div>
                </li>
                <li className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                  <div className="relative bg-gray-200 p-2 rounded-full mr-2 mt-0.5 text-[#0093DE] group-hover:bg-[#0093DE]/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-0 group-hover:opacity-100 bg-[#0093DE]/10"></div>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Email</span>
                    <span className="block text-gray-700">info@vietnamtours.com</span>
                  </div>
                </li>
                <li className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                  <div className="relative bg-gray-200 p-2 rounded-full mr-2 mt-0.5 text-[#0093DE] group-hover:bg-[#0093DE]/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-0 group-hover:opacity-100 bg-[#0093DE]/10"></div>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">24/7 Hotline</span>
                    <span className="block text-gray-700">+84 123 456 789</span>
                  </div>
                </li>
                <li className="mt-3">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center text-white bg-[#0093DE] hover:bg-[#007ab8] px-4 py-2 rounded-full transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 relative z-10 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="relative z-10">Contact Us</span>
                  </Link>
                </li>
              </ul>
            </Hover3DCard>
          </AnimatedCard>
        </div>
        

        
        <AnimatedCard delay={700} direction="up">
          <div className="pt-4 border-t border-gray-200 text-center sm:flex sm:items-center sm:justify-between text-xs">
            <p className="text-gray-600">&copy; {currentYear} Vietnam Tours. All rights reserved.</p>
            <div className="mt-3 sm:mt-0 flex flex-wrap justify-center gap-5">
              {['Terms & Conditions', 'Privacy Policy', 'FAQ'].map((item) => (
                <Link 
                  key={item} 
                  to={`/${item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} 
                  className="text-gray-600 hover:text-[#0093DE] transition-colors hover:underline relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0093DE] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            {scrollVisible && (
              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="inline-flex items-center justify-center bg-white/80 hover:bg-[#0093DE]/10 text-[#0093DE] p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group animate-bounce"
                style={{ animationDuration: '2s' }}
                aria-label="Scroll to top"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            )}
          </div>
        </AnimatedCard>
      </div>
    </footer>
  );
};

export default Footer;
