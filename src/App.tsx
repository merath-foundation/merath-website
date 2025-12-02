<<<<<<< HEAD
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppLayout } from './layout/AppLayout';
import { Home } from './pages/Home';
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { Snake } from './components/Snake';
import { PageTransition } from './components/PageTransition';
import { Landing } from './pages/Landing';
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Archive } from './pages/Archive';
import { About } from './pages/About';

<<<<<<< HEAD
function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AppLayout>
      </HashRouter>
=======
function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <Snake />
      <PageTransition location={location}>
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
    </LanguageProvider>
  );
}

export default App;
