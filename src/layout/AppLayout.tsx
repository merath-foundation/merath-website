import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ScrollProgress } from '../components/ScrollProgress';

export function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="app-root">
      <ScrollProgress />
      <Sidebar />
      <main id="main-content">{children}</main>
      <footer className="app-footer">
        <p>© 2025 MERATH</p>
      </footer>
    </div>
  );
}
