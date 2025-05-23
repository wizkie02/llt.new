import { useTheme } from '../contexts/ThemeContext';
import halongBay from '../assets/images/destinations/halong-bay.jpg';
import hanoi from '../assets/images/destinations/hanoi.jpg';
import hoiAn from '../assets/images/destinations/hoi-an.jpg';
import hue from '../assets/images/destinations/hue.jpg';
import mekong from '../assets/images/destinations/mekong.jpg';
import phongNha from '../assets/images/destinations/phong-nha.jpg';
import phuQuoc from '../assets/images/destinations/phu-quoc.jpg';
import sapa from '../assets/images/destinations/sapa.jpg';

const About = () => {
  const { theme } = useTheme();
  
  const teamMembers = [
    {
      id: 1,
      name: 'Linh Nguyen',
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Local Expertise',
      description: 'Our team of Vietnamese experts brings authentic insights and deep knowledge of our country\'s culture, history, and hidden treasures.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Authentic Experiences',
      description: 'We go beyond tourist attractions to create genuine connections with Vietnam\'s landscapes, cuisine, traditions, and people.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F9FC] text-[#292F36]' : 'bg-[#1A202C] text-[#F7F9FC]'}`}>      {/* Hero Section */}
      <section className="relative mt-20 py-32 rounded-b-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${sapa})` }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 shadow-xl">
            Welcome to our story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Our Vietnam Journey
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover how our passion for Vietnam's beauty and culture inspired us to create unforgettable travel experiences
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4 relative">
                  <h2 className="text-3xl font-bold mb-2 relative">Our Vietnam Story</h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    Founded in 2015, our journey began with a simple vision: to share the authentic beauty and soul of Vietnam with travelers from around the world. What started as a small operation in Hanoi has grown into a full-service travel company specializing in genuine Vietnamese experiences.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our founder, Linh Nguyen, was born in the northern mountains of Vietnam and raised in Hanoi. After years working for international travel companies, she noticed that many travelers only experienced the surface of Vietnam. She dreamed of creating journeys that would connect visitors with the country's true essence.
                  </p>
                </div>
              </div>
              
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
            </div>
          </div>
        </div>      </section>
      
      {/* Mission & Values Section */}
      <section className={`py-12 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10"><span className="inline-block px-4 py-2 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-md">
              Our Guiding Principles
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Vietnam Values</h2>
            <p className="text-lg opacity-80">
              "Vietnamese Heart, Global Vision" — We blend authentic local experiences with international service excellence
            </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
              key={value.id} 
              className={`p-4 rounded-2xl border-l-4 ${value.id % 2 === 0 ? 'border-[#6dc0eb]' : 'border-[#58b7e8]'} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                theme === 'light' 
                ? 'bg-white shadow-md' 
                : 'bg-gray-800 shadow-md'
              }`}
              >
              <div className={`${value.id % 2 === 0 ? 'text-[#6dc0eb]' : 'text-[#58b7e8]'} mb-3`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-1.5">{value.title}</h3>
              <p className="opacity-80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-[#daeef6] text-[#0093DE] text-sm font-medium mb-4 shadow-md">
              The People Behind Your Journey
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Vietnamese Team</h2>
            <p className="text-lg opacity-80">
              Meet the passionate local experts who will introduce you to the true Vietnam
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className={`rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-lg'
                }`}
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#0093DE] font-medium mb-4">{member.role}</p>
                  <p className="opacity-80 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-6 relative">
                  <h2 className="text-3xl font-bold mb-2 relative">Our Journey So Far</h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500"></div>
                </div>
                <div className="space-y-4">
                  <p>
                    Throughout our journey, we've been honored to receive recognition for our commitment to authentic Vietnamese travel experiences. While we appreciate these achievements, our greatest reward comes from the smiles of our travelers as they discover the magic of Vietnam.
                  </p>
                  
                    <div className="space-y-5 mt-8">
                    <div className="flex items-start p-4 rounded-2xl bg-[#f2f7fc] dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#daeef6] rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      </div>
                      <div>
                      <h3 className="font-semibold">Vietnam Tourism Excellence Award (2022)</h3>
                      <p className="opacity-80">Honored for creating authentic travel experiences that showcase Vietnam's cultural heritage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 rounded-2xl bg-[#f2f7fc] dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#daeef6] rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      </div>
                      <div>
                      <h3 className="font-semibold">Vietnam Sustainable Tourism Certification (2021)</h3>
                      <p className="opacity-80">Recognized for our efforts to preserve Vietnam's natural landscapes and support local communities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 rounded-2xl bg-[#f2f7fc] dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#daeef6] rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0093DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      </div>
                      <div>
                      <h3 className="font-semibold">TripAdvisor Certificate of Excellence (2019-2023)</h3>
                      <p className="opacity-80">Consistently rated 5-stars by travelers for our authentic Vietnamese experiences</p>
                      </div>
                    </div>
                    </div>
                </div>
              </div>
                <div className={`rounded-2xl overflow-hidden relative p-8 ${theme === 'light' ? 'bg-gradient-to-br from-[#f2f7fc] to-white shadow-xl' : 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl'}`}>
                <h3 className="text-xl font-bold mb-8 text-center">Our Vietnam Journey in Numbers</h3>
                
                <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#0093DE] mb-2">5,000+</div>
                    <p className="font-medium">Happy Travelers</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#58b7e8] mb-2">9</div>
                    <p className="font-medium">Years in Vietnam</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#0093DE] mb-2">22</div>
                    <p className="font-medium">Local Vietnamese Guides</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#58b7e8] mb-2">63</div>
                    <p className="font-medium">Vietnamese Provinces Explored</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#58b7e8] to-[#6dc0eb] rounded-t-3xl text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto relative">            
            <h2 className="text-3xl font-bold mb-4">Begin Your Vietnam Adventure Today</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Let our team of local Vietnamese experts craft an unforgettable journey through our beautiful country.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-block bg-white text-[#0093DE] font-bold py-3 px-8 rounded-full hover:bg-[#f2f7fc] transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Contact Our Vietnam Team
              </a>
              <a 
                href="/package-tours" 
                className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Browse Vietnam Tours
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
