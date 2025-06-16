import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Separator } from '../components/ui/separator';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ArrowRight, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import SEOBreadcrumb from '../components/SEOBreadcrumb';
import { pageConfigs } from '../utils/seoOptimization';

const HelpCenter = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // FAQ categories and questions
  const faqCategories = [
    {
      id: 'booking',
      name: 'Booking & Reservations',
      questions: [
        {
          id: 'booking-1',
          question: 'How do I book a tour?',
          answer: 'You can book a tour by browsing our available packages, selecting your preferred tour, choosing your dates and number of guests, and completing the checkout process. Payment can be made securely online using credit/debit cards or other supported payment methods.'
        },
        {
          id: 'booking-2',
          question: 'Can I modify or cancel my booking?',
          answer: 'Yes, you can modify or cancel your booking by logging into your account and navigating to "My Bookings". Please note that modification and cancellation policies vary depending on the tour and how close to the departure date the changes are made. Some tours may have non-refundable deposits or cancellation fees.'
        },
        {
          id: 'booking-3',
          question: 'Is my booking confirmed immediately?',
          answer: 'Yes, once you complete the payment process, your booking is confirmed immediately. You will receive a confirmation email with all the details of your tour, including booking reference number, tour dates, and meeting information.'
        },
        {
          id: 'booking-4',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for certain bookings. All payments are processed securely through our payment gateway.'
        }
      ]
    },
    {
      id: 'tours',
      name: 'Tours & Experiences',
      questions: [
        {
          id: 'tours-1',
          question: 'What is included in the tour price?',
          answer: 'Tour inclusions vary by package, but generally include accommodation, transportation during the tour, guided activities, entrance fees to attractions mentioned in the itinerary, and some meals as specified. Please check the specific tour details for a complete list of inclusions.'
        },
        {
          id: 'tours-2',
          question: 'How large are the tour groups?',
          answer: 'Our tour groups typically range from 8-12 people, ensuring a personalized experience while still providing opportunities for social interaction. Some specialty tours may have smaller or larger group sizes, which will be clearly indicated in the tour details.'
        },
        {
          id: 'tours-3',
          question: 'Are your tours suitable for children?',
          answer: 'Many of our tours are family-friendly, but suitability depends on the specific tour, activities involved, and the age of the children. Each tour listing indicates whether it is suitable for families and any age restrictions that may apply.'
        }
      ]
    },
    {
      id: 'travel',
      name: 'Travel Information',
      questions: [
        {
          id: 'travel-1',
          question: 'Do I need a visa to visit Vietnam?',
          answer: 'Visa requirements depend on your nationality and the length of your stay. Many countries are eligible for visa exemptions for stays up to 15 days, while others require a visa in advance or a visa on arrival. We recommend checking with the Vietnamese embassy or consulate in your country for the most up-to-date information.'
        },
        {
          id: 'travel-2',
          question: 'What is the best time to visit Vietnam?',
          answer: 'Vietnam has a diverse climate due to its length. Generally, the best time to visit is during the spring (February to April) and autumn (August to October) when temperatures are more moderate and rainfall is lighter. However, different regions have different optimal visiting times, so it depends on which areas you plan to explore.'
        },
        {
          id: 'travel-3',
          question: 'What currency is used in Vietnam?',
          answer: 'The official currency of Vietnam is the Vietnamese Dong (VND). While some tourist areas and high-end establishments may accept US dollars, it\'s recommended to have local currency for most transactions. ATMs are widely available in cities and tourist areas.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Profile',
      questions: [
        {
          id: 'account-1',
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button in the top right corner of our website. You\'ll need to provide your email address and create a password. You can also sign up using your Google or Facebook account for quicker access.'
        },
        {
          id: 'account-2',
          question: 'How can I reset my password?',
          answer: 'If you\'ve forgotten your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you instructions to reset your password.'
        },
        {
          id: 'account-3',
          question: 'Can I update my personal information?',
          answer: 'Yes, you can update your personal information by logging into your account and navigating to the "Profile" section. Here you can edit your name, contact details, preferences, and other account information.'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;
  
  return (
    <>
      <SEO
        title={pageConfigs.helpCenter.title}
        description={pageConfigs.helpCenter.description}
        keywords={pageConfigs.helpCenter.keywords}
        url="https://leolovestravel.com/help-center"
        type="website"
      />
      <StructuredData
        type="Organization"
        data={pageConfigs.helpCenter.structuredData}      />
      
      <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} pt-24 pb-16`}>
        <SEOBreadcrumb />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Find answers to frequently asked questions or contact our support team for assistance with your Vietnamese travel experience.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search for answers..." 
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="faq" className="w-full mb-12">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="support">Support Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <div className="sticky top-24 space-y-2">
                    <h3 className="font-semibold mb-4">Categories</h3>
                    {faqCategories.map(category => (
                      <Button 
                        key={category.id}
                        variant="ghost" 
                        className="w-full justify-start text-left"
                        onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-3 space-y-8">
                  {filteredFAQs.length > 0 ? (
                    filteredFAQs.map(category => (
                      <div key={category.id} id={category.id}>
                        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map(faq => (
                            <AccordionItem key={faq.id} value={faq.id}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <HelpCircle className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        We couldn't find any FAQs matching your search. Try different keywords or contact our support team.
                      </p>
                      <Button className="bg-[#0093DE] hover:bg-[#007ab8]">
                        Contact Support
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First Name</label>
                          <Input placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last Name</label>
                          <Input placeholder="Enter your last name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="What is your message about?" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea 
                          className="w-full min-h-[150px] p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#0093DE] hover:bg-[#007ab8]">
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>
                        Reach out to us directly using the information below.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-[#0093DE] mt-0.5" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-gray-600 dark:text-gray-400">+84 (28) 3822 8898</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            Available Mon-Fri, 9am-6pm (GMT+7)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-[#0093DE] mt-0.5" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-gray-600 dark:text-gray-400">support@leolovestravel.com</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            We aim to respond within 24 hours
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MessageCircle className="h-5 w-5 mr-3 text-[#0093DE] mt-0.5" />
                        <div>
                          <p className="font-medium">Live Chat</p>
                          <p className="text-gray-600 dark:text-gray-400">Available on our website</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            Chat with our team in real-time
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Office Locations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">Ho Chi Minh City (Headquarters)</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 Nguyen Hue Boulevard, District 1<br />
                          Ho Chi Minh City, Vietnam
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Hanoi Office</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          45 Hang Bai Street, Hoan Kiem District<br />
                          Hanoi, Vietnam
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#0093DE]/10 flex items-center justify-center mb-2">
                      <HelpCircle className="h-6 w-6 text-[#0093DE]" />
                    </div>
                    <CardTitle>Self-Service Help</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Find answers quickly in our comprehensive knowledge base and FAQ section.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" className="group">
                      Browse FAQs <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#0093DE]/10 flex items-center justify-center mb-2">
                      <MessageCircle className="h-6 w-6 text-[#0093DE]" />
                    </div>
                    <CardTitle>Live Chat Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Chat with our support team in real-time for immediate assistance with your queries.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button className="bg-[#0093DE] hover:bg-[#007ab8]">
                      Start Chat
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#0093DE]/10 flex items-center justify-center mb-2">
                      <Phone className="h-6 w-6 text-[#0093DE]" />
                    </div>
                    <CardTitle>Phone Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Speak directly with our travel experts for personalized assistance and advice.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">
                      +84 (28) 3822 8898
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Common Support Topics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-between h-auto py-4">
                    <span>Booking Modifications</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-4">
                    <span>Cancellation Policy</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-4">
                    <span>Payment Issues</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-4">
                    <span>Tour Information</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-4">
                    <span>Travel Documentation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-4">
                    <span>Account Management</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-12" />
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Our dedicated support team is ready to assist you with any questions or concerns about your Vietnamese travel experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#0093DE] hover:bg-[#007ab8]">
                <Mail className="mr-2 h-4 w-4" /> Email Support
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" /> Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
