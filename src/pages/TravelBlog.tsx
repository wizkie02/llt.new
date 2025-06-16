import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from '../components/ui/LazyImage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, ArrowRight, ChevronRight, User } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import SEOBreadcrumb from '../components/SEOBreadcrumb';
import { pageConfigs } from '../utils/seoOptimization';

const TravelBlog = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
    // Leo Loves Travel featured blog posts
  const featuredPosts = [
    {
      id: '1',
      title: 'Chào mừng bạn đến với Leo Loves Travel - Hành trình khám phá Việt Nam chính thức bắt đầu',
      excerpt: 'Leo Loves Travel chính thức ra mắt! Khám phá câu chuyện về thương hiệu du lịch Việt Nam được yêu thích nhất, sứ mệnh mang đến những trải nghiệm authentic và hành trình khám phá độc đáo cho mọi du khách.',
      image: 'https://leolovestravel.com/src/assets/images/wallpaper.png',
      author: 'Leo Loves Travel Team',
      date: 'June 11, 2025',
      category: 'Leo Loves Travel Brand',
      readTime: '8 phút đọc'
    },
    {
      id: '2',
      title: '10 Lý do tại sao Leo Loves Travel là lựa chọn hàng đầu cho du lịch Việt Nam 2025',
      excerpt: 'Khám phá những lý do vì sao Leo Loves Travel trở thành thương hiệu du lịch được yêu thích nhất tại Việt Nam với hơn 10,000 khách hàng hài lòng và đánh giá 5 sao.',
      image: 'https://leolovestravel.com/src/assets/images/destinations/halong-bay.jpg',
      author: 'Leo Loves Travel Experts',
      date: 'June 10, 2025',
      category: 'Leo Loves Travel Tours',
      readTime: '6 phút đọc'
    },
    {
      id: '3',
      title: 'Hướng dẫn du lịch Việt Nam 2025: Từ A-Z với Leo Loves Travel',
      excerpt: 'Cẩm nang du lịch Việt Nam toàn diện từ Leo Loves Travel - từ thủ tục visa, thời tiết, ẩm thực đến những điểm đến không thể bỏ qua. Leo Loves Travel chia sẻ kinh nghiệm 5 năm trong ngành.',
      image: 'https://leolovestravel.com/src/assets/images/destinations/hoi-an.jpg',
      author: 'Leo Loves Travel Guide Team',
      date: 'June 9, 2025',
      category: 'Leo Loves Travel Guide',
      readTime: '12 phút đọc'
    }
  ];
    const recentPosts = [
    {
      id: '4',
      title: 'Kinh nghiệm du lịch Vịnh Hạ Long cùng Leo Loves Travel - Tour 2N1Đ đáng nhớ',
      excerpt: 'Leo Loves Travel chia sẻ kinh nghiệm thực tế và những tips hay cho chuyến du lịch Vịnh Hạ Long 2 ngày 1 đêm.',
      image: 'https://leolovestravel.com/src/assets/images/destinations/halong-bay.jpg',
      author: 'Leo Loves Travel Team',
      date: 'June 8, 2025',
      category: 'Leo Loves Travel Experience',
      readTime: '10 phút đọc'
    },
    {
      id: '5',
      title: 'Leo Loves Travel giới thiệu: Lễ hội Việt Nam không thể bỏ qua năm 2025',
      excerpt: 'Đội ngũ Leo Loves Travel tổng hợp lịch lễ hội Việt Nam và gợi ý thời điểm tốt nhất để trải nghiệm văn hóa địa phương.',
      image: 'https://images.unsplash.com/photo-1540261556739-a0b8756ce680?q=80&w=1471&auto=format&fit=crop',
      author: 'Leo Loves Travel Cultural Team',
      date: 'June 7, 2025',
      category: 'Leo Loves Travel Culture',
      readTime: '9 phút đọc'
    },
    {
      id: '6',
      title: 'Leo Loves Travel Photography Tips: Chụp ảnh đẹp tại Việt Nam',
      excerpt: 'Bí quyết chụp ảnh đẹp tại các điểm đến nổi tiếng Việt Nam từ những nhiếp ảnh gia chuyên nghiệp của Leo Loves Travel.',
      image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1374&auto=format&fit=crop',
      author: 'Leo Loves Travel Photo Team',
      date: 'June 6, 2025',
      category: 'Leo Loves Travel Tips',
      readTime: '8 phút đọc'
    },
    {
      id: '7',
      title: 'Hướng dẫn di chuyển tại Việt Nam - Leo Loves Travel Transportation Guide',
      excerpt: 'Leo Loves Travel hướng dẫn chi tiết các phương tiện di chuyển tại Việt Nam cho du khách quốc tế.',
      image: 'https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?q=80&w=1470&auto=format&fit=crop',
      author: 'Leo Loves Travel Guide',
      date: 'June 5, 2025',
      category: 'Leo Loves Travel Guide',
      readTime: '7 phút đọc'
    },
    {
      id: '8',
      title: 'Leo Loves Travel Coffee Tour: Văn hóa cà phê Việt Nam độc đáo',
      excerpt: 'Khám phá lịch sử và phương pháp pha chế độc đáo làm nên văn hóa cà phê Việt Nam cùng Leo Loves Travel.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1374&auto=format&fit=crop',
      author: 'Leo Loves Travel Food Expert',
      date: 'June 4, 2025',
      category: 'Leo Loves Travel Food',
      readTime: '6 phút đọc'
    },
    {
      id: '9',
      title: 'Leo Loves Travel Packing List: Đồ cần thiết cho du lịch Việt Nam',
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
      <SEO 
        title={pageConfigs.blog.title}
        description={pageConfigs.blog.description}
        keywords={pageConfigs.blog.keywords}
        url="https://leolovestravel.com/travel-blog"
        type="blog"
        image="https://leolovestravel.com/src/assets/images/wallpaper.png"
      />
      <StructuredData 
        type="Article"
        data={pageConfigs.blog.structuredData}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SEOBreadcrumb />        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Leo Loves Travel Blog - Vietnam Travel Stories</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Khám phá những câu chuyện, kinh nghiệm và hướng dẫn du lịch Việt Nam từ Leo Loves Travel - đội ngũ chuyên gia du lịch hàng đầu
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
                  <LazyImage 
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
                      <LazyImage 
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
                          <LazyImage 
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
