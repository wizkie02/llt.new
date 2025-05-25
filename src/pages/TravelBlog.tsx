import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight, Heart, Share2, User, Star } from 'lucide-react';

const TravelBlog = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample blog posts data
  const featuredPosts = [
    {
      id: '1',
      title: 'Top 10 Hidden Gems in Northern Vietnam',
      excerpt: 'Discover the lesser-known treasures of Northern Vietnam, from remote mountain villages to secluded valleys that most tourists never see.',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop',
      author: 'Mai Tran',
      date: 'May 15, 2025',
      category: 'Destinations',
      readTime: '8 min read'
    },
    {
      id: '2',
      title: 'A Culinary Journey Through Vietnamese Street Food',
      excerpt: 'From pho to banh mi, explore the vibrant flavors and cultural significance of Vietnam\'s beloved street food scene.',
      image: 'https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?q=80&w=1374&auto=format&fit=crop',
      author: 'David Nguyen',
      date: 'May 8, 2025',
      category: 'Food & Culture',
      readTime: '6 min read'
    },
    {
      id: '3',
      title: 'Sustainable Tourism: Eco-Friendly Travel in Vietnam',
      excerpt: 'Learn how to minimize your environmental impact while maximizing your cultural experience in Vietnam\'s most beautiful natural settings.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1470&auto=format&fit=crop',
      author: 'Sarah Johnson',
      date: 'April 29, 2025',
      category: 'Eco Tourism',
      readTime: '7 min read'
    }
  ];
  
  const recentPosts = [
    {
      id: '4',
      title: 'The Perfect 7-Day Itinerary for Central Vietnam',
      excerpt: 'A comprehensive day-by-day guide to exploring Hue, Da Nang, Hoi An, and the surrounding areas.',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1374&auto=format&fit=crop',
      author: 'Michael Lee',
      date: 'May 20, 2025',
      category: 'Travel Tips',
      readTime: '10 min read'
    },
    {
      id: '5',
      title: 'Vietnam\'s Festival Calendar: When to Visit for Cultural Celebrations',
      excerpt: 'Plan your trip around Vietnam\'s colorful festivals and experience the country\'s rich traditions firsthand.',
      image: 'https://images.unsplash.com/photo-1540261556739-a0b8756ce680?q=80&w=1471&auto=format&fit=crop',
      author: 'Linh Pham',
      date: 'May 18, 2025',
      category: 'Culture',
      readTime: '9 min read'
    },
    {
      id: '6',
      title: 'Photography Guide: Capturing Vietnam\'s Most Instagrammable Spots',
      excerpt: 'Tips and locations for taking stunning photos that will make your Instagram followers envious of your Vietnamese adventure.',
      image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1374&auto=format&fit=crop',
      author: 'Emma Wilson',
      date: 'May 12, 2025',
      category: 'Photography',
      readTime: '8 min read'
    },
    {
      id: '7',
      title: 'Navigating Transportation in Vietnam: A Comprehensive Guide',
      excerpt: 'From motorbikes to trains, learn how to get around Vietnam like a local with these essential transportation tips.',
      image: 'https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?q=80&w=1470&auto=format&fit=crop',
      author: 'John Smith',
      date: 'May 5, 2025',
      category: 'Travel Tips',
      readTime: '7 min read'
    },
    {
      id: '8',
      title: 'Vietnam\'s Coffee Culture: More Than Just a Caffeine Fix',
      excerpt: 'Dive into the rich history and unique preparation methods that make Vietnamese coffee a cultural institution.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1374&auto=format&fit=crop',
      author: 'Tran Minh',
      date: 'April 28, 2025',
      category: 'Food & Culture',
      readTime: '6 min read'
    },
    {
      id: '9',
      title: 'Packing Essentials for Your Vietnamese Adventure',
      excerpt: 'A seasonal guide to what you should bring to ensure comfort and preparedness during your trip to Vietnam.',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1470&auto=format&fit=crop',
      author: 'Lisa Chen',
      date: 'April 22, 2025',
      category: 'Travel Tips',
      readTime: '5 min read'
    }
  ];
  
  // Sample categories
  const categories = [
    { name: 'Destinations', count: 12 },
    { name: 'Food & Culture', count: 8 },
    { name: 'Travel Tips', count: 15 },
    { name: 'Photography', count: 6 },
    { name: 'Eco Tourism', count: 4 },
    { name: 'Adventure', count: 7 },
    { name: 'History', count: 5 }
  ];
  
  return (
    <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} pt-24 pb-16`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Vietnam Travel Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Discover travel tips, cultural insights, and inspiration for your Vietnamese adventure
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-4 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Featured Posts */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            <Link to="/blog/featured" className="text-[#0093DE] hover:underline flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="pt-6">
                  <Badge className="mb-2 bg-[#0093DE]/10 text-[#0093DE] hover:bg-[#0093DE]/20 border-0">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild variant="link" className="p-0 h-auto text-[#0093DE]">
                    <Link to={`/blog/post/${post.id}`}>
                      Read More <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            
            <div className="space-y-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <Badge className="mb-2 bg-[#0093DE]/10 text-[#0093DE] hover:bg-[#0093DE]/20 border-0">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button asChild variant="link" className="p-0 h-auto text-[#0093DE]">
                        <Link to={`/blog/post/${post.id}`}>
                          Read More <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mr-2">Previous</Button>
              <Button variant="outline" className="ml-2">Next</Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.name} className="flex justify-between items-center">
                        <Link 
                          to={`/blog/category/${category.name.toLowerCase()}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-[#0093DE] dark:hover:text-[#0093DE]"
                        >
                          {category.name}
                        </Link>
                        <Badge variant="outline">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredPosts.map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            <Link 
                              to={`/blog/post/${post.id}`}
                              className="hover:text-[#0093DE]"
                            >
                              {post.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-[#58b7e8] to-[#6dc0eb] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Subscribe to Our Newsletter</CardTitle>
                  <CardDescription className="text-white/80">
                    Get the latest travel tips and insights delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      className="bg-white/20 border-white/30 placeholder:text-white/70 text-white"
                    />
                    <Button className="w-full bg-white text-[#0093DE] hover:bg-white/90">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Vietnam</Badge>
                    <Badge variant="secondary">Travel Tips</Badge>
                    <Badge variant="secondary">Food</Badge>
                    <Badge variant="secondary">Culture</Badge>
                    <Badge variant="secondary">Photography</Badge>
                    <Badge variant="secondary">Adventure</Badge>
                    <Badge variant="secondary">Hanoi</Badge>
                    <Badge variant="secondary">Ho Chi Minh City</Badge>
                    <Badge variant="secondary">Ha Long Bay</Badge>
                    <Badge variant="secondary">Hoi An</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-[#0093DE] text-white rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Vietnam?</h2>
            <p className="mb-6 text-white/80">
              Turn the travel inspiration from our blog into reality. Explore our curated tours and create memories that last a lifetime.
            </p>
            <Button className="bg-white text-[#0093DE] hover:bg-white/90" size="lg" asChild>
              <Link to="/package-tours">
                Explore Our Tours <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBlog;
