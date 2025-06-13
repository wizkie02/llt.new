import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, Download, Printer, MapPin, Clock } from 'lucide-react';

const BookingConfirmation = () => {  const navigate = useNavigate();
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasValidBooking, setHasValidBooking] = useState(false);
  const [storedBookingData, setStoredBookingData] = useState(null);
  const [storedTour, setStoredTour] = useState(null);
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
  
  const bookingReference = getBookingReference();
    // Real download function for PDF receipt
  const handleDownloadReceipt = () => {
    setIsDownloading(true);
    
    try {      // Create receipt content
      const receiptContent = `
BOOKING RECEIPT - ${bookingReference}
Leo Loves Travel
========================================

Tour: ${bookingDetails.tourName}
Customer: ${bookingDetails.contactName}
Email: ${bookingDetails.email}
${(bookingData || storedBookingData)?.phone ? `Phone: ${(bookingData || storedBookingData).phone}\n` : ''}${(bookingData || storedBookingData)?.address ? `Address: ${(bookingData || storedBookingData).address}\n` : ''}
Departure Date: ${bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString() : 'TBD'}
${(bookingData || storedBookingData)?.returnDate ? `Return Date: ${(bookingData || storedBookingData).returnDate instanceof Date ? (bookingData || storedBookingData).returnDate.toLocaleDateString() : new Date((bookingData || storedBookingData).returnDate).toLocaleDateString()}\n` : ''}Travelers: ${bookingDetails.guests}
Total: $${bookingDetails.totalPrice.toFixed(2)} USD

${(bookingData || storedBookingData)?.travelers && (bookingData || storedBookingData).travelers.length > 0 ? `
TRAVELER INFORMATION:
${(bookingData || storedBookingData).travelers.map((traveler: any, index: number) => `
Traveler ${index + 1}:
${traveler.firstName || traveler.lastName ? `  Name: ${traveler.firstName} ${traveler.lastName}\n` : ''}${traveler.nationality ? `  Nationality: ${traveler.nationality}\n` : ''}${traveler.dateOfBirth ? `  Date of Birth: ${traveler.dateOfBirth instanceof Date ? traveler.dateOfBirth.toLocaleDateString() : new Date(traveler.dateOfBirth).toLocaleDateString()}\n` : ''}`).join('\n')}
` : ''}
${((bookingData || storedBookingData)?.specialRequests || (bookingData || storedBookingData)?.dietaryRestrictions || (bookingData || storedBookingData)?.medicalConditions) ? `
SPECIAL REQUIREMENTS:
${(bookingData || storedBookingData)?.specialRequests ? `Special Requests: ${(bookingData || storedBookingData).specialRequests}\n` : ''}${(bookingData || storedBookingData)?.dietaryRestrictions ? `Dietary Restrictions: ${(bookingData || storedBookingData).dietaryRestrictions}\n` : ''}${(bookingData || storedBookingData)?.medicalConditions ? `Medical Conditions: ${(bookingData || storedBookingData).medicalConditions}\n` : ''}
` : ''}Status: ⏳ PENDING PAYMENT
Booking Date: ${new Date().toLocaleDateString()}

Booking request sent to info@dldv.nl
Our sales team will contact you within 24 hours for payment and tour details
Payment will be processed after confirmation

Contact: info@dldv.nl
Phone: +84 123 456 789
========================================
      `;
      
      // Create and download the file
      const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `BookingReceipt_${bookingReference}.txt`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  // Real print function
  const handlePrintReceipt = () => {
    try {      // Create print-friendly content with compressed CTicket style
      const printContent = `
        <html>
          <head>
            <title>Booking Receipt - ${bookingReference}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; background: #f8f9fa; }
              .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
              .header { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center; border-bottom: 2px solid #0093DE; padding-bottom: 15px; margin-bottom: 20px; }
              .header-left .title { color: #0093DE; font-size: 18px; font-weight: bold; margin: 0; }
              .header-left .company { color: #666; font-size: 12px; margin: 3px 0 0 0; }
              .header-right { text-align: right; }
              .header-right .ref { background: #0093DE; color: white; padding: 6px 12px; border-radius: 15px; font-size: 14px; font-weight: bold; display: inline-block; }
              .header-right .date { color: #666; font-size: 10px; margin-top: 3px; }
              .tour-section { display: flex; gap: 15px; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; }
              .tour-image { width: 80px; height: 50px; background: #e9ecef; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #6c757d; font-size: 20px; }
              .tour-details h2 { margin: 0 0 10px 0; color: #333; font-size: 16px; }
              .tour-badges { display: flex; gap: 8px; flex-wrap: wrap; }
              .badge { background: #e3f2fd; color: #1976d2; padding: 3px 10px; border-radius: 12px; font-size: 10px; }
              .section { margin: 15px 0; }
              .section h3 { color: #333; font-size: 14px; margin-bottom: 12px; border-bottom: 1px solid #e9ecef; padding-bottom: 6px; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
              .info-item { margin: 6px 0; }
              .label { font-weight: bold; color: #333; display: inline-block; width: 120px; font-size: 11px; }
              .value { color: #666; font-size: 11px; }
              .payment-summary { background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0; }
              .payment-row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px; }
              .total-row { border-top: 2px solid #0093DE; padding-top: 10px; margin-top: 10px; }
              .total { font-size: 14px; font-weight: bold; color: #0093DE; display: flex; justify-content: space-between; }
              .status { text-align: center; margin: 15px 0; padding: 12px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; color: #856404; font-size: 12px; }
              .footer { text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e9ecef; color: #666; font-size: 11px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-left">
                  <h1 class="title">BOOKING RECEIPT</h1>
                  <p class="company">Leo Loves Travel</p>
                </div>
                <div class="header-right">
                  <div class="ref">#${bookingReference}</div>
                  <div class="date">${new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                </div>
              </div>
              
              <div class="tour-section">
                <div class="tour-image">📍</div>
                <div class="tour-details">
                  <h2>${bookingDetails.tourName}</h2>
                  <div class="tour-badges">
                    ${(tour || storedTour)?.duration ? `<span class="badge">🕒 ${(tour || storedTour).duration}</span>` : ''}
                    ${(tour || storedTour)?.location ? `<span class="badge">📍 ${(tour || storedTour).location}</span>` : ''}
                    <span class="badge">📅 ${bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'To Be Determined'}</span>
                  </div>
                </div>
              </div>
                <div class="section">
                <h3>Customer Information</h3>
                <div class="info-grid">
                  <div>
                    <div class="info-item"><span class="label">Full Name:</span> <span class="value">${bookingDetails.contactName}</span></div>
                    <div class="info-item"><span class="label">Email:</span> <span class="value">${bookingDetails.email}</span></div>
                    ${(bookingData || storedBookingData)?.phone ? `<div class="info-item"><span class="label">Phone:</span> <span class="value">${(bookingData || storedBookingData).phone}</span></div>` : ''}
                    ${(bookingData || storedBookingData)?.address ? `<div class="info-item"><span class="label">Address:</span> <span class="value">${(bookingData || storedBookingData).address}</span></div>` : ''}
                  </div>
                  <div>
                    <div class="info-item"><span class="label">Departure Date:</span> <span class="value">${bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'To Be Determined'}</span></div>
                    ${(bookingData || storedBookingData)?.returnDate ? `<div class="info-item"><span class="label">Return Date:</span> <span class="value">${(bookingData || storedBookingData).returnDate instanceof Date ? (bookingData || storedBookingData).returnDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : new Date((bookingData || storedBookingData).returnDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span></div>` : ''}
                    <div class="info-item"><span class="label">Travelers:</span> <span class="value">${bookingDetails.guests} ${bookingDetails.guests === 1 ? 'Person' : 'People'}</span></div>
                    <div class="info-item"><span class="label">Booking Date:</span> <span class="value">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                  </div>
                </div>
              </div>
                ${(bookingData || storedBookingData)?.travelers && (bookingData || storedBookingData).travelers.length > 0 ? `
              <div class="section">
                <h3>Traveler Information</h3>
                <div class="info-grid">
                  ${(bookingData || storedBookingData).travelers.map((traveler: any, index: number) => `
                    <div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; border: 1px solid #dee2e6;">
                      <strong>Traveler ${index + 1}:</strong><br>
                      ${traveler.firstName || traveler.lastName ? `<span class="label">Name:</span> <span class="value">${traveler.firstName} ${traveler.lastName}</span><br>` : ''}
                      ${traveler.nationality ? `<span class="label">Nationality:</span> <span class="value">${traveler.nationality}</span><br>` : ''}
                      ${traveler.dateOfBirth ? `<span class="label">Date of Birth:</span> <span class="value">${traveler.dateOfBirth instanceof Date ? traveler.dateOfBirth.toLocaleDateString() : new Date(traveler.dateOfBirth).toLocaleDateString()}</span>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              
              ${((bookingData || storedBookingData)?.specialRequests || (bookingData || storedBookingData)?.dietaryRestrictions || (bookingData || storedBookingData)?.medicalConditions) ? `
              <div class="section">
                <h3>Special Requirements</h3>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                  ${(bookingData || storedBookingData)?.specialRequests ? `
                    <div style="margin-bottom: 8px;">
                      <strong>Special Requests:</strong><br>
                      <span style="color: #666; font-size: 11px;">${(bookingData || storedBookingData).specialRequests}</span>
                    </div>
                  ` : ''}
                  ${(bookingData || storedBookingData)?.dietaryRestrictions ? `
                    <div style="margin-bottom: 8px;">
                      <strong>Dietary Restrictions:</strong><br>
                      <span style="color: #666; font-size: 11px;">${(bookingData || storedBookingData).dietaryRestrictions}</span>
                    </div>
                  ` : ''}
                  ${(bookingData || storedBookingData)?.medicalConditions ? `
                    <div style="margin-bottom: 8px;">
                      <strong>Medical Conditions:</strong><br>
                      <span style="color: #666; font-size: 11px;">${(bookingData || storedBookingData).medicalConditions}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
              ` : ''}
              
              <div class="section">
                <h3>Payment Summary</h3>
                <div class="payment-summary">
                  <div class="payment-row"><span>Tour Price (per person):</span> <span>$${(bookingDetails.totalPrice / bookingDetails.guests).toFixed(2)}</span></div>
                  <div class="payment-row"><span>Number of Travelers:</span> <span>× ${bookingDetails.guests}</span></div>
                  <div class="payment-row"><span>Subtotal:</span> <span>$${bookingDetails.totalPrice.toFixed(2)}</span></div>
                  <div class="payment-row"><span>Service Fees:</span> <span style="color: #28a745;">FREE</span></div>
                  <div class="total-row">
                    <div class="total"><span>TOTAL AMOUNT:</span> <span>$${bookingDetails.totalPrice.toFixed(2)} USD</span></div>
                  </div>
                </div>
              </div>
                <div class="status">
                <strong>⏳ PENDING PAYMENT</strong><br>
                <small>Booking request sent to info@dldv.nl</small><br>
                <small>Our sales team will contact you within 24 hours for payment and tour details</small><br>
                <small>Payment will be processed after confirmation</small>
              </div>
                <div class="footer">
                <div><strong>Leo Loves Travel</strong></div>
                <div>Email: info@dldv.nl | Phone: +84 123 456 789</div>
                <div>Booking Reference: ${bookingReference}</div>
              </div>
            </div>
          </body>
        </html>
      `;
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      } else {
        alert('Please allow pop-ups to print the receipt.');
      }
    } catch (error) {
      console.error('Print failed:', error);
      alert('Print failed. Please try again.');
    }
  };return (    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-6 relative overflow-hidden">
      {/* Background decorative elements similar to Admin Dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0093DE]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#64A86B]/5 rounded-full blur-3xl"></div>
      </div>
        <div className="flex justify-center px-4 relative z-10">        <div className="w-full max-w-3xl">{/* Changed from max-w-4xl to max-w-3xl for more compact layout */}          {/* Enhanced Main Receipt Card with Admin Dashboard styling */}          <Card className="mb-4 shadow-xl border-0 rounded-2xl bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300">            <CardHeader className="bg-gradient-to-r from-[#0093DE] to-[#0077b3] text-white rounded-t-2xl py-4 px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>              <div className="relative z-10 grid grid-cols-2 gap-4 items-center">                <div className="text-left">
                  <CardTitle className="text-xl font-bold text-white tracking-wide">BOOKING RECEIPT</CardTitle>
                  <p className="text-white/80 text-sm mt-1">Leo Loves Travel</p>
                </div>
                <div className="text-right">
                  <CardDescription className="text-white/95 text-lg font-semibold bg-white/20 inline-block px-4 py-2 rounded-full">
                    #{bookingReference}
                  </CardDescription>
                  <p className="text-white/80 text-sm mt-1">
                    {new Date().toLocaleDateString('en-US', { 
                      day: '2-digit',
                      month: '2-digit', 
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>              <CardContent className="p-5 space-y-5">              {/* Tour Information Section with Full Width Image */}              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 bg-gradient-to-r from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-900/20 rounded-2xl p-4 shadow-sm">
                {/* Tour Image - Full width */}
                <div className="w-full h-64 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-xl border-2 border-gray-200 dark:border-gray-600 mb-4">
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
                      <MapPin className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>                {/* Tour Details below image */}
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-600/50">
                  <h2 className="text-gray-900 dark:text-white text-2xl mb-3 font-semibold tracking-tight text-center">{bookingDetails.tourName}</h2>
                  <div className="flex flex-wrap gap-3 justify-center">                    {(tour || storedTour)?.duration && (
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0093DE]/10 dark:bg-[#0093DE]/20 rounded-xl border border-[#0093DE]/20 shadow-sm hover:shadow-md transition-shadow">
                        <Clock className="h-4 w-4 text-[#0093DE]" />
                        <span className="text-base text-[#0093DE] dark:text-[#0093DE] font-medium">
                          {(tour || storedTour).duration}
                        </span>
                      </div>
                    )}
                    {(tour || storedTour)?.location && (
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#64A86B]/10 dark:bg-[#64A86B]/20 rounded-xl border border-[#64A86B]/20 shadow-sm hover:shadow-md transition-shadow">
                        <MapPin className="h-4 w-4 text-[#64A86B]" />
                        <span className="text-base text-[#64A86B] dark:text-[#64A86B] font-medium">
                          {(tour || storedTour).location}
                        </span>
                      </div>
                    )}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 dark:bg-orange-500/20 rounded-xl border border-orange-500/20 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-base text-orange-600 dark:text-orange-400 font-medium">
                        📅 {bookingDetails.date instanceof Date 
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
              </div>{/* Customer Details with larger text and enhanced styling */}              <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-700/50 dark:via-blue-900/10 dark:to-gray-700/50 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-600/50 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#0093DE]/10 rounded-2xl shadow-sm">
                    <div className="w-5 h-5 bg-[#0093DE] rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customer Information</h3>
                </div>                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-white/70 dark:bg-gray-800/70 rounded-2xl p-4 border border-gray-200/30 dark:border-gray-600/30 shadow-sm">                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Full Name</span>
                      <span className="text-gray-900 dark:text-white text-base font-medium">{bookingDetails.contactName}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email Address</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm break-all">{bookingDetails.email}</span>
                    </div>
                      {(bookingData || storedBookingData)?.phone && (
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone Number</span>
                        <span className="text-gray-900 dark:text-white text-base font-medium">{(bookingData || storedBookingData).phone}</span>
                      </div>
                    )}
                    
                    {(bookingData || storedBookingData)?.address && (
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Address</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{(bookingData || storedBookingData).address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 bg-white/70 dark:bg-gray-800/70 rounded-2xl p-4 border border-gray-200/30 dark:border-gray-600/30 shadow-sm">                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Departure Date:</span>
                      <span className="text-sm">
                        {bookingDetails.date instanceof Date
                          ? bookingDetails.date.toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            }) 
                          : 'To Be Determined'}
                      </span>
                    </div>
                    
                    {/* Add Return Date if available */}
                    {(bookingData || storedBookingData)?.returnDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-xs">Return Date:</span>
                        <span className="text-sm">
                          {(bookingData || storedBookingData).returnDate instanceof Date
                            ? (bookingData || storedBookingData).returnDate.toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              }) 
                            : new Date((bookingData || storedBookingData).returnDate).toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Number of Travelers:</span>
                      <span className="text-sm">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'Person' : 'People'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Booking Date:</span>
                      <span className="text-sm">
                        {new Date().toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    {(tour || storedTour)?.location && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-xs">Location:</span>
                        <span className="text-right text-sm">{(tour || storedTour).location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Add Traveler Information Section */}
                {(bookingData || storedBookingData)?.travelers && (bookingData || storedBookingData).travelers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Traveler Information:</span>
                    </div>                    <div className="space-y-3">
                      {(bookingData || storedBookingData).travelers.map((traveler: any, index: number) => (
                        <div key={index} className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                              Traveler {index + 1}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {(traveler.firstName || traveler.lastName) && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Name: </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {traveler.firstName} {traveler.lastName}
                                </span>
                              </div>
                            )}
                            {traveler.nationality && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Nationality: </span>
                                <span className="text-gray-700 dark:text-gray-300">{traveler.nationality}</span>
                              </div>
                            )}
                            {traveler.dateOfBirth && (
                              <div className="md:col-span-2">
                                <span className="text-gray-500 dark:text-gray-400">Date of Birth: </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {traveler.dateOfBirth instanceof Date
                                    ? traveler.dateOfBirth.toLocaleDateString()
                                    : new Date(traveler.dateOfBirth).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Enhanced Special Requirements Section */}
                {((bookingData || storedBookingData)?.specialRequests || 
                  (bookingData || storedBookingData)?.dietaryRestrictions || 
                  (bookingData || storedBookingData)?.medicalConditions) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Special Requirements:</span>
                    </div>
                    <div className="space-y-3">
                      {(bookingData || storedBookingData)?.specialRequests && (
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/50 rounded-lg p-3">
                          <div className="mb-1">
                            <span className="text-xs font-medium text-blue-800 dark:text-blue-300">Special Requests:</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {(bookingData || storedBookingData).specialRequests}
                          </p>
                        </div>
                      )}
                      
                      {(bookingData || storedBookingData)?.dietaryRestrictions && (
                        <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/50 rounded-lg p-3">
                          <div className="mb-1">
                            <span className="text-xs font-medium text-green-800 dark:text-green-300">Dietary Restrictions:</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {(bookingData || storedBookingData).dietaryRestrictions}
                          </p>
                        </div>
                      )}
                      
                      {(bookingData || storedBookingData)?.medicalConditions && (
                        <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-200/50 dark:border-orange-800/50 rounded-lg p-3">
                          <div className="mb-1">
                            <span className="text-xs font-medium text-orange-800 dark:text-orange-300">Medical Conditions:</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {(bookingData || storedBookingData).medicalConditions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>              {/* Payment Details with enhanced styling and larger text */}              <div className="bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 dark:from-blue-900/10 dark:via-gray-800/50 dark:to-blue-900/5 rounded-2xl p-4 border border-blue-200/30 dark:border-blue-800/30 shadow-lg">                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <div className="p-2 bg-[#0093DE]/10 rounded-2xl mr-2">
                    <div className="w-4 h-4 bg-[#0093DE] rounded-full"></div>
                  </div>
                  Payment Summary
                </h3>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-600/50">                  <div className="space-y-3 text-sm">                    <div className="flex justify-between items-center p-2 bg-gray-50/70 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-gray-600 dark:text-gray-400">Tour Price (per person):</span>
                      <span className="text-base font-medium">${(bookingDetails.totalPrice / bookingDetails.guests).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 bg-gray-50/70 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-gray-600 dark:text-gray-400">Number of Travelers:</span>
                      <span className="text-base font-medium">× {bookingDetails.guests}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 bg-gray-50/70 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="text-base font-medium">${bookingDetails.totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 bg-green-50/70 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
                      <span className="text-gray-600 dark:text-gray-400">Service Fees:</span>
                      <span className="text-base font-medium text-green-600">FREE</span>
                    </div>
                    
                    <div className="border-t-2 border-[#0093DE]/30 pt-3 mt-4">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#0093DE]/5 to-blue-50/50 dark:from-[#0093DE]/10 dark:to-blue-900/20 rounded-2xl border border-[#0093DE]/20 shadow-sm">
                        <span className="text-gray-800 dark:text-gray-200 text-base font-semibold">TOTAL AMOUNT:</span>
                        <span className="text-[#0093DE] text-lg font-bold">${bookingDetails.totalPrice.toFixed(2)} USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              {/* Booking Status */}              <div className="bg-gradient-to-r from-[#0093DE]/5 to-[#64A86B]/5 dark:from-[#0093DE]/10 dark:to-[#64A86B]/10 rounded-2xl p-4 text-center border border-[#0093DE]/20 dark:border-[#0093DE]/30 shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-orange-500/10 rounded-full mr-2 shadow-sm">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>                  <div>
                    <p className="text-base text-gray-800 dark:text-gray-200">
                      ⏳ PENDING PAYMENT
                    </p>
                  </div>
                </div>
                <div className="space-y-2 bg-white/50 dark:bg-gray-700/30 rounded-xl p-3 border border-white/60 dark:border-gray-600/50">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Booking request sent to info@dldv.nl
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Our sales team will contact you within 24 hours for payment and tour details
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Payment will be processed after confirmation
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
                    Booking Reference: {bookingReference}
                  </p>
                </div>
              </div>
            </CardContent>            {/* Action Buttons with enhanced styling and rounded corners */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-b-2xl p-4 border-t border-gray-200/50 dark:border-gray-600/50">              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-sm h-10 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={handleDownloadReceipt}
                  disabled={isDownloading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isDownloading ? 'Preparing...' : 'Download Receipt'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-sm h-10 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={handlePrintReceipt}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
                <Button 
                  size="lg" 
                  className="bg-[#0093DE] hover:bg-[#007ab8] text-sm h-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                  onClick={() => navigate('/package-tours')}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Book Another Tour
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
