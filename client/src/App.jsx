import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { checkBackend } from './services/api';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import TripPlanner from './pages/TripPlanner';
import BudgetAnalyzer from './pages/BudgetAnalyzer';
import BudgetCompare from './pages/BudgetCompare';
import Experiences from './pages/Experiences';
import ExperienceDetails from './pages/ExperienceDetails';
import AddExperience from './pages/AddExperience';
import SavedTrips from './pages/SavedTrips';
import HowItWorks from './pages/HowItWorks';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import EditTrip from './pages/EditTrip';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CommunityGuidelines from './pages/CommunityGuidelines';
import About from './pages/About';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
        <Route path="/destination/:id" element={<PageWrapper><DestinationDetails /></PageWrapper>} />
        <Route path="/plan" element={<PageWrapper><TripPlanner /></PageWrapper>} />
        <Route path="/analyzer" element={<PageWrapper><BudgetAnalyzer /></PageWrapper>} />
        <Route path="/compare" element={<PageWrapper><BudgetCompare /></PageWrapper>} />
        <Route path="/experiences" element={<PageWrapper><Experiences /></PageWrapper>} />
        <Route path="/experience/:id" element={<PageWrapper><ExperienceDetails /></PageWrapper>} />
        <Route path="/experiences/new" element={<PageWrapper><AddExperience /></PageWrapper>} />
        <Route path="/saved" element={<PageWrapper><SavedTrips /></PageWrapper>} />
        <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
        <Route path="/community-guidelines" element={<PageWrapper><CommunityGuidelines /></PageWrapper>} />
        <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <PageWrapper><Dashboard /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/trip/:id/edit" element={
          <ProtectedRoute>
            <PageWrapper><EditTrip /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <PageWrapper><Profile /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <PageWrapper>
            <div className="min-h-screen flex items-center justify-center bg-surface">
              <div className="text-center">
                <h1 className="text-6xl font-display font-bold text-primary-500 mb-4">404</h1>
                <p className="text-xl text-muted mb-8">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </div>
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    checkBackend()
      .then((data) => console.log('✅ Backend connected:', data))
      .catch((error) => console.error('❌ Backend connection failed:', error));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;