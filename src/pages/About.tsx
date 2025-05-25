import { useTheme } from '../contexts/ThemeContext';
import ScrollReveal from '../components/ui/ScrollReveal';
import { FadeLeft, FadeRight } from '../components/ui/RevealPresets';
import Counter from '../components/ui/Counter';
import { useIntersectionObserver } from '../hooks/use-intersection-observer';
import TypeWriter from '../components/ui/TypeWriter';
import ValueCard from '../components/ui/ValueCard';
import halongBay from '../assets/images/destinations/halong-bay.jpg';
import hanoi from '../assets/images/destinations/hanoi.jpg';
import hoiAn from '../assets/images/destinations/hoi-an.jpg';
import hue from '../assets/images/destinations/hue.jpg';
import mekong from '../assets/images/destinations/mekong.jpg';
import sapa from '../assets/images/destinations/sapa.jpg';
import bg from '../assets/images/backgrounds/bg1.jpg';


const About = () => {
  const { theme } = useTheme();
  const [statsRef, isStatsVisible] = useIntersectionObserver();
  const [testimonialRef, isTestimonialVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px 0px 0px",
    triggerOnce: false // Continue observing visibility changes
  });
  const [valuesRef, isValuesVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: false
  });
  
  const teamMembers = [
    {
      id: 1,
      name: 'Du Hien',
      role: 'Founder & CEO',
      bio: 'With over 15 years of experience in Vietnam\'s travel industry, Linh founded our company with a vision to share authentic Vietnamese experiences with the world.',
      image: hanoi
    },
    {
      id: 2,
      name: 'Minh Tran',
      role: 'Head of Operations',
      bio: 'Born in Hanoi, Minh brings local expertise to every tour, ensuring authentic Vietnamese experiences while maintaining world-class service standards.',
      image: halongBay
    },
    {
      id: 3,
      name: 'Hoa Pham',
      role: 'Senior Travel Consultant',
      bio: 'Hoa\'s intimate knowledge of Vietnam\'s hidden treasures comes from exploring all 63 provinces. She crafts journeys that reveal Vietnam\'s soul.',
      image: hoiAn
    },
    {
      id: 4,
      name: 'Tuan Nguyen',
      role: 'Cultural Experience Director',
      bio: 'With a background in Vietnamese cultural studies, Tuan designs immersive experiences that connect travelers with Vietnam\'s rich heritage.',
      image: hue
    }
  ];
  
  const values = [
    {
      id: 1,
      title: 'Vietnamese Hospitality',
      description: 'We infuse every journey with the warmth and genuine care that Vietnamese hospitality is famous for worldwide.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Local Expertise',
      description: 'Our team of Vietnamese experts brings authentic insights and deep knowledge of our country\'s culture, history, and hidden treasures.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Sustainable Vietnam Tourism',
      description: 'We are committed to preserving Vietnam\'s natural beauty and cultural heritage through responsible travel practices that benefit local communities.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Authentic Experiences',
      description: 'We go beyond tourist attractions to create genuine connections with Vietnam\'s landscapes, cuisine, traditions, and people.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>
      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <ScrollReveal delay={200} direction="down">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
              Welcome to our story
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              About Our <span className="text-[#58b7e8]">Vietnam</span> Journey
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={600} direction="up">
            <p className="text-xl max-w-3xl mx-auto">
              Discover how our passion for Vietnam's beauty and culture inspired us to create unforgettable travel experiences
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeLeft delay={200}>
                <div>
                  <div className="inline-block mb-4 relative">
                    <h2 className="text-3xl font-bold mb-2 relative">Our Vietnam Story</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      Founded in 2025, our journey began with a simple vision: to share the authentic beauty and soul of Vietnam with travelers from around the world. What started as a small operation in Hanoi has grown into a full-service travel company specializing in genuine Vietnamese experiences.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Our founder, Du Hien, was born in the northern mountains of Vietnam and raised in Hanoi. After years working for international travel companies, she noticed that many travelers only experienced the surface of Vietnam. She dreamed of creating journeys that would connect visitors with the country's true essence.
                    </p>
                  </div>
                </div>
              </FadeLeft>
              
              <FadeRight delay={400}>
                <div className="grid grid-cols-2 gap-4 relative">
                  <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src={halongBay}
                      alt="Halong Bay, Vietnam" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src={sapa}
                      alt="Sapa rice terraces, Vietnam" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src={mekong}
                      alt="Mekong Delta, Vietnam" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src={hoiAn}
                      alt="Hoi An, Vietnam" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </FadeRight>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`} ref={valuesRef}>
        <div className="container mx-auto px-4">
          <div 
            className="max-w-3xl mx-auto text-center mb-16"
            style={{
              transform: isValuesVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: isValuesVisible ? 1 : 0,
              transition: 'transform 0.7s ease, opacity 0.7s ease'
            }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Our Guiding Principles
            </span>
            <h2 className="text-3xl font-bold mb-4">
              {isValuesVisible ? (
                <TypeWriter text="Our Vietnam Values" speed={50} delay={200} />
              ) : (
                "Our Vietnam Values"
              )}
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              "Vietnamese Heart, Global Vision" — We blend authentic local experiences with international service excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <ValueCard
                key={value.id}
                id={value.id}
                title={value.title}
                description={value.description}
                icon={value.icon}
                isVisible={isValuesVisible}
                delay={300 + (index * 150)}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={200}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
                Meet Our Team
              </span>
              <h2 className="text-3xl font-bold mb-4">The Vietnam Experts</h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Our passionate team of local Vietnamese travel specialists brings authentic insights and exceptional service to every journey
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal 
                key={member.id} 
                direction="up" 
                delay={300 + (index * 100)}
              >
                <div 
                  className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                    theme === 'light' ? 'bg-white' : 'bg-gray-800'
                  }`}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#0093DE] font-medium text-sm mb-3">{member.role}</p>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef}
        className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <ScrollReveal direction="up" delay={100}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#0093DE] mb-2">
                    <Counter end={8} shouldAnimate={isStatsVisible} />+
                  </div>
                  <p className="text-lg font-medium">Years Experience</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={200}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#0093DE] mb-2">
                    <Counter end={10} shouldAnimate={isStatsVisible} />k+
                  </div>
                  <p className="text-lg font-medium">Happy Travelers</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={300}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#0093DE] mb-2">
                    <Counter end={63} shouldAnimate={isStatsVisible} />
                  </div>
                  <p className="text-lg font-medium">Provinces Covered</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={400}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#0093DE] mb-2">
                    <Counter end={100} shouldAnimate={isStatsVisible} />%
                  </div>
                  <p className="text-lg font-medium">Local Expertise</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section 
        ref={testimonialRef}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={200}>
              <div className={`p-8 rounded-2xl ${theme === 'light' ? 'bg-[#0093DE]/5' : 'bg-[#0093DE]/10'} relative`}>
                <svg className="absolute top-4 left-4 h-12 w-12 text-[#0093DE]/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                
                <div className="text-center">
                  <div className="text-xl md:text-2xl italic mb-6 pt-6 min-h-[80px] flex items-center justify-center">
                    {isTestimonialVisible ? (
                      <TypeWriter 
                        text='"Our team is united by a deep love for Vietnam and a commitment to sharing its wonders with the world. We believe that travel should transform, connect, and inspire."' 
                        speed={50} 
                        className="text-xl md:text-2xl italic"
                      />
                    ) : (
                      <span className="text-xl md:text-2xl italic opacity-0">
                        Placeholder for testimonial text
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <img 
                      src={hanoi} 
                      alt="Linh Nguyen" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-md"
                    />
                    <div className="text-left">
                      <div className="font-bold">Du Hien</div>
                      <div className="text-sm text-[#0093DE]">Founder & CEO</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
