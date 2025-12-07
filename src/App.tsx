import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { LivingArchiveProvider } from './contexts/LivingArchiveContext';
import { LayoutShell } from './layout/AppLayout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Archive } from './pages/Archive';
import { About } from './pages/About';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <LivingArchiveProvider>
          <HashRouter>
            <LayoutShell>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </LayoutShell>
          </HashRouter>
        </LivingArchiveProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
