import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTours, TourOption } from "../contexts/ToursContext";
import { useTheme } from "../contexts/ThemeContext";
import bg7 from "../assets/images/backgrounds/bg7.jpg";

// Loading skeleton components
const CategorySkeleton = ({ theme }: { theme: string }) => (
  <div className="space-y-2">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className={`w-full h-10 rounded-xl animate-pulse ${
          theme === "light" ? "bg-gray-200" : "bg-gray-700"
        }`}
      />
    ))}
  </div>
);

const TourCardSkeleton = ({ theme }: { theme: string }) => (
  <div
    className={`rounded-2xl overflow-hidden shadow-md ${
      theme === "light" ? "bg-white" : "bg-gray-800"
    }`}
  >
    {/* Image skeleton */}
    <div className={`h-48 animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
    
    {/* Content skeleton */}
    <div className="p-6 space-y-3">
      {/* Title and rating skeleton */}
      <div className="flex items-start justify-between">
        <div className={`h-6 w-3/4 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-4 w-16 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      </div>
      
      {/* Location and duration skeleton */}
      <div className={`h-4 w-1/2 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className={`h-3 w-full rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-3 w-2/3 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex gap-2 pt-4">
        <div className={`h-10 w-24 rounded-xl animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-10 flex-1 rounded-xl animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      </div>
    </div>
  </div>
);

const TourListSkeleton = ({ theme }: { theme: string }) => (
  <div
    className={`flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-md ${
      theme === "light" ? "bg-white" : "bg-gray-800"
    }`}
  >
    {/* Image skeleton */}
    <div className={`h-48 md:w-1/3 md:h-auto animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
    
    {/* Content skeleton */}
    <div className="flex flex-col p-6 md:w-2/3 space-y-3">
      {/* Title and rating skeleton */}
      <div className="flex items-start justify-between">
        <div className={`h-7 w-3/4 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-5 w-20 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      </div>
      
      {/* Meta info skeletons */}
      <div className="flex flex-wrap gap-4">
        <div className={`h-4 w-24 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-4 w-20 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-4 w-16 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 flex-grow">
        <div className={`h-4 w-full rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-4 w-5/6 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className={`h-4 w-3/4 rounded animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
      </div>
      
      {/* Category and buttons skeleton */}
      <div className="flex items-center justify-between mt-auto">
        <div className={`h-6 w-20 rounded-full animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        <div className="flex gap-2">
          <div className={`h-9 w-24 rounded-xl animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
          <div className={`h-9 w-20 rounded-xl animate-pulse ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`} />
        </div>
      </div>
    </div>
  </div>
);

const PackageTours = () => {
  const { tours, getToursByCategory, getFeaturedTours } = useTours();
  const { theme } = useTheme();
  const navigate = useNavigate();  const [filteredTours, setFilteredTours] = useState<TourOption[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [toursLoading, setToursLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await fetch("https://leolovestravel.com/api/get-categories.php");
        const data = await res.json();
        setCategories(["all", "featured", ...data.map((c: { name: string }) => c.name)]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        // Fallback categories if API fails
        setCategories(["all", "featured", "luxury", "adventure", "cultural", "city"]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Loading effect for tours
  useEffect(() => {
    setToursLoading(true);
    const timer = setTimeout(() => {
      setToursLoading(false);
    }, 500); // Simulate loading time
    
    return () => clearTimeout(timer);
  }, [tours]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to determine items per page based on window width
  const getItemsPerPageForWidth = (width: number): number => {
    if (width >= 1024) {
      // lg and up
      return 9;
    }
    if (width >= 768) {
      // md and up
      return 6;
    }
    return 3; // default (sm)
  };
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    getItemsPerPageForWidth(window.innerWidth)
  );

  // Get min and max prices from tours
  const minPrice = Math.min(...tours.map((tour) => tour.price));
  const maxPrice = Math.max(...tours.map((tour) => tour.price));

  // Dynamic slider range that adjusts based on user input
  const [sliderRange, setSliderRange] = useState<[number, number]>([0, 1000]);  // Update slider range when needed
  const updateSliderRange = (newPriceRange: [number, number]) => {
    const [min, max] = newPriceRange;
    const currentSliderMin = sliderRange[0];
    const currentSliderMax = sliderRange[1];

    let newSliderMin = currentSliderMin;
    let newSliderMax = currentSliderMax;

    // Always expand slider range if price goes below or above current range
    if (min < currentSliderMin) {
      newSliderMin = Math.max(0, min - 50); // Add some padding
    }
    if (max > currentSliderMax) {
      newSliderMax = max + 100; // Add some padding
    }

    // More aggressive range adjustment for manual input
    // If the new range is significantly different, adjust accordingly
    const rangeDifference = max - min;
    const currentRangeDifference = currentSliderMax - currentSliderMin;

    // If user input creates a much larger range, expand the slider
    if (rangeDifference > currentRangeDifference * 0.8) {
      newSliderMin = Math.max(0, min - 100);
      newSliderMax = max + 200;
    }

    // Contract slider range if the new values are much smaller than current range
    // Only contract if both values are significantly smaller
    if (max < currentSliderMax * 0.5 && min > currentSliderMin) {
      newSliderMax = Math.max(max + 100, currentSliderMax * 0.7);
    }

    // Always update if range actually changed
    if (newSliderMin !== currentSliderMin || newSliderMax !== currentSliderMax) {
      setSliderRange([newSliderMin, newSliderMax]);
    }
  };
  // Initialize price range and slider range based on actual tour prices
  useEffect(() => {
    if (tours.length > 0) {
      setPriceRange([minPrice, maxPrice]);
      setSliderRange([Math.max(0, minPrice - 50), maxPrice + 100]);
    }
  }, [tours, minPrice, maxPrice]);

  // Effect to update itemsPerPage on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPageForWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    // Call handler right away so state is updated with initial window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures this effect runs only on mount and unmount  // Filter and sort tours based on all criteria
  useEffect(() => {
    let result = [...tours];

    setCurrentPage(1); // Reset to first page on filter change

    // Filter by category
    if (activeFilter !== "all") {
      result =
        activeFilter === "featured"
          ? getFeaturedTours()
          : getToursByCategory(activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.name.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query) ||
          (tour.category && tour.category.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    result = result.filter(
      (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Sort tours based on selected criteria
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "duration":
        result.sort((a, b) => {
          // Extract number of days from duration
          const getDays = (duration: string) => {
            const match = duration.match(/(\d+)\s*days?/i);
            return match ? parseInt(match[1]) : 0;
          };
          return getDays(b.duration) - getDays(a.duration);
        });
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // 'recommended' - featured first, then by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }

    setFilteredTours(result);
  }, [
    tours,
    activeFilter,
    searchQuery,
    priceRange,
    sortBy,
    getFeaturedTours,
    getToursByCategory,
    itemsPerPage, // Add itemsPerPage here so currentPage resets if it changes
  ]);

  // Handle category filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };  // Handler for range slider changes
  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];

    if (index === 0) {
      // Minimum value - ensure it doesn't exceed max
      newRange[0] = Math.min(newValue, priceRange[1] - 1);
    } else {
      // Maximum value - ensure it's not less than min
      newRange[1] = Math.max(newValue, priceRange[0] + 1);
    }

    // Ensure valid range with minimum gap
    const minGap = 1;
    if (newRange[1] - newRange[0] < minGap) {
      if (index === 0) {
        newRange[1] = newRange[0] + minGap;
      } else {
        newRange[0] = newRange[1] - minGap;
      }
    }

    setPriceRange(newRange);
  };

  // Handler for number input changes
  const handlePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    // Allow empty input for better user experience
    if (inputValue === '') {
      const newRange = [...priceRange] as [number, number];
      newRange[index] = 0;
      setPriceRange(newRange);
      return;
    }

    const newValue = parseInt(inputValue);

    // If the parsed value is NaN or negative, don't update
    if (isNaN(newValue) || newValue < 0) return;

    const newRange = [...priceRange] as [number, number];

    if (index === 0) {
      // Minimum value - ensure it doesn't exceed max with a small gap
      newRange[0] = Math.min(newValue, priceRange[1] - 1);
    } else {
      // Maximum value - ensure it's not less than min with a small gap
      newRange[1] = Math.max(newValue, priceRange[0] + 1);
    }

    // Ensure valid range with minimum gap
    const minGap = 1;
    if (newRange[1] - newRange[0] < minGap) {
      if (index === 0) {
        newRange[1] = newRange[0] + minGap;
      } else {
        newRange[0] = newRange[1] - minGap;
      }
    }

    // Update slider range to accommodate new values (expand if necessary)
    updateSliderRange(newRange);

    setPriceRange(newRange);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to render star ratings
  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add empty stars to make 5 stars in total
    const emptyStarsCount = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return <div className="flex">{stars}</div>;
  };

  // Function to handle image error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = bg7;
  };

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  // Function to generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <div
      className={`min-h-screen ${theme === "light"
        ? "bg-[#F7F9FC] text-[#292F36]"
        : "bg-[#1A202C] text-[#F7F9FC]"
        }`}
    >      {/* Working dual range slider styles */}
      <style>{`
        .dual-range-container {
          position: relative;
          height: 24px;
          margin: 10px 0;
        }
        
        .dual-range-slider {
          position: absolute;
          width: 100%;
          height: 24px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
          outline: none;
          pointer-events: none;
          margin: 0;
        }
        
        /* Track styling - make transparent for overlaying sliders */
        .dual-range-slider::-webkit-slider-track {
          background: transparent;
          height: 4px;
        }
        
        .dual-range-slider::-moz-range-track {
          background: transparent;
          height: 4px;
          border: none;
        }
        
        /* Thumb styling */
        .dual-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0093DE;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          pointer-events: auto;
          position: relative;
          margin-top: -8px;
        }
        
        .dual-range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0093DE;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          pointer-events: auto;
          -moz-appearance: none;
          appearance: none;
        }
        
        /* Hover effects */
        .dual-range-slider::-webkit-slider-thumb:hover {
          background: #007BB5;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .dual-range-slider::-moz-range-thumb:hover {
          background: #007BB5;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        /* Focus effects */
        .dual-range-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px rgba(0, 147, 222, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .dual-range-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 4px rgba(0, 147, 222, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        /* Z-index for proper layering */
        .dual-range-min {
          z-index: 1;
        }
        
        .dual-range-max {
          z-index: 2;
        }
        
        /* Boost min slider when values are close */
        .dual-range-min.priority {
          z-index: 3;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative py-32 mt-20 mb-8 overflow-hidden rounded-b-3xl">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `url(${bg7})`,
            backgroundPosition: "50% 50%",
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10 z-[1]"></div>

        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white rounded-full shadow-xl bg-white/20 backdrop-blur-sm">
            Vietnam Adventures
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
            Explore Our Package Tours
          </h1>
          <p className="text-xl max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            Discover handcrafted journeys through Vietnam's most breathtaking
            landscapes, vibrant cities, and cultural treasures
          </p>
        </div>
      </section>

      <div className="container px-4 py-12 mx-auto md:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-4 md:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-gray-800 bg-white shadow-md rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters Panel */}
          <div className={`${isFilterOpen || "hidden md:block"} md:w-64 lg:w-1/4 space-y-6`}>
            {/* Category Filters */}
            <div className={`p-6 rounded-2xl shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <h3 className="mb-4 text-lg font-bold">Tour Filters</h3>
              {categoriesLoading ? (
                <CategorySkeleton theme={theme} />
              ) : (
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeFilter === cat
                          ? "bg-[#0093DE] text-white"
                          : theme === "light"
                            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        }`}
                    >
                      {cat === "all"
                        ? "All Tours"
                        : cat === "featured"
                          ? "Featured"
                          : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Price Range Filter */}
            <div
              className={`p-6 rounded-2xl shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"
                }`}
            >
              <h3 className="mb-4 text-lg font-bold">Price Range</h3>

              {/* Price Display */}
              <div className="flex items-center justify-between mb-6">
                <div className={`px-3 py-2 rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-gray-700"
                  }`}>
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                </div>
                <span className="mx-2 text-sm text-gray-400">to</span>
                <div className={`px-3 py-2 rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-gray-700"
                  }`}>
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>              {/* Fixed Dual Range Slider */}
              <div className="relative mb-8">
                {/* Background track */}
                <div className={`h-1 rounded-full ${theme === "light" ? "bg-gray-200" : "bg-gray-600"
                  } relative top-3`}>
                  {/* Active range fill */}
                  <div
                    className="absolute h-1 rounded-full bg-[#0093DE]"
                    style={{
                      left: `${((priceRange[0] - sliderRange[0]) / (sliderRange[1] - sliderRange[0])) * 100
                        }%`,
                      width: `${((priceRange[1] - priceRange[0]) / (sliderRange[1] - sliderRange[0])) * 100
                        }%`,
                    }}
                  ></div>
                </div>

                {/* Dual range slider container */}
                <div className="dual-range-container">                  {/* Minimum value slider */}
                  <input
                    type="range"
                    min={sliderRange[0]}
                    max={sliderRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handleSliderChange(e, 0)}
                    className={`dual-range-slider dual-range-min ${Math.abs(priceRange[1] - priceRange[0]) < (sliderRange[1] - sliderRange[0]) * 0.1 ? 'priority' : ''
                      }`}
                  />

                  {/* Maximum value slider */}
                  <input
                    type="range"
                    min={sliderRange[0]}
                    max={sliderRange[1]}
                    value={priceRange[1]}
                    onChange={(e) => handleSliderChange(e, 1)}
                    className="dual-range-slider dual-range-max"
                  />
                </div>
              </div>{/* Min/Max Labels */}
              <div className="flex justify-between text-xs text-gray-400 mb-6">
                <span>Slider Range: ${sliderRange[0]} - ${sliderRange[1]}</span>
                {tours.length > 0 && (
                  <span>Tours: ${minPrice} - ${maxPrice}</span>
                )}
              </div>

              {/* Manual Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Min Price</label>
                  <div className="relative">
                    <span className="absolute text-sm font-medium text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
                      $
                    </span>                    <input
                      type="number"
                      min={0}
                      step={1}
                      placeholder="Min price"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceInputChange(e, 0)}
                      className={`w-full pl-8 pr-3 py-2 rounded-xl text-sm ${theme === "light"
                        ? "bg-gray-100 border-gray-200"
                        : "bg-gray-700 border-gray-600"
                        } border focus:ring-2 focus:ring-[#0093DE] focus:border-transparent transition-all duration-200`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Price</label>
                  <div className="relative">
                    <span className="absolute text-sm font-medium text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
                      $
                    </span>                    <input
                      type="number"
                      min={priceRange[0]}
                      step={1}
                      placeholder="Max price"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceInputChange(e, 1)}
                      className={`w-full pl-8 pr-3 py-2 rounded-xl text-sm ${theme === "light"
                        ? "bg-gray-100 border-gray-200"
                        : "bg-gray-700 border-gray-600"
                        } border focus:ring-2 focus:ring-[#0093DE] focus:border-transparent transition-all duration-200`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Filter - Static Option for now */}
            <div
              className={`p-6 rounded-2xl shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"
                }`}
            >
              <h3 className="mb-4 text-lg font-bold">Duration</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#0093DE] rounded"
                  />
                  <span
                    className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                  >
                    1 Day Tours
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#0093DE] rounded"
                  />
                  <span
                    className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                  >
                    2-3 Days
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#0093DE] rounded"
                  />
                  <span
                    className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                  >
                    4-7 Days
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#0093DE] rounded"
                  />
                  <span
                    className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                  >
                    8+ Days
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Controls */}
            <div className="flex flex-col gap-4 mb-8 md:flex-row">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${theme === "light" ? "bg-white" : "bg-gray-800"
                    } shadow-md focus:ring-2 focus:ring-[#0093DE] border-0`}
                />
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className={`appearance-none pl-4 pr-10 py-3 rounded-xl ${theme === "light" ? "bg-white" : "bg-gray-800"
                      } shadow-md focus:ring-2 focus:ring-[#0093DE] border-0`}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                    <option value="rating">Rating</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  className={`flex rounded-xl overflow-hidden shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"
                    }`}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 ${viewMode === "grid" ? "bg-[#0093DE] text-white" : ""
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 ${viewMode === "list" ? "bg-[#0093DE] text-white" : ""
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p
                className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
              >
                Showing{" "}
                <span className="font-semibold">{currentTours.length}</span>{" "}
                tours
              </p>
            </div>

            {/* Tour Results */}
            {filteredTours.length === 0 ? (
              <div
                className={`p-8 rounded-2xl text-center ${theme === "light" ? "bg-white" : "bg-gray-800"
                  } shadow-md`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-bold">No tours found</h3>
                <p
                  className={`${theme === "light" ? "text-gray-600" : "text-gray-400"
                    } mb-4`}
                >
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchQuery("");
                    setPriceRange([minPrice, maxPrice]);
                  }}
                  className="px-4 py-2 bg-[#0093DE] text-white rounded-xl hover:bg-[#007ab8] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : toursLoading ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <TourCardSkeleton key={i} theme={theme} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <TourListSkeleton key={i} theme={theme} />
                  ))}
                </div>
              )
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentTours.map((tour) => (
                  <div
                    key={tour.id}
                    className={`rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme === "light" ? "bg-white" : "bg-gray-800"
                      }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        onError={handleImageError}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      />
                      {tour.featured && (
                        <div className="absolute top-3 left-3 bg-[#0093DE] text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-white/90 text-[#0093DE] text-sm font-bold px-3 py-1 rounded-full">
                        ${tour.price}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold">{tour.name}</h3>
                        <div className="flex items-center">
                          <span className="mr-1 text-sm font-medium">
                            {tour.rating}
                          </span>
                          {renderStars(tour.rating)}
                        </div>
                      </div>

                      <div className="flex items-center mb-3 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#0093DE] mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span
                          className={`${theme === "light"
                            ? "text-gray-600"
                            : "text-gray-400"
                            }`}
                        >
                          {tour.location}
                        </span>
                      </div>

                      <div className="flex items-center mb-4 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#0093DE] mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span
                          className={`${theme === "light"
                            ? "text-gray-600"
                            : "text-gray-400"
                            }`}
                        >
                          {tour.duration}
                        </span>
                      </div>

                      <p
                        className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"
                          } mb-4 line-clamp-2`}
                      >
                        {tour.description}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          to={`/tour/${tour.id}`}
                          className="flex-1 px-4 py-2 font-medium text-center text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-xl"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() =>
                            navigate("/booking", {
                              state: {
                                selectedTour: tour,
                                prefilledGuests: 2,
                              },
                            })
                          }
                          className="flex-1 bg-[#0093DE] hover:bg-[#007ab8] text-white font-medium py-2 px-4 rounded-xl transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {currentTours.map((tour) => (
                  <div
                    key={tour.id}
                    className={`flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme === "light" ? "bg-white" : "bg-gray-800"
                      }`}
                  >
                    <div className="relative h-48 overflow-hidden md:w-1/3 md:h-auto">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        onError={handleImageError}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      />
                      {tour.featured && (
                        <div className="absolute top-3 left-3 bg-[#0093DE] text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col p-6 md:w-2/3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold">{tour.name}</h3>
                        <div className="flex items-center">
                          <span className="mr-1 text-sm font-medium">
                            {tour.rating}
                          </span>
                          {renderStars(tour.rating)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#0093DE] mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span
                            className={`${theme === "light"
                              ? "text-gray-600"
                              : "text-gray-400"
                              }`}
                          >
                            {tour.location}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#0093DE] mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span
                            className={`${theme === "light"
                              ? "text-gray-600"
                              : "text-gray-400"
                              }`}
                          >
                            {tour.duration}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#0093DE] mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          <span className="font-medium text-[#0093DE]">
                            ${tour.price}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"
                          } mb-4 flex-grow`}
                      >
                        {tour.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <span
                            className={`text-xs ${theme === "light"
                              ? "text-gray-500"
                              : "text-gray-400"
                              } mr-2`}
                          >
                            Category:
                          </span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#0093DE]/10 text-[#0093DE]">
                            {tour.category || "General"}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to={`/tour/${tour.id}`}
                            className="px-4 py-2 font-medium text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-xl"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() =>
                              navigate("/booking", {
                                state: {
                                  selectedTour: tour,
                                  prefilledGuests: 2,
                                },
                              })
                            }
                            className="bg-[#0093DE] hover:bg-[#007ab8] text-white font-medium py-2 px-4 rounded-xl transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination - Static for now */}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center h-10 w-10 rounded-lg ${theme === "light" ? "bg-white" : "bg-gray-800"
                      } shadow-md shadow-gray-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {getPageNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`flex items-center justify-center h-10 w-10 rounded-lg shadow-md shadow-gray-400 ${currentPage === pageNumber
                        ? "bg-[#0093DE] text-white"
                        : theme === "light"
                          ? "bg-white text-gray-700 hover:bg-gray-100"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center h-10 w-10 rounded-lg ${theme === "light" ? "bg-white" : "bg-gray-800"
                      } shadow-md shadow-gray-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageTours;
