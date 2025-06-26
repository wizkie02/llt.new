import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import wallpaper from "../assets/images/wallpaper.png";
import Counter from "../components/ui/Counter";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import { pageConfigs } from "../utils/seoOptimization";

const HomePage = () => {
  const { theme } = useTheme();
  const [visibleDestination, setVisibleDestination] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'United States',
      rating: 5,
      experience: 'Family Tour',
      text: 'Our family journey through Vietnam was pure magic! From cruising emerald waters of Halong Bay to wandering ancient Hoi An streets, every moment was filled with wonder. The local guides shared fascinating cultural insights that made our experience truly authentic.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Australia',
      rating: 5,
      experience: 'Solo Adventure',
      text: 'As a solo explorer, I wanted genuine Vietnamese experiences, and this team delivered beyond imagination. I savored phở in hidden Hanoi alleyways, cycled through misty Sapa rice terraces, and connected with hill tribe families. An unforgettable adventure!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 3,
      name: 'Emma & Thomas',
      location: 'United Kingdom',
      rating: 5,
      experience: 'Honeymoon Package',
      text: 'Our Vietnam honeymoon exceeded all dreams! We watched sunrise over limestone karsts, enjoyed private beach dinners under lantern light in Hoi An, and relaxed in mountain spa retreats. The personalized touches made us feel like royalty every step of the way.',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    }
  ];

  const services = [
    {
      id: 1,
      title: "Package Tours",
      description:
        "Carefully designed travel packages showcasing Vietnam's highlights with expert guides and seamless logistics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      link: '/package-tours'
    },
    {
      id: 2,
      title: "Medical Travel",
      description:
        "Combine world-class healthcare services with relaxing recovery in Vietnam's most rejuvenating destinations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      link: '/travel-services'
    },
    {
      id: 3,
      title: "Team Building",
      description:
        "Foster collaboration through exciting team activities in Vietnam's inspiring landscapes and cultural settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      link: '/team-building'
    },
    {
      id: 4,
      title: "Romantic Travel",
      description:
        "Create unforgettable moments with your special someone through intimate experiences in Vietnam's most romantic settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      link: '/romantic-travel'
    },
    {
      id: 5,
      title: "Travel Services",
      description:
        "Comprehensive assistance with transportation, accommodations, guides, and all the essentials for a smooth Vietnam journey",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      link: '/travel-services'
    },
    {
      id: 6,
      title: "Events & Conferences",
      description:
        "Expert planning and execution of business meetings, conferences, and special events in Vietnam's premier venues",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/events'
    }
  ];
  const popularDestinations = [
    {
      id: 1,
      name: "Halong Bay",
      description:
        "Glide through emerald waters amid thousands of limestone karsts and isles topped with lush rainforest",
      image: "/src/assets/images/destinations/halong-bay.jpg",
      fallbackImage:
        "https://content.r9cdn.net/rimg/dimg/cb/cf/2f1a018b-city-58327-1598a2b47df.jpg",
      tourId: 2,
    },
    {
      id: 2,
      name: "Hoi An Ancient Town",
      description:
        "Wander through golden-hued streets adorned with colorful lanterns, centuries-old temples, and riverside cafes",
      image: "/src/assets/images/destinations/hoi-an.jpg",
      fallbackImage:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tourId: 4,
    },
    {
      id: 3,
      name: "Sapa Rice Terraces",
      description:
        "Trek among cascading emerald-green rice paddies carved into mountainsides by ethnic minority villages",
      image:
        "https://images2.thanhnien.vn/528068263637045248/2023/8/4/ban-sao-cua-dji0901-1691132710706875636958.jpg",
      fallbackImage:
        "https://images2.thanhnien.vn/528068263637045248/2023/8/4/ban-sao-cua-dji0901-1691132710706875636958.jpg",
      tourId: 3,
    },
    {
      id: 4,
      name: "Mekong Delta",
      description:
        "Navigate through a maze of rivers, swamps and islands where floating markets and villages reveal daily river life",
      image:
        "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785c012199e24a1e2f16b5c726715921224d46983d045f3cad3032301278569e047ed3748b3ee1b7b513b2c32acfe7db64a/mekongriverfishing.jpg.webp",
      fallbackImage:
        "https://images.unsplash.com/photo-1533614121634-c535232f1b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tourId: 5,
    },
    {
      id: 5,
      name: "Hue Imperial City",
      description:
        "Explore the magnificent walled fortress and palace that was home to the Nguyen Dynasty emperors",
      image: "/src/assets/images/destinations/hue.jpg",
      fallbackImage:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tourId: 8,
    },
    {
      id: 6,
      name: "Phong Nha Caves",
      description:
        "Discover the world's largest caves with underground rivers, unique ecosystems and prehistoric limestone formations",
      image: "https://phuongbacluxuryhotel.com/uploads/dong-2.jpg",
      fallbackImage:
        "https://images.unsplash.com/photo-1528372164741-89c6078a3cf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tourId: 9,
    },
    {
      id: 7,
      name: "Phu Quoc Island",
      description:
        "Relax on pristine white-sand beaches with crystal clear waters or explore the lush national park interior",
      image:
        "https://ik.imagekit.io/tvlk/blog/2025/02/YxzFGZxQ-kinh-nghiem-du-lich-phu-quoc-6.jpg",
      fallbackImage:
        "https://images.unsplash.com/photo-1551251880-3ca5cd41549a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tourId: 6,
    },
    {
      id: 8,
      name: "Hanoi Old Quarter",
      description:
        "Get lost in ancient narrow streets filled with vendors, colonial architecture, and bustling street food scenes",
      image: "https://thegioidisan.vn/assets/media/pho1.JPG",
      fallbackImage:
        "https://images.unsplash.com/photo-1594285676267-c63e84e58e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tourId: 7,
    },
  ];

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackSrc;
  };  return (
    <div
      className={`${theme === "light"
          ? "bg-[#F7F9FC] text-[#292F36]"
          : "bg-[#1A202C] text-[#F7F9FC]"
        }`}
    >
      <SEO
        title={pageConfigs.home.title}
        description={pageConfigs.home.description}
        keywords={pageConfigs.home.keywords}
        url="https://leolovestravel.com/"
        image="https://leolovestravel.com/og-image.jpg"
        type="website"
        location={{ country: 'Vietnam', region: 'Southeast Asia', city: 'Ho Chi Minh City' }}
      />

      <StructuredData
        type="TravelAgency"
        data={pageConfigs.home.structuredData}
      />

      <StructuredData
        type="Organization"
        data={{
          name: 'Leo Loves Travel',
          description: 'Leading Vietnam travel agency specializing in authentic cultural experiences and personalized tours for international travelers',
          foundingDate: '2025',
          serviceArea: 'Vietnam, Southeast Asia',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '4800',
            bestRating: '5'
          }
        }}
      />

      {/* ...existing JSX content... */}
      {" "}      {/* Hero Section */}
      <section className="flex overflow-hidden relative flex-col justify-center items-center pt-32 w-full h-screen">
        <img
          src={wallpaper}
          alt="Vietnam scenic landscape"
          loading="eager"
          className="object-cover object-center absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-10 w-full h-full bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="container flex relative z-20 flex-col justify-center items-center px-4 mx-auto h-full text-center text-white">
          <span
            className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform bg-white/20 animate-fade-in-up hover:scale-105 hover:bg-white/30"
            style={{ animationDelay: "0.3s" }}
          >
            Welcome to Vietnam
          </span>
          <h1 className="hero text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight max-w-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Experience <span className="text-[#0093DE]">Vietnam's</span> Hidden <span className="text-[#0093DE]">Treasures</span>
          </h1>
          <p className="mb-10 max-w-3xl text-xl opacity-90 md:text-2xl animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            Dive into authentic experiences from misty mountain villages to ancient coastal towns
          </p>
          <div className="flex flex-col gap-5 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <Link
              to="/contact"
              className="bg-[#0093DE] hover:bg-[#007ab8] text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Plan My Journey
            </Link>
            <Link
              to="/package-tours"
              className="px-8 py-3 font-semibold text-white rounded-xl border backdrop-blur-sm transition-all duration-300 transform bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/80 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Explore Vietnam Tours
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-center px-8 py-4 mt-14 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-500 md:gap-12 bg-black/20 animate-fade-in-up hover:bg-black/30" style={{ animationDelay: '1.1s' }}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-[#0093DE]">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 10,000+ travelers</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-[#FFCB3C]">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>
              <span>4.9/5 rating (4800+ reviews)</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-[#64A86B]">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
              </svg>
              <span>100% Local Vietnamese Guides</span>
            </div>
          </div>
        </div>{" "}
        <div className="flex absolute right-0 left-0 bottom-16 z-20 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white animate-bounce cursor-pointer hover:text-[#0093DE] transition-colors duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => {
              document.getElementById('popular-destinations')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </section>{" "}      {/* About Us Area start */}
      <section
        className={`about-us-area py-20 rel z-1 ${theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
      >
        <div className="container px-6 mx-auto max-w-6xl md:px-12 lg:px-40 xl:px-40">
          <div className="flex flex-wrap gap-4 justify-center items-center lg:flex-nowrap">
            <div className="w-full pr-4 mb-8 text-center lg:w-1/2 max-w-[768px] lg:mb-0 lg:text-left transform transition-all duration-700 hover:scale-[1.02]">
              <div className="about-us-content">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#0093DE] bg-[#0093DE]/10 rounded-full">
                    Why Choose Us
                  </span>
                  <h2 className="mb-6 text-3xl font-bold leading-tight lg:text-4xl xl:text-5xl">
                    Travel Vietnam with{" "}
                    <span className="text-[#0093DE]">Confidence</span>
                    <br />
                    Why Choose{" "}
                    <span className="text-[#0093DE]">Leo Loves Travel</span>
                  </h2>
                </div>
                <p
                  className={`text-lg lg:text-xl leading-relaxed mb-8 ${theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}
                >
                  We go above and beyond to create authentic Vietnamese
                  experiences, revealing hidden gems and must-see attractions
                  with local expertise and passion.
                </p>

                <div className="flex justify-center items-center mb-8 lg:justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 bg-[#0093DE]/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-[#0093DE]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-medium lg:text-xl">
                        We have{" "}
                        <span className="text-[#0093DE] font-bold">
                          <Counter end={10} /> Years
                        </span>{" "}
                        of experience
                      </span>
                    </div>
                  </div>
                </div><div className="grid grid-cols-2 gap-6 lg:gap-8">
                  <div className="text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start">
                      <span className="text-3xl lg:text-4xl font-bold text-[#0093DE] flex items-center">
                        <Counter end={30} />
                        <span className="ml-1">+</span>
                      </span>
                      <span className="block mt-2 text-sm font-medium lg:text-base">
                        Vietnam Destinations
                      </span>
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start">
                      <span className="text-3xl lg:text-4xl font-bold text-[#0093DE] flex items-center">
                        <Counter end={9} />
                        <span className="ml-1">K+</span>
                      </span>
                      <span className="block mt-2 text-sm font-medium lg:text-base">
                        Satisfied Travelers
                      </span>
                    </div>
                  </div>
                </div>                <Link
                  to="/package-tours"
                  className="inline-flex items-center bg-[#0093DE] hover:bg-[#007ab8] text-white mt-8 py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Vietnam
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link></div>
            </div>            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="overflow-hidden relative rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Vietnam landscape with traditional boats"
                    className="object-cover w-full h-64 transition-transform duration-700 md:h-80 lg:h-96 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/20"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#0093DE]/10 -z-10"></div>
                <div className="absolute -top-4 -right-4 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#0093DE]/20 -z-10"></div>

                {/* Floating stats card */}
                <div className={`absolute bottom-6 left-6 right-6 backdrop-blur-sm rounded-xl p-4 shadow-lg ${theme === "light" ? "bg-white/95" : "bg-gray-800/95"
                  }`}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#0093DE]">4.9★</div>
                      <div className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Rating</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#0093DE]">10K+</div>
                      <div className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Travelers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#0093DE]">100%</div>
                      <div className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Local</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>          </div>
        </div>
      </section>
      {/* About Us Area end */}
      {/* Services Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-[#F7F9FC]' : 'bg-gray-900'}`}>
        <div className="container px-8 mx-auto md:px-12">
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Unforgettable Vietnamese Experiences</h2>
            <p className="mx-auto max-w-2xl text-lg opacity-80">
              Discover our range of thoughtfully designed travel experiences that showcase the best of Vietnam
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.link}
                className={`p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl h-full flex flex-col ${theme === 'light'
                  ? 'bg-white hover:shadow-blue-100'
                  : 'bg-gray-800 hover:shadow-blue-900/20'
                  }`}
              >
                <div className="text-[#0093DE] mb-4 transform transition-all duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className={`mb-4 flex-grow ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {service.description}
                </p>
                <div className="mt-auto flex items-center text-[#0093DE] font-medium">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>      {/* Featured Destinations */}
      <section id="popular-destinations" className={`py-20 rounded-3xl ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="container px-8 mx-auto md:px-12">          <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-teal-600 bg-teal-100 rounded-full">
            Top Destinations
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Vietnam's Treasured Places</h2>
          <p className="mx-auto max-w-2xl text-lg opacity-80">
            Discover breathtaking landscapes, ancient culture, and unforgettable adventures
          </p>
        </div>

          <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
            {popularDestinations.slice(0, 8).map((destination) => (
              <div
                key={destination.id}
                className="overflow-hidden relative h-80 rounded-2xl shadow-lg transition-all duration-500 transform group destination-card hover:-translate-y-2 hover:shadow-xl"
                onMouseEnter={() => setVisibleDestination(destination.id)}
                onMouseLeave={() => setVisibleDestination(null)}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  onError={(e) => handleImageError(e, destination.fallbackImage)}
                  className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 transition-opacity duration-300 via-black/40 group-hover:opacity-80"></div>                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                  <h3 className="mb-2 text-xl font-bold text-white">{destination.name}</h3>
                  <p className={`text-sm text-white/80 transition-all duration-500 ease-in-out transform ${visibleDestination === destination.id ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 translate-y-4'}`}>
                    {destination.description}
                  </p>
                  <div
                    className={`mt-4 transition-all duration-500 ease-in-out transform ${visibleDestination === destination.id
                        ? "opacity-100 max-h-10 translate-y-0"
                        : "opacity-0 max-h-0 translate-y-4"
                      }`}
                  >
                    <Link
                      to={`/tour/${destination.tourId}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full transition-all duration-300 transform hover:bg-blue-600 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Explore tours
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">            <Link
            to="/package-tours"
            className="inline-flex justify-center items-center px-8 py-3 font-medium text-white bg-blue-500 rounded-full shadow-md transition-all duration-300 transform hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
          >
            View All Vietnam Destinations
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className={`py-20 ${theme === 'light' ? 'bg-[#F7F9FC]' : 'bg-gray-900'}`}>
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE] text-sm font-medium mb-4">
              Traveler Stories
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Guests Say</h2>
            <p className="mx-auto max-w-2xl text-lg opacity-80">
              Authentic experiences shared by travelers who explored Vietnam with us
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mx-auto max-w-6xl lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'
                  }`}
              >
                <div className="flex gap-2 items-center mb-4 h-12">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover mr-4 w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col justify-between h-12">
                    <h4 className="m-0 font-bold">{testimonial.name}</h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#FFCB3C]' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium text-[#E4784D]">{testimonial.experience}</span>
                  </div>
                </div>

                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center bg-transparent border border-[#0093DE] text-[#0093DE] hover:bg-[#0093DE]/10 py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Read More About Us
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
