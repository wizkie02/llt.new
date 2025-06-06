import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToursProvider } from './contexts/ToursContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Layout from './components/layout/Layout';
import LiveChat from './components/ui/LiveChat';
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute';
import HomePage from './pages/HomePage';
import PackageTours from './pages/PackageTours';
import TravelServices from './pages/TravelServices';
import TeamBuilding from './pages/TeamBuilding';
import Events from './pages/Events';
import RomanticTravel from './pages/RomanticTravel';
import MedicalTravel from './pages/MedicalTravel';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPasswordReset from './pages/admin/AdminPasswordReset';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTourManagement from './pages/admin/AdminTourManagement';
import AdminCategoryManagement from './pages/admin/AdminCategoryManagement';
import AdminAccountManagement from './pages/admin/AdminAccountManagement';
import AdminSystemTest from './pages/admin/AdminSystemTest';
import TourDetail from './pages/TourDetail';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import UserProfile from './pages/UserProfile';
import HelpCenter from './pages/HelpCenter';
import TravelBlog from './pages/TravelBlog';
import InteractiveMap from './pages/InteractiveMap';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ToursProvider>
        <AuthProvider>
          <Router>
            <Header />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/package-tours" element={<PackageTours />} />
                <Route path="/travel-services" element={<TravelServices />} />
                <Route path="/team-building" element={<TeamBuilding />} />
                <Route path="/events" element={<Events />} />
                <Route path="/romantic-travel" element={<RomanticTravel />} />
                <Route path="/medical-travel" element={<MedicalTravel />} />
                <Route path="/about" element={<About />} />                <Route path="/contact" element={<Contact />} />
                
                {/* Admin login route - not protected */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/reset-password" element={<AdminPasswordReset />} />
                
                {/* Protected admin routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route 
                  path="/admin/tour-management" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminTourManagement />
                    </ProtectedAdminRoute>
                  } 
                />                <Route 
                  path="/admin/category-management" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminCategoryManagement />
                    </ProtectedAdminRoute>
                  } 
                />                <Route 
                  path="/admin/account-management" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminAccountManagement />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route 
                  path="/admin/system-test" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminSystemTest />
                    </ProtectedAdminRoute>
                  } 
                />
                
                <Route path="/tour/:id" element={<TourDetail />} />
                <Route path="/booking" element={<Booking />} />
                <Route
                  path="/booking-confirmation"
                  element={<BookingConfirmation />}
                />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/blog" element={<TravelBlog />} />
                <Route path="/blog/post/:id" element={<TravelBlog />} />
                <Route path="/blog/category/:category" element={<TravelBlog />} />
                <Route path="/explore-map" element={<InteractiveMap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <Footer />
            <LiveChat />
          </Router>
        </AuthProvider>
      </ToursProvider>
    </ThemeProvider>
  );
}

export default App;
