import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import SEOBreadcrumb from '../components/SEOBreadcrumb';
const BookingConfirmation = () => {
  const { theme, colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasValidBooking, setHasValidBooking] = useState(false);
  const [storedBookingData, setStoredBookingData] = useState(null);
  const [storedTour, setStoredTour] = useState(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Get booking details from location state
  const { bookingData, tour, bookingReference: apiBookingReference } = location.state || {};

  // Check if user has valid booking data (from navigation state or localStorage)
  useEffect(() => {
    // First check if we have fresh booking data from navigation
    if (bookingData && tour) {
      setHasValidBooking(true);
      // Save booking data to localStorage for future access
      const bookingInfo = {
        bookingData,
        tour,
        timestamp: new Date().toISOString(),
        bookingReference: apiBookingReference || `VN-${Math.floor(100000 + Math.random() * 900000)}`
      };
      localStorage.setItem('lastBookingConfirmation', JSON.stringify(bookingInfo));

      // Clear the location state after component mounts to prevent reloads from showing data
      const clearStateTimer = setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 1000);

      return () => clearTimeout(clearStateTimer);
    } else {
      // Check localStorage for previous booking data
      const storedBooking = localStorage.getItem('lastBookingConfirmation');
      if (storedBooking) {
        try {
          const bookingInfo = JSON.parse(storedBooking);
          const bookingDate = new Date(bookingInfo.timestamp);
          const now = new Date();
          const hoursDiff = (now.getTime() - bookingDate.getTime()) / (1000 * 60 * 60);

          // Allow access to confirmation page for 24 hours after booking
          if (hoursDiff < 24) {
            setHasValidBooking(true);
            setStoredBookingData(bookingInfo.bookingData);
            setStoredTour(bookingInfo.tour);
            return;
          } else {
            // Remove expired booking data
            localStorage.removeItem('lastBookingConfirmation');
          }
        } catch (error) {
          // Remove corrupted booking data
          localStorage.removeItem('lastBookingConfirmation');
        }
      }

      // No valid booking data - redirect immediately to booking page
      navigate('/booking', { replace: true });
    }
  }, [bookingData, tour, navigate]);

  // If no valid booking data, return null (redirect is handled in useEffect)
  if (!hasValidBooking) {
    return null;
  }

  const bookingDetails = {
    tourId: (tour || storedTour)?.id || 'unknown',
    tourName: (tour || storedTour)?.name || 'Tour Package',
    date: (bookingData || storedBookingData)?.departureDate || new Date(),
    guests: (bookingData || storedBookingData)?.numberOfTravelers || 2,
    totalPrice: ((tour || storedTour)?.price * ((bookingData || storedBookingData)?.numberOfTravelers || 1)) || 299,
    contactName: (bookingData || storedBookingData) ? `${(bookingData || storedBookingData).contactFirstName} ${(bookingData || storedBookingData).contactLastName}` : 'Guest',
    email: (bookingData || storedBookingData)?.email || 'guest@example.com'
  };

  // Generate booking reference (try to use stored one first)
  const getBookingReference = () => {
    const storedBooking = localStorage.getItem('lastBookingConfirmation');
    if (storedBooking) {
      try {
        const bookingInfo = JSON.parse(storedBooking);
        return bookingInfo.bookingReference;
      } catch (error) {
        // Fallback to generating new one
      }
    }
    return `VN-${Math.floor(100000 + Math.random() * 900000)}`;
  };


  return (
    <>
      <SEO
        title="Booking Confirmation - Leo Loves Travel"
        description="Your Vietnam tour booking confirmation. Review your booking details and download your receipt."
        keywords="booking confirmation, Vietnam tour receipt, travel booking"
      />      <SEOBreadcrumb
        items={[
          { name: 'Home', path: '/' },
          { name: 'Booking', path: '/booking' },
          { name: 'Confirmation', path: '/booking-confirmation' }
        ]}
      />        <div
        className="min-h-screen pt-8 pb-6 relative"
        style={{
          backgroundColor: theme === 'light' ? colors.background : colors.background,
          color: theme === 'light' ? colors.text : colors.text
        }}
      >        <div className="flex justify-center px-4 relative z-10">
          <div className="w-full max-w-6xl mx-auto">{/* Main Receipt Card - Using blue theme colors */}
            <Card
              ref={receiptRef}
              className="shadow-2xl border-0 rounded-3xl backdrop-blur-xl overflow-hidden hover:shadow-3xl transition-all duration-500"
              style={{
                backgroundColor: theme === 'light' ? `${colors.surface}f0` : `${colors.surface}f0`,
                backdropFilter: 'blur(16px)'
              }}
            ><CardHeader
              className="text-white rounded-t-3xl py-4 px-6 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, #0093DE, #3B82F6, #1E40AF)` }}
            >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="text-left">
                    <CardTitle className="text-xl font-bold text-white tracking-wide mb-1 drop-shadow-lg">
                      BOOKING INFORMATION
                    </CardTitle>
                    <p className="text-white/90 text-sm font-medium">Leo Loves Travel</p>
                  </div>                  <div className="text-left md:text-right">
                    <CardDescription className="text-white text-lg font-bold bg-white/20 inline-block px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
                      #{getBookingReference()}
                    </CardDescription>
                    <p className="text-white/80 text-xs mt-2 flex items-center md:justify-end">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date().toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>              <CardContent className="p-6">

                {/* ENTIRE RECEIPT - 2 COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* LEFT COLUMN - Customer Information + Pending Status */}
                  <div className="space-y-4">
                    {/* Customer Details */}
                    <div
                      className="rounded-2xl p-4 border-2 shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: theme === 'light' ? `${colors.surface}cc` : `${colors.surface}cc`,
                        borderColor: theme === 'light' ? `#0093DE40` : `#0093DE60`
                      }}
                    >

                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className="p-2 rounded-xl shadow-lg"
                          style={{ background: `linear-gradient(135deg, #0093DE, #3B82F6)` }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>                        <div>
                          <h3 className="text-lg font-bold" style={{ color: colors.text }}>Customer Information</h3>
                          <p className="text-sm" style={{ color: colors.muted }}>Your booking details</p>
                        </div>
                      </div>                      {/* Customer Info Cards */}
                      <div className="space-y-2">
                        <div
                          className="p-3 rounded-2xl border-2 shadow-md backdrop-blur-sm"
                          style={{
                            backgroundColor: theme === 'light' ? `${colors.surface}e6` : `${colors.surface}e6`,
                            borderColor: theme === 'light' ? `${colors.primary}30` : `${colors.primary}50`
                          }}
                        ><div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.muted }}>Full Name</span>
                              <p className="text-sm font-bold" style={{ color: colors.text }}>{bookingDetails.contactName}</p>
                            </div>
                            <div>
                              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.muted }}>Email</span>
                              <p className="text-sm font-medium truncate" style={{ color: colors.text }}>{bookingDetails.email}</p>
                            </div>
                            {(bookingData || storedBookingData)?.phone && (
                              <div>
                                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.muted }}>Phone</span>
                                <p className="text-sm font-bold" style={{ color: colors.text }}>{(bookingData || storedBookingData).phone}</p>
                              </div>
                            )}
                            {(bookingData || storedBookingData)?.address && (
                              <div className={`${(bookingData || storedBookingData)?.phone ? '' : 'md:col-span-2'}`}>
                                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.muted }}>Address</span>
                                <p className="text-sm font-medium" style={{ color: colors.text }}>{(bookingData || storedBookingData).address}</p>
                              </div>
                            )}
                          </div>
                        </div>                        {/* Travel Details */}
                        <div
                          className="p-3 rounded-xl border-2 shadow-sm backdrop-blur-sm"
                          style={{
                            backgroundColor: theme === 'light' ? `${colors.surface}e6` : `${colors.surface}e6`,
                            borderColor: theme === 'light' ? `${colors.primary}30` : `${colors.primary}50`
                          }}
                        >                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div
                              className="flex justify-between items-center p-2 rounded-xl border-2"
                              style={{
                                backgroundColor: `#0093DE10`,
                                borderColor: `#0093DE30`
                              }}
                            >
                              <span className="font-medium" style={{ color: colors.text }}>Departure:</span>
                              <span className="font-bold" style={{ color: '#0093DE' }}>
                                {bookingDetails.date instanceof Date
                                  ? bookingDetails.date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })
                                  : 'TBD'}
                              </span>
                            </div>

                            <div
                              className="flex justify-between items-center p-2 rounded-xl border-2"
                              style={{
                                backgroundColor: `#3B82F610`,
                                borderColor: `#3B82F630`
                              }}
                            >
                              <span className="font-medium" style={{ color: colors.text }}>Travelers:</span>
                              <span className="font-bold" style={{ color: '#3B82F6' }}>{bookingDetails.guests}</span>
                            </div>

                            {(bookingData || storedBookingData)?.returnDate && (
                              <div
                                className="flex justify-between items-center p-2 rounded-xl border-2 col-span-2"
                                style={{
                                  backgroundColor: `#1E40AF10`,
                                  borderColor: `#1E40AF30`
                                }}
                              >
                                <span className="font-medium" style={{ color: colors.text }}>Return:</span>
                                <span className="font-bold" style={{ color: '#1E40AF' }}>
                                  {(bookingData || storedBookingData).returnDate instanceof Date
                                    ? (bookingData || storedBookingData).returnDate.toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })
                                    : new Date((bookingData || storedBookingData).returnDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Traveler Information - Compact */}
                      {(bookingData || storedBookingData)?.travelers && (bookingData || storedBookingData).travelers.length > 0 && (<div className="mt-4 pt-3 border-t" style={{ borderColor: `#0093DE30` }}>
                        <h4 className="text-sm font-bold mb-2" style={{ color: colors.text }}>Travelers</h4>
                        <div className="space-y-2">                            {(bookingData || storedBookingData).travelers.map((traveler: any, index: number) => (
                          <div
                            key={index}
                            className="border-2 rounded-xl p-3 text-sm shadow-sm"
                            style={{
                              backgroundColor: `#0093DE08`,
                              borderColor: `#0093DE30`
                            }}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold" style={{ color: '#0093DE' }}>Traveler {index + 1}</span>
                            </div>
                            <div className="space-y-1">
                              {(traveler.firstName || traveler.lastName) && (
                                <p><span className="font-medium" style={{ color: colors.muted }}>Name:</span> <span style={{ color: colors.text }}>{traveler.firstName} {traveler.lastName}</span></p>
                              )}
                              {traveler.nationality && (
                                <p><span className="font-medium" style={{ color: colors.muted }}>Nationality:</span> <span style={{ color: colors.text }}>{traveler.nationality}</span></p>
                              )}
                              {traveler.dateOfBirth && (
                                <p><span className="font-medium" style={{ color: colors.muted }}>DOB:</span> <span style={{ color: colors.text }}>
                                  {traveler.dateOfBirth instanceof Date
                                    ? traveler.dateOfBirth.toLocaleDateString()
                                    : new Date(traveler.dateOfBirth).toLocaleDateString()}
                                </span></p>
                              )}
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>
                      )}

                      {/* Special Requirements - Compact */}
                      {((bookingData || storedBookingData)?.specialRequests ||
                        (bookingData || storedBookingData)?.dietaryRestrictions ||
                        (bookingData || storedBookingData)?.medicalConditions) && (<div className="mt-4 pt-3 border-t" style={{ borderColor: `#0093DE30` }}>
                          <h4 className="text-sm font-bold mb-2" style={{ color: colors.text }}>Special Requirements</h4>
                          <div className="space-y-2 text-sm">                            {(bookingData || storedBookingData)?.specialRequests && (
                            <div
                              className="border-2 rounded-xl p-3 shadow-sm"
                              style={{
                                backgroundColor: `#0093DE08`,
                                borderColor: `#0093DE30`
                              }}
                            >
                              <p className="font-bold mb-1" style={{ color: '#0093DE' }}>Special Requests</p>
                              <p className="leading-relaxed" style={{ color: colors.text }}>
                                {(bookingData || storedBookingData).specialRequests}
                              </p>
                            </div>
                          )}
                            {(bookingData || storedBookingData)?.dietaryRestrictions && (
                              <div
                                className="border-2 rounded-xl p-3 shadow-sm"
                                style={{
                                  backgroundColor: `#3B82F608`,
                                  borderColor: `#3B82F630`
                                }}
                              >
                                <p className="font-bold mb-1" style={{ color: '#3B82F6' }}>Dietary Restrictions</p>
                                <p className="leading-relaxed" style={{ color: colors.text }}>
                                  {(bookingData || storedBookingData).dietaryRestrictions}
                                </p>
                              </div>
                            )}

                            {(bookingData || storedBookingData)?.medicalConditions && (
                              <div
                                className="border-2 rounded-xl p-3 shadow-sm"
                                style={{
                                  backgroundColor: `#1E40AF08`,
                                  borderColor: `#1E40AF30`
                                }}
                              >
                                <p className="font-bold mb-1" style={{ color: '#1E40AF' }}>Medical Conditions</p>
                                <p className="leading-relaxed" style={{ color: colors.text }}>
                                  {(bookingData || storedBookingData).medicalConditions}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        )}
                    </div>
                    {/* Booking Status - Pending Summary */}
                    <div
                      className="rounded-2xl p-4 border-2 shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: theme === 'light' ? `${colors.surface}cc` : `${colors.surface}cc`,
                        borderColor: theme === 'light' ? `#0EA5E940` : `#0EA5E960`
                      }}
                    >

                      <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                          <div
                            className="p-3 rounded-full shadow-lg animate-pulse"
                            style={{ background: `linear-gradient(135deg, #0EA5E9, #0093DE)` }}
                          >
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                        </div>

                        <div
                          className="rounded-xl p-4 shadow-lg border backdrop-blur-sm"
                          style={{
                            backgroundColor: theme === 'light' ? `${colors.surface}e6` : `${colors.surface}e6`,
                            borderColor: theme === 'light' ? `#0EA5E930` : `#0EA5E950`
                          }}
                        >                          <div className="mb-3">
                            <h3 className="text-lg font-bold mb-1" style={{ color: '#0EA5E9' }}>
                              ⏳ PENDING PAYMENT
                            </h3>
                            <p className="text-sm" style={{ color: colors.muted }}>Your booking is being processed</p>
                          </div>

                          <div
                            className="space-y-2 rounded-lg p-3 border text-sm"
                            style={{
                              backgroundColor: `#0EA5E908`,
                              borderColor: `#0EA5E930`
                            }}
                          >
                            <p className="font-medium" style={{ color: colors.text }}>
                              📧 Request sent to info@dldv.nl
                            </p>
                            <p className="font-medium" style={{ color: colors.text }}>
                              ⏰ Contact within 24 hours
                            </p>
                            <p className="font-medium" style={{ color: colors.text }}>
                              🔒 Payment after confirmation
                            </p>

                            <div className="pt-2 border-t" style={{ borderColor: `#0EA5E930` }}>
                              <p
                                className="font-medium rounded-lg px-2 py-1 inline-block"
                                style={{
                                  color: colors.muted,
                                  backgroundColor: theme === 'light' ? `${colors.surface}cc` : `${colors.surface}cc`
                                }}
                              >
                                Ref: <span className="font-bold" style={{ color: '#0EA5E9' }}>#{getBookingReference()}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>                  {/* RIGHT COLUMN - Tour Image (Expanded) + Payment Summary */}
                  <div className="space-y-4">
                    {/* Tour Information Section with Expanded Image */}
                    <div
                      className="rounded-2xl p-4 border-2 shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: theme === 'light' ? `${colors.surface}cc` : `${colors.surface}cc`,
                        borderColor: theme === 'light' ? `#0093DE40` : `#0093DE60`
                      }}
                    >
                      {/* Tour Image - Expanded and Larger */}
                      <div
                        className="w-full h-80 rounded-xl overflow-hidden shadow-lg border mb-4"
                        style={{
                          backgroundColor: theme === 'light' ? colors.surfaceHover : colors.surface,
                          borderColor: theme === 'light' ? `${colors.primary}40` : `${colors.primary}60`
                        }}
                      >
                        {(tour || storedTour)?.image ? (
                          <img
                            src={(tour || storedTour).image}
                            alt={bookingDetails.tourName}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTUwIDEwMEM1My43MjU4IDEwMCA3NSA2MCA3NSA2MEM3NSA2MCA5Ni4yNzQyIDEwMCAxNTAgMTAwWiIgZmlsbD0iI0Q1RDlERCIvPjwvc3ZnPg==';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <MapPin className="h-12 w-12 mx-auto mb-3" style={{ color: colors.primary }} />
                              <p style={{ color: colors.primary }} className="font-medium text-lg">Tour Image</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tour Details */}
                      <div
                        className="rounded-xl p-4 shadow-lg border backdrop-blur-sm"
                        style={{
                          backgroundColor: theme === 'light' ? `${colors.surface}e6` : `${colors.surface}e6`,
                          borderColor: theme === 'light' ? `${colors.primary}30` : `${colors.primary}50`
                        }}
                      >
                        <h2
                          className="text-xl mb-3 font-bold tracking-tight text-center"
                          style={{ color: colors.text }}
                        >
                          {bookingDetails.tourName}
                        </h2>

                        <div className="flex flex-wrap gap-2 justify-center">
                          {(tour || storedTour)?.duration && (
                            <div
                              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
                              style={{
                                backgroundColor: `#0093DE15`,
                                borderColor: `#0093DE40`
                              }}
                            >
                              <Clock className="h-4 w-4" style={{ color: '#0093DE' }} />
                              <span className="text-sm font-semibold" style={{ color: '#0093DE' }}>
                                {(tour || storedTour).duration}
                              </span>
                            </div>
                          )}

                          {(tour || storedTour)?.location && (
                            <div
                              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
                              style={{
                                backgroundColor: `#3B82F615`,
                                borderColor: `#3B82F640`
                              }}
                            >
                              <MapPin className="h-4 w-4" style={{ color: '#3B82F6' }} />
                              <span className="text-sm font-semibold" style={{ color: '#3B82F6' }}>
                                {(tour || storedTour).location}
                              </span>
                            </div>
                          )}

                          <div
                            className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
                            style={{
                              backgroundColor: `#1E40AF15`,
                              borderColor: `#1E40AF40`
                            }}
                          >
                            <svg className="h-4 w-4" style={{ color: '#1E40AF' }} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold" style={{ color: '#1E40AF' }}>
                              {bookingDetails.date instanceof Date
                                ? bookingDetails.date.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                                : 'To Be Determined'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>                    {/* Payment Summary */}
                    <div
                      className="rounded-2xl p-4 border-2 shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: theme === 'light' ? `${colors.surface}cc` : `${colors.surface}cc`,
                        borderColor: theme === 'light' ? `#0093DE40` : `#0093DE60`
                      }}
                    >

                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className="p-2 rounded-xl shadow-lg"
                          style={{ background: `linear-gradient(135deg, #0093DE, #3B82F6)` }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>                        <div>
                          <h3 className="text-lg font-bold" style={{ color: colors.text }}>Cost Summary</h3>
                          <p className="text-sm" style={{ color: colors.muted }}>Tour pricing breakdown</p>
                        </div>
                      </div>

                      <div
                        className="rounded-xl p-3 shadow-lg border backdrop-blur-sm"
                        style={{
                          backgroundColor: theme === 'light' ? `${colors.surface}e6` : `${colors.surface}e6`,
                          borderColor: theme === 'light' ? `${colors.primary}30` : `${colors.primary}50`
                        }}
                      >
                        <div className="space-y-2 text-sm">

                          <div
                            className="flex justify-between items-center p-2 rounded-lg border"
                            style={{
                              backgroundColor: `#E0F2FE08`,
                              borderColor: `#0284C730`
                            }}
                          >
                            <span className="font-medium" style={{ color: colors.text }}>Tour Price (per person):</span>
                            <span className="font-bold" style={{ color: colors.text }}>${(bookingDetails.totalPrice / bookingDetails.guests).toFixed(2)}</span>
                          </div>

                          <div
                            className="flex justify-between items-center p-2 rounded-lg border"
                            style={{
                              backgroundColor: `#0093DE08`,
                              borderColor: `#0093DE30`
                            }}
                          >
                            <span className="font-medium" style={{ color: colors.text }}>Number of Travelers:</span>
                            <span className="font-bold" style={{ color: '#0093DE' }}>× {bookingDetails.guests}</span>
                          </div>

                          <div
                            className="flex justify-between items-center p-2 rounded-lg border"
                            style={{
                              backgroundColor: `#3B82F608`,
                              borderColor: `#3B82F630`
                            }}
                          >
                            <span className="font-medium" style={{ color: colors.text }}>Subtotal:</span>
                            <span className="font-bold" style={{ color: '#3B82F6' }}>${bookingDetails.totalPrice.toFixed(2)}</span>
                          </div>

                          <div
                            className="flex justify-between items-center p-2 rounded-lg border"
                            style={{
                              backgroundColor: `#1E40AF08`,
                              borderColor: `#1E40AF30`
                            }}
                          >
                            <span className="font-medium" style={{ color: colors.text }}>Service Fees:</span>                              <span
                              className="font-bold px-2 py-1 rounded text-sm"
                              style={{
                                color: '#1E40AF',
                                backgroundColor: `#1E40AF20`
                              }}
                            >
                              FREE
                            </span>
                          </div>

                          <div className="border-t pt-2 mt-3" style={{ borderColor: `#0093DE40` }}>
                            <div
                              className="flex justify-between items-center p-3 rounded-xl border-2 shadow-md"
                              style={{
                                backgroundColor: `#0093DE10`,
                                borderColor: `#0093DE40`
                              }}
                            >
                              <span className="text-base font-bold" style={{ color: colors.text }}>TOTAL AMOUNT:</span>
                              <span
                                className="text-lg font-bold px-3 py-1 rounded-lg shadow-sm"
                                style={{
                                  color: '#0093DE',
                                  backgroundColor: theme === 'light' ? `${colors.surface}e6` : `${colors.surface}e6`
                                }}
                              >
                                ${bookingDetails.totalPrice.toFixed(2)} USD
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>              {/* Action Buttons - Aligned with content */}
              <div
                className="rounded-b-3xl border-t"
                style={{
                  backgroundColor: theme === 'light' ? `${colors.surface}f0` : `${colors.surface}f0`,
                  borderColor: theme === 'light' ? `#0093DE30` : `#0093DE50`
                }}
              >
                <div className="p-6">
                  {/* Thank You Message */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                      🎉 Thank You for Choosing Leo Loves Travel!
                    </h3>
                    <p className="text-lg mb-1" style={{ color: colors.primary }}>
                      Your booking request has been submitted successfully
                    </p>
                    <p className="text-sm" style={{ color: colors.muted }}>
                      Our team will contact you within 24 hours to confirm your booking
                    </p>
                  </div>

                  {/* Contact Information - Aligned */}
                  <div
                    className="mt-6 text-center rounded-2xl p-4 border-2 shadow-md max-w-2xl mx-auto"
                    style={{
                      backgroundColor: theme === 'light' ? `${colors.surface}bb` : `${colors.surface}bb`,
                      borderColor: theme === 'light' ? `#0093DE30` : `#0093DE50`
                    }}
                  >
                    <p className="text-sm mb-3 font-medium" style={{ color: colors.muted }}>Need assistance?</p>
                    <div className="flex justify-center items-center space-x-6 text-sm">
                      <a
                        href="mailto:info@leolovestravel.com"
                        className="font-semibold hover:underline transition-colors duration-200 flex items-center"
                        style={{ color: colors.primary }}
                      >
                        📧 info@leolovestravel.com
                      </a>
                      <span style={{ color: colors.muted }}>|</span>
                      <a
                        href="tel:+84865843276"
                        className="font-semibold hover:underline transition-colors duration-200 flex items-center"
                        style={{ color: colors.primary }}
                      >
                        📞 +84 865 843 276
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;
