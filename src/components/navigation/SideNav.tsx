import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import type { RoomId } from '../../contexts/RoomsContext';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  panelId: string;
  heading: string;
  localeDirection: 'ltr' | 'rtl';
  rooms: Array<{ id: RoomId; label: string; subtitle: string; indexNumber: string }>;
  activeRoom: RoomId | null;
  onSelectRoom: (id: RoomId) => void;
}

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function SideNav({ isOpen, onClose, rooms, panelId, heading, localeDirection, activeRoom, onSelectRoom }: SideNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const panelVariants = useMemo(() => ({
    hidden: { x: localeDirection === 'rtl' ? '100%' : '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: localeDirection === 'rtl' ? '100%' : '-100%', opacity: 0 },
  }), [localeDirection]);

  useEffect(() => {
    if (!isOpen) return;

    const panelEl = panelRef.current;
    if (!panelEl) return;

    const focusableSelectors = 'a[href], button:not([disabled]), [tabindex="0"]';
    const focusable = Array.from(panelEl.querySelectorAll<HTMLElement>(focusableSelectors));
    focusable[0]?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
        return;
      }

      if (document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="side-nav__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            id={panelId}
            className={`side-nav ${localeDirection === 'rtl' ? 'side-nav--rtl' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={heading}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="side-nav__inner">
              <div className="side-nav__header">
                <p className="side-nav__eyebrow">{heading}</p>
                <button type="button" className="side-nav__close" onClick={onClose} aria-label="Close navigation">
                  <span />
                  <span />
                </button>
              </div>

              <nav aria-label={heading}>
                <ul className="side-nav__list">
                  {rooms.map((room, index) => {
                    const isActive = room.id === activeRoom;
                    return (
                      <motion.li
                        key={room.id}
                        custom={index}
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        className="side-nav__item"
                      >
                        <button
                          type="button"
                          className={`side-nav__link ${isActive ? 'side-nav__link--active' : ''}`}
                          data-dir={localeDirection}
                          onClick={() => onSelectRoom(room.id)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span className="side-nav__halo" aria-hidden />
                          <span className="side-nav__index-block">
                            <span className="side-nav__index">{room.indexNumber}</span>
                            <span className="side-nav__index-dot" aria-hidden />
                          </span>
                          <span className="side-nav__descriptor">
                            <span className="side-nav__label">{room.label}</span>
                            <span className="side-nav__subtitle">{room.subtitle}</span>
                          </span>
                          <span className="side-nav__chevron" aria-hidden />
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
