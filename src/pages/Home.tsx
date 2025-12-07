import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOM_SEQUENCE, useRooms, type RoomId } from '../contexts/RoomsContext';
import { FoundationRoom, AboutRoom } from './home/rooms';

type RoomNavigationState = { targetRoom?: RoomId } | null;

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

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollToRoom, activeRoom } = useRooms();
  const queryString = getQueryString(location.search, location.pathname);
  const lastQueryRef = useRef<string | null>(null);
  const cleanPath = location.pathname.split('?')[0];

  useEffect(() => {
    const state = location.state as RoomNavigationState;
    if (state?.targetRoom && state.targetRoom !== activeRoom) {
      scrollToRoom(state.targetRoom);
    }

    if (state?.targetRoom) {
      navigate({ pathname: cleanPath, search: location.search }, { replace: true, state: null });
      return;
    }

    const queryChanged = lastQueryRef.current !== queryString;
    lastQueryRef.current = queryString;
    if (!queryChanged) {
      return;
    }

    const params = new URLSearchParams(queryString);
    const roomParam = params.get('room');
    const searchRoom = ROOM_SEQUENCE.includes(roomParam as RoomId) ? roomParam as RoomId : null;

    if (searchRoom) {
      if (searchRoom !== activeRoom) {
        scrollToRoom(searchRoom);
      }

      params.delete('room');
      const nextSearch = params.toString();
      navigate(
        {
          pathname: cleanPath,
          search: nextSearch ? `?${nextSearch}` : '',
        },
        { replace: true, state: location.state }
      );
    }
  }, [location, navigate, scrollToRoom, activeRoom, queryString, cleanPath]);

  return (
    <div className="home-page rooms-stack">
      <FoundationRoom />
      <AboutRoom />
    </div>
  );
}
