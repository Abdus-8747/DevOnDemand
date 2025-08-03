import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import SubmissionPage from './components/SubmissionPage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import RequireAdminAuth from './components/RequireAdminAuth';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <StatsSection />
                <FeaturedProjects />
                <AboutSection />
                <TestimonialsSection />
                <Footer />
              </>
            } />
            <Route path="/submit" element={<SubmissionPage />} />
            <Route path="/admin" element={
              <RequireAdminAuth>
                <AdminPanel />
              </RequireAdminAuth>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;