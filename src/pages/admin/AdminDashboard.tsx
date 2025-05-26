import { useTours } from '../../contexts/ToursContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Settings, BarChart3, List, Users, DollarSign, MapPin, Clock, Star, Eye, Edit, Trash2, Upload, Download, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { tours } = useTours();
  
  // Calculate statistics
  const totalTours = tours.length;
  const featuredTours = tours.filter(tour => tour.featured).length;
  const categories = [...new Set(tours.map(tour => tour.category || 'Uncategorized'))];
  const averagePrice = tours.length > 0 
    ? tours.reduce((sum, tour) => sum + tour.price, 0) / tours.length 
    : 0;

  // Placeholder data for charts
  const monthlyBookingsData = [
    { month: 'Jan', bookings: 65 },
    { month: 'Feb', bookings: 59 },
    { month: 'Mar', bookings: 80 },
    { month: 'Apr', bookings: 81 },
    { month: 'May', bookings: 56 },
    { month: 'Jun', bookings: 55 },
  ];

  const tourCategoryData = categories.map(category => ({
    name: category,
    count: tours.filter(tour => tour.category === category).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 pt-16">
      {/* Simple Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your tours, bookings, and business analytics
          </p>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl border-0 p-2 h-16">
              <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white font-medium transition-all duration-300 py-4 text-base">
                Overview
              </TabsTrigger>
              <TabsTrigger value="tours" className="rounded-xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white font-medium transition-all duration-300 py-4 text-base">
                Tour Management
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-[#0093DE] data-[state=active]:text-white font-medium transition-all duration-300 py-4 text-base">
                Settings
              </TabsTrigger>
            </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tours</CardTitle>
                <div className="p-2 bg-[#0093DE]/10 rounded-lg">
                  <List className="h-5 w-5 text-[#0093DE]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalTours}</div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">+2 tours from last month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Tours</CardTitle>
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{featuredTours}</div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">+1 featured this week</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</CardTitle>
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">New 'Adventure' category added</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Price</CardTitle>
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">${averagePrice.toFixed(2)}</div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Slight increase from last quarter</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0093DE]/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="p-2 bg-[#0093DE]/10 rounded-lg mr-3">
                    <BarChart3 className="h-6 w-6 text-[#0093DE]" />
                  </div>
                  Monthly Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyBookingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#0093DE" 
                      strokeWidth={3}
                      activeDot={{ r: 8, fill: '#0093DE' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <div className="p-2 bg-green-500/10 rounded-lg mr-3">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  </div>
                  Tours by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tourCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#0093DE" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                Recent Tours Added
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50 border-b">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Price</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Category</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tours.slice(-5).reverse().map((tour) => (
                    <TableRow key={tour.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent transition-all duration-200 border-b border-gray-100 dark:border-gray-800">
                      <TableCell className="font-medium text-gray-900 dark:text-white py-4">{tour.name}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{tour.location}</TableCell>
                      <TableCell className="font-bold text-[#0093DE]">${tour.price}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-[#0093DE]/10 text-[#0093DE] border-[#0093DE]/30 font-medium">
                          {tour.category || 'Uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-lg">
                            <Link to={`/tour/${tour.id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild className="hover:bg-green-50 hover:text-green-600 transition-all duration-200 rounded-lg">
                             <Link to={`/admin/tour-management?edit=${tour.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours">
           <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#0093DE]/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-[#0093DE]/10 rounded-lg mr-3">
                  <List className="h-6 w-6 text-[#0093DE]" />
                </div>
                Tour Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg">Manage all aspects of your tours from the dedicated Tour Management page.</p>
              <Button asChild className="bg-[#0093DE] hover:bg-[#0077b3] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-xl">
                <Link to="/admin/tour-management">
                  <List className="mr-2 h-5 w-5" /> Open Tour Management
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-transparent p-6 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <div className="p-2 bg-purple-500/10 rounded-lg mr-3">
                  <Settings className="h-6 w-6 text-purple-500" />
                </div>
                Admin Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-blue-500/10 rounded-xl mr-3">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  Access Control
                </h3>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="require-login" defaultChecked className="h-5 w-5 text-[#0093DE] bg-gray-100 border-gray-300 rounded-lg focus:ring-[#0093DE] focus:ring-2" />
                  <label htmlFor="require-login" className="text-sm font-medium text-gray-700 dark:text-gray-300">Require login for admin access</label>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-green-500/10 rounded-xl mr-3">
                    <Upload className="h-5 w-5 text-green-500" />
                  </div>
                  Data Management
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="auto-backup" defaultChecked className="h-5 w-5 text-[#0093DE] bg-gray-100 border-gray-300 rounded-lg focus:ring-[#0093DE] focus:ring-2" />
                    <label htmlFor="auto-backup" className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable automatic daily data backup</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="confirm-delete" defaultChecked className="h-5 w-5 text-[#0093DE] bg-gray-100 border-gray-300 rounded-lg focus:ring-[#0093DE] focus:ring-2" />
                    <label htmlFor="confirm-delete" className="text-sm font-medium text-gray-700 dark:text-gray-300">Require confirmation before deleting tours</label>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-900/20 dark:to-transparent p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <div className="p-2 bg-yellow-500/10 rounded-xl mr-3">
                    <Download className="h-5 w-5 text-yellow-500" />
                  </div>
                  Export Data
                </h3>
                <Button variant="outline" className="border-[#0093DE] text-[#0093DE] hover:bg-[#0093DE] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl">
                  <Download className="mr-2 h-4 w-4" /> Export Tours as CSV
                </Button>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-900/20 dark:to-transparent p-6 rounded-xl border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-red-600">
                  <div className="p-2 bg-red-500/10 rounded-xl mr-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  Danger Zone
                </h3>
                <Button variant="destructive" className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                  <Trash2 className="mr-2 h-4 w-4" /> Reset to Default Tours
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">This action cannot be undone and will remove all custom tours.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</div>
  );
};

export default AdminDashboard;

