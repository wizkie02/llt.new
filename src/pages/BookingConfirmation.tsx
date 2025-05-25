import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { CheckCircle, Calendar, MapPin, Users, CreditCard, ArrowRight, Printer, Download, Mail } from 'lucide-react';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Get booking details from location state
  const bookingDetails = location.state || {
    tourId: 'unknown',
    tourName: 'Tour Package',
    date: new Date(),
    guests: 2,
    totalPrice: 299
  };
  
  // Generate booking reference
  const bookingReference = `VN-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const handleDownloadItinerary = () => {
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      // In a real app, this would trigger a PDF download
      alert('Your itinerary has been downloaded.');
    }, 1500);
  };
  
  return (
    <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} pt-24 pb-16`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#64A86B]/20 mb-4">
            <CheckCircle className="h-8 w-8 text-[#64A86B]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for booking with Leo Loves Travel. Your Vietnamese adventure awaits!
          </p>
        </div>
        
        <Card className="mb-8 shadow-lg border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-[#0093DE] text-white rounded-t-xl">
            <CardTitle className="text-xl">Booking Details</CardTitle>
            <CardDescription className="text-white/80">
              Booking Reference: {bookingReference}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">{bookingDetails.tourName}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-[#0093DE]" />
                    <div>
                      <p className="text-sm font-medium">Tour Date</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {bookingDetails.date instanceof Date 
                          ? bookingDetails.date.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) 
                          : 'Date not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-[#0093DE]" />
                    <div>
                      <p className="text-sm font-medium">Meeting Point</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Details will be sent via email 48 hours before departure
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-[#0093DE]" />
                    <div>
                      <p className="text-sm font-medium">Number of Guests</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {bookingDetails.guests} {bookingDetails.guests === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <h3 className="font-semibold mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tour Price</span>
                    <span>${bookingDetails.totalPrice / bookingDetails.guests} x {bookingDetails.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking Fee</span>
                    <span>$0</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Paid</span>
                    <span>${bookingDetails.totalPrice}</span>
                  </div>
                  <div className="mt-4 flex items-center text-[#64A86B]">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-xs">Payment Successful</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6 rounded-b-xl flex flex-wrap gap-4">
            <Button variant="outline" className="flex-1" onClick={handleDownloadItinerary}>
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Preparing...' : 'Download Itinerary'}
            </Button>
            <Button variant="outline" className="flex-1">
              <Printer className="mr-2 h-4 w-4" />
              Print Confirmation
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex">
                <div className="mr-4 h-8 w-8 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE]">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Check Your Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We've sent a confirmation email with all the details of your booking.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 h-8 w-8 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE]">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Prepare for Your Trip</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check the tour details for what to bring and how to prepare.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 h-8 w-8 rounded-full bg-[#0093DE]/10 flex items-center justify-center text-[#0093DE]">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Enjoy Your Vietnamese Adventure!</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get ready for an unforgettable experience in Vietnam.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                If you have any questions or need to make changes to your booking, our customer service team is here to help.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-[#0093DE]" />
                  <span className="text-sm">support@leolovestravel.com</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-[#0093DE]" />
                  <span className="text-sm">For payment issues: billing@leolovestravel.com</span>
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto text-[#0093DE]">
                Visit our Help Center
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => navigate('/package-tours')}
            className="bg-[#0093DE] hover:bg-[#007ab8]"
          >
            Explore More Tours <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
