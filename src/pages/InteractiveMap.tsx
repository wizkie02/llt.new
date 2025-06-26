import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from '../components/ui/LazyImage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { MapPin, Search, Plus, Minus, Layers, Map as MapIcon, List, Star, Heart, Info } from 'lucide-react';
import { useTours } from '../contexts/ToursContext';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import SEOBreadcrumb from '../components/SEOBreadcrumb';
import { pageConfigs } from '../utils/seoOptimization';

const InteractiveMap = () => {
  const { theme } = useTheme();
  const {  } = useTours();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mapView, setMapView] = useState('map'); // 'map' or 'list'
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  
  // Sample regions
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north', name: 'Northern Vietnam' },
    { id: 'central', name: 'Central Vietnam' },
    { id: 'south', name: 'Southern Vietnam' },
    { id: 'mekong', name: 'Mekong Delta' }
  ];
  
  // Sample categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'beach', name: 'Beach' },
    { id: 'food', name: 'Food & Culinary' },
    { id: 'nature', name: 'Nature & Wildlife' }
  ];
  
  // Sample locations for the map
  const locations = [
    {
      id: '1',
      name: 'Hanoi',
      region: 'north',
      coordinates: { lat: 21.0285, lng: 105.8542 },
      tours: [
        { id: 'tour1', name: 'Hanoi City Explorer', category: 'cultural', price: 79, rating: 4.8, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=200' },
        { id: 'tour2', name: 'Hanoi Food Tour', category: 'food', price: 59, rating: 4.9, image: 'https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?q=80&w=200' }
      ]
    },
    {
      id: '2',
      name: 'Ha Long Bay',
      region: 'north',
      coordinates: { lat: 20.9101, lng: 107.1839 },
      tours: [
        { id: 'tour3', name: 'Ha Long Bay Cruise', category: 'nature', price: 149, rating: 4.7, image: 'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?q=80&w=200' }
      ]
    },
    {
      id: '3',
      name: 'Hoi An',
      region: 'central',
      coordinates: { lat: 15.8801, lng: 108.3380 },
      tours: [
        { id: 'tour4', name: 'Hoi An Ancient Town', category: 'cultural', price: 89, rating: 4.9, image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=200' },
        { id: 'tour5', name: 'Hoi An Cooking Class', category: 'food', price: 69, rating: 4.8, image: 'https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?q=80&w=200' }
      ]
    },
    {
      id: '4',
      name: 'Ho Chi Minh City',
      region: 'south',
      coordinates: { lat: 10.8231, lng: 106.6297 },
      tours: [
        { id: 'tour6', name: 'Saigon City Tour', category: 'cultural', price: 79, rating: 4.6, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=200' },
        { id: 'tour7', name: 'Cu Chi Tunnels', category: 'adventure', price: 89, rating: 4.7, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=200' }
      ]
    },
    {
      id: '5',
      name: 'Mekong Delta',
      region: 'mekong',
      coordinates: { lat: 10.0341, lng: 105.7749 },
      tours: [
        { id: 'tour8', name: 'Mekong Delta Exploration', category: 'nature', price: 99, rating: 4.5, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=200' }
      ]
    },
    {
      id: '6',
      name: 'Nha Trang',
      region: 'central',
      coordinates: { lat: 12.2388, lng: 109.1967 },
      tours: [
        { id: 'tour9', name: 'Nha Trang Beach Day', category: 'beach', price: 69, rating: 4.4, image: 'https://images.unsplash.com/photo-1540261556739-a0b8756ce680?q=80&w=200' }
      ]
    }
  ];
  
  // Filter locations based on search and filters
  const filteredLocations = locations.filter(location => {
    // Region filter
    if (selectedRegion !== 'all' && location.region !== selectedRegion) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !location.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter (applied to tours within locations)
    if (selectedCategory !== 'all') {
      const hasCategoryTour = location.tours.some(tour => tour.category === selectedCategory);
      if (!hasCategoryTour) {
        return false;
      }
    }
    
    return true;
  });
  
  // Get all tours from filtered locations
  const filteredTours = filteredLocations.flatMap(location => 
    location.tours.filter(tour => 
      selectedCategory === 'all' || tour.category === selectedCategory
    )
  );
  
  return (
    <>
      <SEO
        title={pageConfigs.interactiveMap.title}
        description={pageConfigs.interactiveMap.description}
        keywords={pageConfigs.interactiveMap.keywords}
        url="https://leolovestravel.com/interactive-map"
        type="website"
      />
      <StructuredData
        type="TravelAgency"
        data={pageConfigs.interactiveMap.structuredData}      />
      
      <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} pt-24 pb-16`}>
        <SEOBreadcrumb />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Vietnam</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the best destinations and tours across Vietnam with our interactive map
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search destinations..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end">
                <div className="border rounded-md overflow-hidden flex">
                  <Button 
                    variant={mapView === 'map' ? 'default' : 'ghost'} 
                    className={`rounded-none ${mapView === 'map' ? 'bg-[#0093DE] hover:bg-[#0077b3]' : ''}`}
                    onClick={() => setMapView('map')}
                  >
                    <MapIcon className="h-4 w-4 mr-2" /> Map
                  </Button>
                  <Button 
                    variant={mapView === 'list' ? 'default' : 'ghost'} 
                    className={`rounded-none ${mapView === 'list' ? 'bg-[#0093DE] hover:bg-[#0077b3]' : ''}`}
                    onClick={() => setMapView('list')}
                  >
                    <List className="h-4 w-4 mr-2" /> List
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map View */}
          {mapView === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-[600px] overflow-hidden">
                  <CardContent className="p-0 h-full relative">
                    {/* This would be replaced with an actual map component like Google Maps or Leaflet */}
                    <div className="w-full h-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center relative">
                      <LazyImage 
                        src="https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=1000" 
                        alt="Vietnam Map" 
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <MapIcon className="h-16 w-16 text-[#0093DE] mb-4" />
                        <p className="text-center max-w-md px-4">
                          Interactive map would be implemented here using Google Maps or Leaflet.
                          <br /><br />
                          The map would show pins for each location with popups for tours.
                        </p>
                      </div>
                      
                      {/* Map Controls (Mockup) */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button variant="secondary" size="icon" className="bg-white dark:bg-gray-800 shadow-md">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="bg-white dark:bg-gray-800 shadow-md">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="bg-white dark:bg-gray-800 shadow-md">
                          <Layers className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Destinations ({filteredLocations.length})</h2>
                
                <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                  {filteredLocations.map(location => (
                    <Card 
                      key={location.id} 
                      className={`hover:shadow-md transition-shadow cursor-pointer ${selectedTour === location.id ? 'ring-2 ring-[#0093DE]' : ''}`}
                      onClick={() => setSelectedTour(location.id === selectedTour ? null : location.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-[#0093DE]" />
                          {location.name}
                        </CardTitle>
                        <CardDescription>
                          {location.tours.length} {location.tours.length === 1 ? 'tour' : 'tours'} available
                        </CardDescription>
                      </CardHeader>
                      
                      {selectedTour === location.id && (
                        <CardContent className="pt-0">
                          <Separator className="my-2" />
                          <div className="space-y-3">
                            {location.tours.map(tour => (
                              <div key={tour.id} className="flex gap-3">
                                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <LazyImage 
                                    src={tour.image} 
                                    alt={tour.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{tour.name}</h4>
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    <Badge variant="outline" className="mr-2">{categories.find(c => c.id === tour.category)?.name}</Badge>
                                    <div className="flex items-center">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                      <span>{tour.rating}</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold">${tour.price}</span>
                                    <Button size="sm" variant="link" asChild className="h-auto p-0 text-[#0093DE]">
                                      <Link to={`/tour/${tour.id}`}>View</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                  
                  {filteredLocations.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                      <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No destinations found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Try adjusting your filters or search terms
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedRegion('all');
                          setSelectedCategory('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* List View */}
          {mapView === 'list' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Available Tours ({filteredTours.length})</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                  <select className="text-sm border rounded-md p-1">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                    <option>Popularity</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map(tour => (
                  <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden relative">
                      <LazyImage 
                        src={tour.image} 
                        alt={tour.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-[#0093DE] rounded-full"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-[#0093DE]/10 text-[#0093DE] border-[#0093DE]/20">
                          {categories.find(c => c.id === tour.category)?.name}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{tour.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold mb-1">{tour.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {locations.find(loc => loc.tours.some(t => t.id === tour.id))?.name}, Vietnam
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-lg">${tour.price}</div>
                        <Button size="sm" className="bg-[#0093DE] hover:bg-[#0077b3]" asChild>
                          <Link to={`/tour/${tour.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredTours.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                  <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tours found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('all');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Travel Tips */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Vietnam Travel Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-[#0093DE]" />
                    Best Time to Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vietnam has a diverse climate. Northern regions are best visited from October to April, while southern areas are pleasant year-round with a dry season from November to April.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-[#0093DE]" />
                    Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vietnam offers various transportation options including domestic flights, trains, buses, and motorbike rentals. Major cities have ride-sharing apps and taxis.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-[#0093DE]" />
                    Local Customs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Remove shoes when entering homes and temples. Use both hands when giving or receiving items. Dress modestly when visiting religious sites.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-[#58b7e8] to-[#6dc0eb] text-white rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Planning Your Vietnam Adventure?</h2>
              <p className="mb-6 text-white/80">
                Our travel experts can help you create the perfect itinerary based on your interests and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#0093DE] hover:bg-white/90" size="lg">
                  Contact an Expert
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20" size="lg" asChild>
                  <Link to="/package-tours">Browse Tour Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveMap;
