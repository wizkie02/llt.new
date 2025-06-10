import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useTours } from "../contexts/ToursContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Calendar } from "../components/ui/calendar";
import { BirthDateCalendar } from "../components/ui/birth-date-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import {
  CalendarIcon,
  Users,
  MapPin,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

interface Traveler {
  id: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  passportExpiry: Date | undefined;
  dateOfBirth: Date | undefined;
  nationality: string;
}

interface BookingFormData {
  // Contact Information
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;

  // Tour Information
  tourId: string;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  numberOfTravelers: number;

  // Travelers Information
  travelers: Traveler[];

  // Additional Information
  specialRequests: string;
  dietaryRestrictions: string;
  medicalConditions: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { tours, getTourById } = useTours();
  const tourId = searchParams.get("tourId");
  const selectedTour = tourId ? getTourById(tourId) : null;

  // Get prefilled data from navigation state
  const navigationState = location.state as {
    selectedTour?: any;
    prefilledDate?: Date;
    prefilledGuests?: number;
  } | null;

  const [formData, setFormData] = useState<BookingFormData>({
    contactFirstName: "",
    contactLastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    tourId: tourId || "",
    departureDate: undefined,
    returnDate: undefined,
    numberOfTravelers: 1,
    travelers: [
      {
        id: "1",
        firstName: "",
        lastName: "",
        passportNumber: "",
        passportExpiry: undefined,
        dateOfBirth: undefined,
        nationality: "",
      },
    ],
    specialRequests: "",
    dietaryRestrictions: "",
    medicalConditions: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle prefilled data from navigation state
  useEffect(() => {
    if (navigationState) {
      if (navigationState.prefilledDate) {
        setFormData((prev) => ({
          ...prev,
          departureDate: navigationState.prefilledDate,
        }));
      }
      if (navigationState.prefilledGuests !== undefined) {
        setFormData((prev) => ({
          ...prev,
          numberOfTravelers: navigationState.prefilledGuests ?? 1,
        }));
      }
    }
  }, [navigationState]);

  // Update travelers array when numberOfTravelers changes
  useEffect(() => {
    const currentTravelers = formData.travelers.length;
    const newCount = formData.numberOfTravelers;

    if (newCount > currentTravelers) {
      // Add new travelers
      const newTravelers = [...formData.travelers];
      for (let i = currentTravelers; i < newCount; i++) {
        newTravelers.push({
          id: String(i + 1),
          firstName: "",
          lastName: "",
          passportNumber: "",
          passportExpiry: undefined,
          dateOfBirth: undefined,
          nationality: "",
        });
      }
      setFormData((prev) => ({ ...prev, travelers: newTravelers }));
    } else if (newCount < currentTravelers) {
      // Remove travelers
      setFormData((prev) => ({
        ...prev,
        travelers: prev.travelers.slice(0, newCount),
      }));
    }
  }, [formData.numberOfTravelers]);

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Auto-adjust return date if departure date is set after current return date
      if (
        field === "departureDate" &&
        value &&
        newData.returnDate &&
        value > newData.returnDate
      ) {
        newData.returnDate = undefined; // Clear return date when departure is after it
      }

      return newData;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTravelerChange = (
    travelerId: string,
    field: keyof Traveler,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      travelers: prev.travelers.map((traveler) =>
        traveler.id === travelerId ? { ...traveler, [field]: value } : traveler
      ),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Contact Information Validation
    if (!formData.contactFirstName.trim())
      newErrors.contactFirstName = "First name is required";
    if (!formData.contactLastName.trim())
      newErrors.contactLastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.tourId) newErrors.tourId = "Please select a tour";
    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Travelers validation
    formData.travelers.forEach((traveler, index) => {
      if (!traveler.firstName.trim()) {
        newErrors[`traveler_${index}_firstName`] = "First name is required";
      }
      if (!traveler.lastName.trim()) {
        newErrors[`traveler_${index}_lastName`] = "Last name is required";
      }
      if (!traveler.passportNumber.trim()) {
        newErrors[`traveler_${index}_passportNumber`] =
          "Passport number is required";
      }
      if (!traveler.passportExpiry) {
        newErrors[`traveler_${index}_passportExpiry`] =
          "Passport expiry date is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data to send to webhook
      const webhookData = {
        timestamp: new Date().toISOString(),
        source: "booking_form",
        tour: selectedTour
          ? {
              id: selectedTour.id,
              name: selectedTour.name,
              price: selectedTour.price,
              location: selectedTour.location,
              duration: selectedTour.duration,
            }
          : null,
        contactInformation: {
          firstName: formData.contactFirstName,
          lastName: formData.contactLastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
        },
        tourDetails: {
          tourId: formData.tourId,
          departureDate: formData.departureDate?.toISOString(),
          returnDate: formData.returnDate?.toISOString(),
          numberOfTravelers: formData.numberOfTravelers,
        },
        travelers: formData.travelers.map((traveler, index) => ({
          travelerNumber: index + 1,
          firstName: traveler.firstName,
          lastName: traveler.lastName,
          passportNumber: traveler.passportNumber,
          passportExpiry: traveler.passportExpiry?.toISOString(),
          dateOfBirth: traveler.dateOfBirth?.toISOString(),
          nationality: traveler.nationality,
        })),
        additionalInformation: {
          specialRequests: formData.specialRequests,
          dietaryRestrictions: formData.dietaryRestrictions,
          medicalConditions: formData.medicalConditions,
        },
        bookingTotal: selectedTour
          ? selectedTour.price * formData.numberOfTravelers
          : 0,
      };

      // Send data to webhook
      const response = await fetch(
        "https://hook.eu2.make.com/0132fcrjrwvpgea89pekppaew7c5m99z",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        }
      );

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      // Navigate to booking confirmation with form data
      navigate("/booking-confirmation", {
        state: {
          bookingData: formData,
          tour: selectedTour,
        },
      });
    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("There was an error processing your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
      <div className="container max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Book Your Vietnamese Adventure
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete the form below to secure your spot on this amazing journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Tour Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-[#0093DE]" />
                    Tour Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tourId">Select Tour *</Label>
                    <Select
                      value={formData.tourId}
                      onValueChange={(value) =>
                        handleInputChange("tourId", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.tourId ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Choose your tour" />
                      </SelectTrigger>
                      <SelectContent>
                        {tours.map((tour) => (
                          <SelectItem key={tour.id} value={tour.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{tour.name}</span>
                              <Badge variant="secondary">${tour.price}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.tourId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.tourId}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Label>Departure Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              !formData.departureDate
                                ? "text-muted-foreground"
                                : ""
                            } ${errors.departureDate ? "border-red-500" : ""}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.departureDate
                              ? format(formData.departureDate, "PPP")
                              : "Pick departure date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.departureDate}
                            onSelect={(date) =>
                              handleInputChange("departureDate", date)
                            }
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.departureDate && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.departureDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Return Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              !formData.returnDate
                                ? "text-muted-foreground"
                                : ""
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.returnDate
                              ? format(formData.returnDate, "PPP")
                              : "Pick return date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.returnDate}
                            onSelect={(date) =>
                              handleInputChange("returnDate", date)
                            }
                            disabled={(date) =>
                              date < (formData.departureDate || new Date())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="numberOfTravelers">
                        Number of Travelers *
                      </Label>
                      <Select
                        value={String(formData.numberOfTravelers)}
                        onValueChange={(value) =>
                          handleInputChange("numberOfTravelers", parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1} {i + 1 === 1 ? "Person" : "People"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="contactFirstName">First Name *</Label>
                      <Input
                        id="contactFirstName"
                        value={formData.contactFirstName}
                        onChange={(e) =>
                          handleInputChange("contactFirstName", e.target.value)
                        }
                        className={
                          errors.contactFirstName ? "border-red-500" : ""
                        }
                        placeholder="Enter your first name"
                      />
                      {errors.contactFirstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.contactFirstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contactLastName">Last Name *</Label>
                      <Input
                        id="contactLastName"
                        value={formData.contactLastName}
                        onChange={(e) =>
                          handleInputChange("contactLastName", e.target.value)
                        }
                        className={
                          errors.contactLastName ? "border-red-500" : ""
                        }
                        placeholder="Enter your last name"
                      />
                      {errors.contactLastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.contactLastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="+84 xxx xxx xxx"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Your full address"
                      className="min-h-[60px] resize-none rounded-lg"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="emergencyContact">
                        Emergency Contact Name
                      </Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) =>
                          handleInputChange("emergencyContact", e.target.value)
                        }
                        placeholder="Emergency contact person"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">
                        Emergency Contact Phone
                      </Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) =>
                          handleInputChange("emergencyPhone", e.target.value)
                        }
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Travelers Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-[#0093DE]" />
                    Travelers Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.travelers.map((traveler, index) => (
                    <div
                      key={traveler.id}
                      className="p-4 space-y-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Traveler {index + 1}</h4>
                        <Badge variant="outline">Required</Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label>First Name *</Label>
                          <Input
                            value={traveler.firstName}
                            onChange={(e) =>
                              handleTravelerChange(
                                traveler.id,
                                "firstName",
                                e.target.value
                              )
                            }
                            className={
                              errors[`traveler_${index}_firstName`]
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="First name"
                          />
                          {errors[`traveler_${index}_firstName`] && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors[`traveler_${index}_firstName`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input
                            value={traveler.lastName}
                            onChange={(e) =>
                              handleTravelerChange(
                                traveler.id,
                                "lastName",
                                e.target.value
                              )
                            }
                            className={
                              errors[`traveler_${index}_lastName`]
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="Last name"
                          />
                          {errors[`traveler_${index}_lastName`] && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors[`traveler_${index}_lastName`]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label>Passport Number *</Label>
                          <Input
                            value={traveler.passportNumber}
                            onChange={(e) =>
                              handleTravelerChange(
                                traveler.id,
                                "passportNumber",
                                e.target.value
                              )
                            }
                            className={
                              errors[`traveler_${index}_passportNumber`]
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="Passport number"
                          />
                          {errors[`traveler_${index}_passportNumber`] && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors[`traveler_${index}_passportNumber`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label>Nationality</Label>
                          <Input
                            value={traveler.nationality}
                            onChange={(e) =>
                              handleTravelerChange(
                                traveler.id,
                                "nationality",
                                e.target.value
                              )
                            }
                            placeholder="Nationality"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label>Date of Birth</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !traveler.dateOfBirth
                                    ? "text-muted-foreground"
                                    : ""
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {traveler.dateOfBirth
                                  ? format(traveler.dateOfBirth, "PPP")
                                  : "Pick date of birth"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <BirthDateCalendar
                                mode="single"
                                selected={traveler.dateOfBirth}
                                onSelect={(date) =>
                                  handleTravelerChange(
                                    traveler.id,
                                    "dateOfBirth",
                                    date
                                  )
                                }
                                disabled={(date) => date > new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label>Passport Expiry Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !traveler.passportExpiry
                                    ? "text-muted-foreground"
                                    : ""
                                } ${
                                  errors[`traveler_${index}_passportExpiry`]
                                    ? "border-red-500"
                                    : ""
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {traveler.passportExpiry
                                  ? format(traveler.passportExpiry, "PPP")
                                  : "Pick expiry date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <BirthDateCalendar
                                mode="single"
                                selected={traveler.passportExpiry}
                                onSelect={(date) =>
                                  handleTravelerChange(
                                    traveler.id,
                                    "passportExpiry",
                                    date
                                  )
                                }
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {errors[`traveler_${index}_passportExpiry`] && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors[`traveler_${index}_passportExpiry`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) =>
                        handleInputChange("specialRequests", e.target.value)
                      }
                      placeholder="Any special requests..."
                      className="min-h-[70px] resize-none rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dietaryRestrictions">
                      Dietary Restrictions
                    </Label>
                    <Textarea
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) =>
                        handleInputChange("dietaryRestrictions", e.target.value)
                      }
                      placeholder="List any dietary restrictions..."
                      className="min-h-[60px] resize-none rounded-lg"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={(e) =>
                        handleInputChange("medicalConditions", e.target.value)
                      }
                      placeholder="Any medical conditions..."
                      className="min-h-[60px] resize-none rounded-lg"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTour ? (
                      <>
                        <div>
                          <img
                            src={selectedTour.image}
                            alt={selectedTour.name}
                            className="object-cover w-full h-32 mb-3 rounded-lg"
                          />
                          <h3 className="text-lg font-semibold">
                            {selectedTour.name}
                          </h3>
                          <p className="flex items-center mt-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {selectedTour.location}
                          </p>
                          <p className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {selectedTour.duration}
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Price per person:</span>
                            <span className="font-medium">
                              ${selectedTour.price}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Number of travelers:</span>
                            <span className="font-medium">
                              {formData.numberOfTravelers}
                            </span>
                          </div>
                          {formData.departureDate && (
                            <div className="flex justify-between">
                              <span>Departure:</span>
                              <span className="font-medium">
                                {format(formData.departureDate, "MMM dd, yyyy")}
                              </span>
                            </div>
                          )}
                          {formData.returnDate && (
                            <div className="flex justify-between">
                              <span>Return:</span>
                              <span className="font-medium">
                                {format(formData.returnDate, "MMM dd, yyyy")}
                              </span>
                            </div>
                          )}
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-[#0093DE]">
                              $
                              {(
                                selectedTour.price * formData.numberOfTravelers
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>Please select a tour to see pricing details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="mt-6">
                  <Button
                    type="submit"
                    className="w-full bg-[#0093DE] hover:bg-[#0077b3] text-white py-3 text-lg font-semibold"
                    disabled={isSubmitting || !selectedTour}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-4 text-xs text-center text-gray-500">
                  By clicking "Confirm Booking", you agree to our Terms of
                  Service and Privacy Policy.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
