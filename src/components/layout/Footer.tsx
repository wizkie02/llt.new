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
    <footer className={`${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'} relative overflow-hidden`}>
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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb]"></div>
      
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
            <Hover3DCard className={`${theme === 'light' ? 'bg-gradient-to-r from-[#0093DE]/10 to-[#6dc0eb]/10' : 'bg-gradient-to-r from-[#0093DE]/20 to-[#6dc0eb]/20'} rounded-2xl p-6 backdrop-blur-sm border border-[#0093DE]/10 shadow-lg hover:shadow-xl transition-all duration-300`}>
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
                  <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} text-sm mb-0 lg:pr-8`}>Get exclusive deals and travel insights for your Vietnam adventure</p>
                </div>
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  {!showSuccessMessage ? (
                    <form className="flex flex-col sm:flex-row gap-2 w-full lg:max-w-md" onSubmit={handleSubmit}>
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className={`flex-grow px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0093DE] ${theme === 'light' ? 'bg-white/80 text-gray-700' : 'bg-gray-800/80 text-gray-200'} border border-gray-200 text-sm shadow-inner`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitted}
                      />
                      <button 
                        type="submit" 
                        className={`bg-[#0093DE] hover:bg-[#007ab8] text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''} relative overflow-hidden`}
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
          <AnimatedCard delay={200} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">About Us</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-4`}>
                Loe Loves Travel specializes in authentic Vietnamese experiences, connecting travelers with the heart and soul of Vietnam.
              </p>
              <div className="flex space-x-3 mt-6">
                <SocialIcon href="https://facebook.com" delay={0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://twitter.com" delay={100}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://instagram.com" delay={200}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a3 3 0 003-3V6a3 3 0 00-3-3h-9a3 3 0 00-3 3v12a3 3 0 003 3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://youtube.com" delay={300}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={300} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">Destinations</h4>
              <ul className="space-y-2 text-sm">
                {destinations.map((destination, index) => (
                  <FooterLink key={destination.name} to={destination.path} delay={index * 50}>
                    {destination.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={400} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">Services</h4>
              <ul className="space-y-2 text-sm">
                {services.map((service, index) => (
                  <FooterLink key={service.name} to={service.path} delay={index * 50}>
                    {service.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={500} direction="up">
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#0093DE]">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam</span>
                </li>
                <li className={`flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@loetravel.com</span>
                </li>
                <li className={`flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+84 (0) 123 456 789</span>
                </li>
                <li className={`flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0093DE] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Mon-Fri: 9AM-6PM (GMT+7)</span>
                </li>
              </ul>
            </div>
          </AnimatedCard>
        </div>
        
        
        {/* Copyright */}
        <AnimatedCard delay={700} direction="up">
          <div className={`mt-8 pt-6 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} text-center`}>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              © {currentYear} Loe Loves Travel. All rights reserved. 
              <span className="mx-2">|</span>
              <Link to="/privacy-policy" className="hover:text-[#0093DE] transition-colors duration-300">Privacy Policy</Link>
              <span className="mx-2">|</span>
              <Link to="/terms-of-service" className="hover:text-[#0093DE] transition-colors duration-300">Terms of Service</Link>
            </p>
          </div>
        </AnimatedCard>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-[#0093DE] text-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl z-50 ${scrollVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
