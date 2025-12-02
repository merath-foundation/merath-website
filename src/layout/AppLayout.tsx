import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Sidebar />
      <main id="main-content">{children}</main>
      <footer className="app-footer">
        <p>© 2025 MERATH</p>
      </footer>
    </div>
  );
}
