import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTours } from '../contexts/ToursContext';
import { useTheme } from '../contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, Users, Calendar as CalendarIcon2, CheckCircle, Star, Heart, Share2, ChevronDown, ChevronRight, Info, AlertCircle, Loader2 } from 'lucide-react';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getTourById } = useTours();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [] = useState('overview');
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [isBooking] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const tour = getTourById(id || '');
  
  useEffect(() => {
    if (tour) {
      setIsLoading(false);
    } else {
      // If tour not found, set a timeout to simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [tour]);

  const handleBookNow = () => {
    // Navigate to booking page with tour information
    navigate(`/booking?tourId=${id}`, { 
      state: { 
        selectedTour: tour,
        prefilledDate: date,
        prefilledGuests: guests
      } 
    });
  };
  
  // Prepare itinerary data from tour or use sample data
  const itinerary = tour?.itinerary && tour.itinerary.length > 0 
    ? tour.itinerary.map((item) => ({
        day: parseInt(item.day),
        title: `Day ${item.day}`,
        description: item.activities,
        activities: [item.activities] // Convert single activity string to array
      }))
    : [
        {
          day: 1,
          title: "Arrival & Welcome",
          description: "Arrive in Vietnam and transfer to your hotel. Enjoy a welcome dinner with your tour group and guide.",
          activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"]
        },
        {
          day: 2,
          title: "City Exploration",
          description: "Explore the vibrant streets and cultural landmarks of the city. Visit historical sites and enjoy local cuisine.",
          activities: ["Morning market visit", "Historical site tour", "Street food experience"]
        },
        {
          day: 3,
          title: "Nature & Adventure",
          description: "Journey to the countryside for a day of natural beauty and adventure activities in Vietnam's stunning landscapes.",
          activities: ["Countryside excursion", "Hiking", "Traditional village visit"]
        },
        {
          day: 4,
          title: "Cultural Immersion",
          description: "Immerse yourself in Vietnamese culture with traditional craft workshops and cultural performances.",
          activities: ["Craft workshop", "Cultural performance", "Local family dinner"]
        },
        {
          day: 5,
          title: "Departure Day",
          description: "Final day to shop for souvenirs and prepare for departure. Transfer to airport for your flight home.",
          activities: ["Souvenir shopping", "Farewell lunch", "Airport transfer"]
        }
      ];
  
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "March 15, 2025",
      comment: "This tour exceeded all my expectations! Our guide was incredibly knowledgeable about Vietnamese culture and history. The itinerary was perfectly balanced between activities and free time.",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "February 22, 2025",
      comment: "Great experience overall. The accommodations were comfortable and the food was amazing. I would have liked a bit more time at some of the historical sites.",
      avatar: "https://i.pravatar.cc/150?img=69"
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      date: "January 10, 2025",
      comment: "An unforgettable journey through Vietnam! The local experiences arranged by the tour company were authentic and meaningful. I'll cherish the memories forever.",
      avatar: "https://i.pravatar.cc/150?img=47"
    }
  ];
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-8 md:px-12 py-16 mt-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
          <div className="mb-6 relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#0093DE] border-r-[#64A86B] border-b-[#0093DE] border-l-[#0093DE] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-[#0093DE] animate-spin animation-delay-200"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 relative">Loading your Vietnam journey...</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">If this message persists, the tour may not exist.</p>
          <Link 
            to="/package-tours" 
            className="mt-6 inline-block bg-[#0093DE] hover:bg-[#007ab8] text-white font-bold py-3 px-6 rounded-xl transition-colors transform hover:-translate-y-1 hover:shadow-lg duration-300"
          >
            Explore Other Vietnamese Adventures
          </Link>
        </div>
      </div>
    );
  }
  
  if (!tour) {
    return (
      <div className="container mx-auto px-8 md:px-12 py-16 mt-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 max-w-lg">
          <div className="mb-6 text-[#E4784D] mx-auto">
            <AlertCircle size={64} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Tour Not Found</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            We couldn't find the tour you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" className="bg-[#0093DE] hover:bg-[#007ab8]">
              <Link to="/package-tours">Browse All Tours</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} pt-20`}>
      {/* Hero Section */}
      <div 
        className="w-full h-[60vh] bg-cover bg-center relative mb-8"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                  {tour.category || 'Vietnam Tour'}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tour.name}</h1>
                <div className="flex items-center text-white text-xl">
                  <MapPin className="h-5 w-5 mr-2 text-[#0093DE]" />
                  <p>{tour.location}, Vietnam</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="bg-[#0093DE] text-white px-6 py-4 rounded-xl text-2xl font-bold shadow-lg transform transition-transform hover:scale-105">
                  ${tour.price} <span className="text-sm font-normal">/ person</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Tour Overview</CardTitle>
                    <CardDescription>Experience the beauty and culture of Vietnam</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">{tour.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <Clock className="h-6 w-6 text-[#0093DE] mb-2" />
                        <h3 className="font-semibold text-sm mb-0.5">Duration</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tour.duration}</p>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-xl bg-[#0093DE]/5 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <Users className="h-6 w-6 text-[#64A86B] mb-2" />
                        <h3 className="font-semibold text-sm mb-1">Group Size</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Max {tour.maxGroupSize || 12} travelers</p>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-xl bg-[#0093DE]/5 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <CalendarIcon2 className="h-6 w-6 text-[#0093DE] mb-2" />
                        <h3 className="font-semibold text-sm mb-1">Languages</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tour.languages || 'English, Vietnamese'}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#0093DE]/10 rounded-full mr-2">
                          <CheckCircle className="h-4 w-4 text-[#0093DE]" />
                        </span>
                        Vietnamese Experience Highlights
                      </h3>
                      <ul className="list-none pl-6 mb-6 space-y-3">
                        {tour.highlights && tour.highlights.length > 0 ? (
                          tour.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                            </li>
                          ))
                        ) : (
                          // Default highlights if none are provided
                          <>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Experience the unique culture and landscapes of {tour.location} with local insight</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Authentic Vietnamese cuisine with regional specialties</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Professional guides with extensive Vietnamese cultural knowledge</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Carefully curated itinerary to maximize your Vietnamese experience</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Comfortable accommodations in beautiful Vietnamese settings</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center mt-6">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#64A86B]/10 rounded-full mr-2">
                          <Info className="h-4 w-4 text-[#64A86B]" />
                        </span>
                        What to Bring
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {tour.whatToBring && tour.whatToBring.length > 0 ? (
                          tour.whatToBring.map((item, index) => (
                            <li key={index} className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#0093DE]" />
                              <span className="text-gray-600 dark:text-gray-300">{item}</span>
                            </li>
                          ))
                        ) : (
                          // Default items if no specific items are provided
                          <>
                            <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#0093DE]" />
                              <span className="text-gray-600 dark:text-gray-300">Valid passport</span>
                            </li>
                            <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#0093DE]" />
                              <span className="text-gray-600 dark:text-gray-300">Local currency (VND)</span>
                            </li>
                            <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#0093DE]" />
                              <span className="text-gray-600 dark:text-gray-300">Travel insurance</span>
                            </li>
                            <li className="flex items-center py-2 px-3 rounded-xl bg-[#0093DE]/5 dark:bg-gray-700">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#0093DE]" />
                              <span className="text-gray-600 dark:text-gray-300">Camera</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#64A86B]/10 rounded-full mr-2">
                          <CheckCircle className="h-4 w-4 text-[#64A86B]" />
                        </span>
                        What's Included
                      </h3>
                      <ul className="list-none pl-6 mb-6 space-y-3">
                        {tour.included && tour.included.length > 0 ? (
                          tour.included.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">{item}</span>
                            </li>
                          ))
                        ) : (
                          // Default included items if none are provided
                          <>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Professional tour guide</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Transportation during tour</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-[#64A86B] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">Entrance fees to attractions</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="itinerary">
                <Card>
                  <CardHeader>
                    <CardTitle>Tour Itinerary</CardTitle>
                    <CardDescription>Day-by-day plan for your Vietnamese adventure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {itinerary.slice(0, showFullItinerary ? itinerary.length : 3).map((day, index) => (
                        <div key={index} className="relative pl-8 pb-8">
                          <div className="absolute left-0 top-0 h-full w-0.5 bg-[#0093DE]/20"></div>
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#0093DE]"></div>
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                              <h3 className="text-lg font-bold flex items-center">
                                <Badge className="mr-2 bg-[#0093DE]">Day {day.day}</Badge>
                                {day.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{day.description}</p>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                              <h4 className="font-medium text-sm mb-2 text-gray-500 dark:text-gray-400">Today's Activities:</h4>
                              <ul className="space-y-2">
                                {day.activities.map((activity, actIndex) => (
                                  <li key={actIndex} className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-[#64A86B] mr-2" />
                                    <span className="text-sm">{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {itinerary.length > 3 && (
                      <div className="text-center mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowFullItinerary(!showFullItinerary)}
                          className="group"
                        >
                          {showFullItinerary ? (
                            <>Show Less <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" /></>
                          ) : (
                            <>Show Full Itinerary <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>See what others are saying about this tour</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                          <div className="flex items-start">
                            <img 
                              src={review.avatar} 
                              alt={review.name} 
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="font-bold">{review.name}</h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                              </div>
                              <div className="flex mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <Button variant="outline">
                        View All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Card className="shadow-lg border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Book This Tour</CardTitle>
                  <CardDescription>Secure your spot today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Price per person</span>
                      <span>${tour.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of guests</span>
                      <span>x {guests}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${tour.price * guests}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    className="w-full bg-[#0093DE] hover:bg-[#007ab8]" 
                    size="lg"
                    onClick={handleBookNow}
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Book Now'
                    )}
                  </Button>
                  
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${isWishlisted ? 'bg-pink-50 text-pink-600 border-pink-200' : ''}`}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-pink-600' : ''}`} />
                      {isWishlisted ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">Have questions about this tour? Our travel experts are ready to assist you.</p>
                  <Button variant="link" className="p-0 h-auto text-[#0093DE]">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
