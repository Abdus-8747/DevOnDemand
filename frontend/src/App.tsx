import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import SubmissionPage from './components/SubmissionPage';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
