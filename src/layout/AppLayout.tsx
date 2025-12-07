import { ReactNode, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollProgress } from '../components/ScrollProgress';
import { OuroborosMenuButton } from '../components/navigation/OuroborosMenuButton';
import { SideNav } from '../components/navigation/SideNav';
import { useLanguage } from '../contexts/LanguageContext';
import { RoomsProvider, useRooms, type RoomId } from '../contexts/RoomsContext';

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: Readonly<LayoutShellProps>) {
  return (
    <RoomsProvider>
      <LayoutChrome>{children}</LayoutChrome>
    </RoomsProvider>
  );
}

const getQueryString = (search: string, path: string) => {
  if (search) return search;
  const idx = path.indexOf('?');
  if (idx >= 0) return path.slice(idx);

  if (typeof window !== 'undefined') {
    const hash = window.location.hash ?? '';
    const hashIdx = hash.indexOf('?');
    if (hashIdx >= 0) {
      return hash.slice(hashIdx);
    }
  }

  return '';
};

const getCleanPath = (path: string) => path.split('?')[0];

function LayoutChrome({ children }: Readonly<LayoutShellProps>) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { rooms, scrollToRoom, activeRoom } = useRooms();
  const [hasUrlSettled, setHasUrlSettled] = useState(false);

  const langKey = (language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const roomNavItems = rooms.map((room, index) => ({
    id: room.id,
    label: room.title[langKey],
    subtitle: room.subtitle[langKey],
    indexNumber: String(index + 1).padStart(2, '0'),
  }));

  const panelId = 'merath-side-nav';
  const localeDirection = language === 'ar' ? 'rtl' : 'ltr';
  const triggerLabel = language === 'en' ? 'Open navigation menu' : 'افتح قائمة التصفح';
  const heading = language === 'en' ? 'Foundation navigation' : 'تنقل المؤسسة';

  const toggleNav = () => setIsNavOpen(prev => !prev);

  const handleRoomSelect = (roomId: RoomId) => {
    setIsNavOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { targetRoom: roomId } });
      return;
    }
    scrollToRoom(roomId);
  };

  useEffect(() => {
    if (!isNavOpen) {
      menuButtonRef.current?.focus({ preventScroll: true });
    }
  }, [isNavOpen]);

  useEffect(() => {
    if (hasUrlSettled) {
      return;
    }

    const query = getQueryString(location.search, location.pathname);
    const params = new URLSearchParams(query);
    const roomParam = params.get('room');

    if (!roomParam) {
      setHasUrlSettled(true);
      return;
    }

    if (activeRoom && roomParam === activeRoom) {
      setHasUrlSettled(true);
    }
  }, [hasUrlSettled, activeRoom, location.pathname, location.search]);

  useEffect(() => {
    if (!hasUrlSettled || location.pathname !== '/' || !activeRoom) {
      return;
    }

    const query = getQueryString(location.search, location.pathname);
    const params = new URLSearchParams(query);
    if (params.get('room') === activeRoom) {
      return;
    }
    params.set('room', activeRoom);
    const searchString = params.toString();
    const cleanPath = getCleanPath(location.pathname);
    navigate({ pathname: cleanPath, search: searchString ? `?${searchString}` : '' }, { replace: true, state: location.state });
  }, [hasUrlSettled, activeRoom, location.pathname, location.search, location.state, navigate]);

  return (
    <div className="layout-shell" data-dir={localeDirection} data-nav-open={isNavOpen}>
      <ScrollProgress />

      <div className="ouroboros-anchor">
        <OuroborosMenuButton
          ref={menuButtonRef}
          isOpen={isNavOpen}
          onToggle={toggleNav}
          controlsId={panelId}
          label={triggerLabel}
        />
        <button
          type="button"
          className="language-toggle"
          data-lang-toggle
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
        >
          {language === 'en' ? 'AR' : 'EN'}
        </button>
      </div>

      <SideNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        panelId={panelId}
        heading={heading}
        localeDirection={localeDirection}
        rooms={roomNavItems}
        activeRoom={activeRoom}
        onSelectRoom={handleRoomSelect}
      />

      <main id="main-content" className="site-content">
        {children}
      </main>
    </div>
  );
}

export const AppLayout = LayoutShell;
