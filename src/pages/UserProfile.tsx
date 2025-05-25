import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { User, Settings, Heart, Clock, MapPin, CreditCard, LogOut, Bell, Edit, ChevronRight, Star } from 'lucide-react';

const UserProfile = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Sample user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    joinDate: 'January 2023'
  };
  
  // Sample bookings data
  const bookings = [
    {
      id: 'VN-123456',
      tourName: 'Hanoi Cultural Experience',
      date: 'June 15, 2025',
      status: 'upcoming',
      price: 299,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=200'
    },
    {
      id: 'VN-789012',
      tourName: 'Ha Long Bay Cruise',
      date: 'August 22, 2025',
      status: 'upcoming',
      price: 499,
      image: 'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=200'
    },
    {
      id: 'VN-345678',
      tourName: 'Ho Chi Minh City Tour',
      date: 'March 10, 2025',
      status: 'completed',
      price: 249,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=200'
    }
  ];
  
  // Sample wishlist data
  const wishlist = [
    {
      id: '1',
      name: 'Mekong Delta Exploration',
      location: 'Mekong Delta',
      price: 349,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=200'
    },
    {
      id: '2',
      name: 'Hue Imperial City Tour',
      location: 'Hue',
      price: 279,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=200'
    }
  ];
  
  return (
    <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} pt-24 pb-16`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-1 p-2">
                    <Button 
                      variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('profile')}
                    >
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Button>
                    <Button 
                      variant={activeTab === 'bookings' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('bookings')}
                    >
                      <Clock className="mr-2 h-4 w-4" /> My Bookings
                    </Button>
                    <Button 
                      variant={activeTab === 'wishlist' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('wishlist')}
                    >
                      <Heart className="mr-2 h-4 w-4" /> Wishlist
                    </Button>
                    <Button 
                      variant={activeTab === 'payment' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('payment')}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                    </Button>
                    <Button 
                      variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" /> Account Settings
                    </Button>
                    <Separator className="my-2" />
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date of Birth</label>
                        <Input defaultValue="1990-05-15" type="date" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-[#0093DE] hover:bg-[#007ab8]">Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Preferences</CardTitle>
                    <CardDescription>Help us personalize your experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preferred Travel Style</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10 border-[#0093DE]">Adventure</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Cultural</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Relaxation</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Food & Culinary</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Eco-Tourism</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Accommodation Preference</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10 border-[#0093DE]">Hotels</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Homestays</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Resorts</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Boutique</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Interests</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10 border-[#0093DE]">History</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10 border-[#0093DE]">Food</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Nature</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Photography</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-[#0093DE]/10">Local Culture</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-[#0093DE] hover:bg-[#007ab8]">Update Preferences</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>Manage your tour bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upcoming">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upcoming" className="space-y-4">
                        {bookings.filter(booking => booking.status === 'upcoming').map(booking => (
                          <div key={booking.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={booking.image} 
                                alt={booking.tourName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                  <h3 className="font-semibold">{booking.tourName}</h3>
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>Vietnam</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge className="bg-[#0093DE]">Upcoming</Badge>
                                  <p className="font-semibold mt-2">${booking.price}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/booking-confirmation/${booking.id}`}>View Details</Link>
                                </Button>
                                <Button size="sm" variant="outline">Modify Booking</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="past" className="space-y-4">
                        {bookings.filter(booking => booking.status === 'completed').map(booking => (
                          <div key={booking.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={booking.image} 
                                alt={booking.tourName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                  <h3 className="font-semibold">{booking.tourName}</h3>
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>Vietnam</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline">Completed</Badge>
                                  <p className="font-semibold mt-2">${booking.price}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/booking-confirmation/${booking.id}`}>View Details</Link>
                                </Button>
                                <Button size="sm" variant="outline">Leave Review</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>Tours you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map(item => (
                        <div key={item.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 overflow-hidden relative">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600 rounded-full"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold">{item.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{item.location}, Vietnam</span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <p className="font-semibold">${item.price}</p>
                              <Button size="sm" asChild className="bg-[#0093DE] hover:bg-[#007ab8]">
                                <Link to={`/tour/${item.id}`}>View Tour</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {wishlist.length === 0 && (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Save tours you're interested in by clicking the heart icon
                        </p>
                        <Button asChild className="bg-[#0093DE] hover:bg-[#007ab8]">
                          <Link to="/package-tours">Explore Tours</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-blue-600 rounded mr-4 flex items-center justify-center text-white font-bold">
                          Visa
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expires 05/2026</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-red-500 rounded mr-4 flex items-center justify-center text-white font-bold">
                          MC
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 8888</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expires 11/2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">Set Default</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      <CreditCard className="mr-2 h-4 w-4" /> Add New Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Email Notifications</h3>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Booking confirmations</label>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Special offers and promotions</label>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Travel tips and news</label>
                        <input type="checkbox" className="toggle toggle-primary" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Privacy Settings</h3>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Share my reviews publicly</label>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Allow personalized recommendations</label>
                        <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Account Security</h3>
                      <Button variant="outline" className="w-full justify-between">
                        Change Password
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between">
                        Two-Factor Authentication
                        <Badge className="ml-2">Enabled</Badge>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-red-500">Danger Zone</h3>
                      <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
