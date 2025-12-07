import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

export type RoomId = 'foundation' | 'livingArchive' | 'projectsLedger' | 'preservationNetwork' | 'signals';

interface RoomCopy {
  readonly title: { en: string; ar: string };
  readonly subtitle: { en: string; ar: string };
}

export interface RoomDefinition extends RoomCopy {
  readonly id: RoomId;
}

export const ROOM_DEFINITIONS: RoomDefinition[] = [
  {
    id: 'foundation',
    title: {
      en: 'Foundation',
      ar: 'المؤسسة',
    },
    subtitle: {
      en: 'Custodianship, studios, research',
      ar: 'الوصاية والاستوديوهات والبحث',
    },
  },
  {
    id: 'livingArchive',
    title: {
      en: 'Living Archive',
      ar: 'واجهة الأرشيف الحي',
    },
    subtitle: {
      en: 'Interface and prompts',
      ar: 'الواجهة والتلميحات',
    },
  },
  {
    id: 'projectsLedger',
    title: {
      en: 'Projects Ledger',
      ar: 'دفتر المشاريع',
    },
    subtitle: {
      en: 'Commissions in progress',
      ar: 'التكليفات قيد التطوير',
    },
  },
  {
    id: 'preservationNetwork',
    title: {
      en: 'Preservation Network',
      ar: 'شبكة الحفظ',
    },
    subtitle: {
      en: 'Mobile studios & bridges',
      ar: 'استوديوهات متنقلة وجسور',
    },
  },
  {
    id: 'signals',
    title: {
      en: 'Signals',
      ar: 'إشارات',
    },
    subtitle: {
      en: 'Contact & invitations',
      ar: 'التواصل والدعوات',
    },
  },
];

export const ROOM_SEQUENCE = ROOM_DEFINITIONS.map(room => room.id);

const initialNodes: Record<RoomId, HTMLElement | null> = {
  foundation: null,
  livingArchive: null,
  projectsLedger: null,
  preservationNetwork: null,
  signals: null,
};

const toPixels = (rawValue: string, rootFontSize: number) => {
  const value = rawValue.trim();
  if (!value) return 0;

  if (value.endsWith('rem')) {
    const remValue = Number.parseFloat(value.replace('rem', ''));
    return Number.isFinite(remValue) ? remValue * rootFontSize : 0;
  }

  if (value.endsWith('px')) {
    const pxValue = Number.parseFloat(value.replace('px', ''));
    return Number.isFinite(pxValue) ? pxValue : 0;
  }

  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const getScrollOffset = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 0;
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const rootFontSize = Number.parseFloat(rootStyles.fontSize) || 16;
  const header = toPixels(rootStyles.getPropertyValue('--header-height'), rootFontSize);
  const gutter = toPixels(rootStyles.getPropertyValue('--space-6'), rootFontSize);
  return header + gutter;
};

interface RoomsContextValue {
  readonly activeRoom: RoomId | null;
  readonly rooms: RoomDefinition[];
  registerRoom: (id: RoomId, node: HTMLElement | null) => void;
  scrollToRoom: (id: RoomId) => void;
}

const RoomsContext = createContext<RoomsContextValue | undefined>(undefined);

export function RoomsProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [roomNodes, setRoomNodes] = useState(initialNodes);
  const [activeRoom, setActiveRoom] = useState<RoomId | null>(null);
  const activeRoomRef = useRef<RoomId | null>(null);

  const registerRoom = useCallback((id: RoomId, node: HTMLElement | null) => {
    if (node) {
      node.dataset.roomId = id;
    }
    setRoomNodes(prev => (prev[id] === node ? prev : { ...prev, [id]: node }));
  }, []);

  const scrollToRoom = useCallback((id: RoomId) => {
    const node = roomNodes[id];
    if (!node) return;

    if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveRoom(id);
      return;
    }

    const offset = getScrollOffset();
    const nodeTop = node.getBoundingClientRect().top + window.scrollY - offset;
    const targetTop = Math.max(nodeTop, 0);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    setActiveRoom(id);
  }, [roomNodes]);

  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let animationFrame: number | null = null;

    const pickActiveRoom = () => {
      animationFrame = null;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const anchorLine = viewportHeight * 0.3;
      const visibilityThreshold = 0.18;

      let bestByVisibility: { id: RoomId; ratio: number } | null = null;
      let fallbackByDistance: { id: RoomId; distance: number } | null = null;

      for (const roomId of ROOM_SEQUENCE) {
        const node = roomNodes[roomId];
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        const height = rect.height || node.offsetHeight || 1;
        const intersection = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visiblePixels = Math.max(0, intersection);
        const ratio = visiblePixels / height;

        if (!bestByVisibility || ratio > bestByVisibility.ratio + 0.05) {
          bestByVisibility = { id: roomId, ratio };
        }

        const distance = Math.abs(rect.top - anchorLine);
        if (!fallbackByDistance || distance < fallbackByDistance.distance) {
          fallbackByDistance = { id: roomId, distance };
        }
      }

      let nextRoom: RoomId | null = null;

      if (bestByVisibility && bestByVisibility.ratio >= visibilityThreshold) {
        nextRoom = bestByVisibility.id;
      } else if (fallbackByDistance) {
        nextRoom = fallbackByDistance.id;
      } else {
        nextRoom = ROOM_SEQUENCE.find(id => roomNodes[id]) ?? null;
      }

      if (document?.documentElement) {
        const nearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 2);
        if (nearBottom) {
          const lastRoom = [...ROOM_SEQUENCE].reverse().find(id => roomNodes[id]);
          if (lastRoom) {
            nextRoom = lastRoom;
          }
        }
      }

      if (nextRoom && nextRoom !== activeRoomRef.current) {
        setActiveRoom(nextRoom);
      }
    };

    const requestUpdate = () => {
      if (animationFrame !== null) {
        return;
      }
      animationFrame = window.requestAnimationFrame(pickActiveRoom);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate, { once: true });
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('load', requestUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [roomNodes]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (activeRoom) {
      document.body.dataset.activeRoom = activeRoom;
      return;
    }
    delete document.body.dataset.activeRoom;
  }, [activeRoom]);

  const value = useMemo(() => ({
    activeRoom,
    rooms: ROOM_DEFINITIONS,
    registerRoom,
    scrollToRoom,
  }), [activeRoom, registerRoom, scrollToRoom]);

  return (
    <RoomsContext.Provider value={value}>
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  const ctx = useContext(RoomsContext);
  if (!ctx) {
    throw new Error('useRooms must be used within a RoomsProvider');
  }
  return ctx;
}

export function useRoomAnchor(id: RoomId) {
  const { registerRoom } = useRooms();
  return useCallback((node: HTMLElement | null) => {
    registerRoom(id, node);
  }, [id, registerRoom]);
}
