import { useState } from 'react';
import { useTours } from '../../contexts/ToursContext';
import { useTheme } from '../../contexts/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Settings, BarChart3, List, Users, DollarSign, MapPin, Clock, Star, Eye, Edit, Trash2, PlusCircle, Upload, Download, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { tours } = useTours();
  const { theme } = useTheme();
  
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
    <div className={`w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 mt-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Admin Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tours">Tour Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
                <List className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTours}</div>
                <p className="text-xs text-muted-foreground">+2 tours from last month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Tours</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{featuredTours}</div>
                <p className="text-xs text-muted-foreground">+1 featured this week</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">New 'Adventure' category added</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${averagePrice.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Slight increase from last quarter</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Monthly Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyBookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bookings" stroke="#0093DE" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Tours by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tourCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#0093DE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Recent Tours Added</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tours.slice(-5).reverse().map((tour) => (
                    <TableRow key={tour.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="font-medium">{tour.name}</TableCell>
                      <TableCell>{tour.location}</TableCell>
                      <TableCell>${tour.price}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{tour.category || 'Uncategorized'}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/tour/${tour.id}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                           <Link to={`/admin/tour-management?edit=${tour.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours">
           <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Tour Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Manage all aspects of your tours from the dedicated Tour Management page.</p>
              <Button asChild>
                <Link to="/admin/tour-management">
                  <List className="mr-2 h-4 w-4" /> Open Tour Management
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-[#0093DE]" /> Access Control
                </h3>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="require-login" defaultChecked className="form-checkbox h-5 w-5 text-[#0093DE] rounded" />
                  <label htmlFor="require-login" className="text-sm font-medium">Require login for admin access</label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-[#0093DE]" /> Data Management
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auto-backup" defaultChecked className="form-checkbox h-5 w-5 text-[#0093DE] rounded" />
                    <label htmlFor="auto-backup" className="text-sm font-medium">Enable automatic daily data backup</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="confirm-delete" defaultChecked className="form-checkbox h-5 w-5 text-[#0093DE] rounded" />
                    <label htmlFor="confirm-delete" className="text-sm font-medium">Require confirmation before deleting tours</label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Download className="mr-2 h-5 w-5 text-[#0093DE]" /> Export Data
                </h3>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export Tours as CSV
                </Button>
              </div>

              <div className="pt-6 border-t dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-red-600">
                  <AlertTriangle className="mr-2 h-5 w-5" /> Danger Zone
                </h3>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Reset to Default Tours
                </Button>
                <p className="text-xs text-muted-foreground mt-2">This action cannot be undone.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

