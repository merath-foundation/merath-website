import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOM_SEQUENCE, useRooms, type RoomId } from '../contexts/RoomsContext';
import { FoundationRoom, LivingArchiveRoom, ProjectsLedgerRoom, PreservationNetworkRoom, SignalsRoom } from './home/rooms';

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

  useEffect(() => {
    const state = location.state as RoomNavigationState;
    const params = new URLSearchParams(queryString);
    const roomParam = params.get('room');
    const searchRoom = ROOM_SEQUENCE.includes(roomParam as RoomId) ? roomParam as RoomId : null;
    const targetRoom = state?.targetRoom ?? searchRoom;

    if (targetRoom && targetRoom !== activeRoom) {
      scrollToRoom(targetRoom);
    }

    if (state?.targetRoom) {
      const cleanPath = location.pathname.split('?')[0];
      navigate({ pathname: cleanPath, search: location.search }, { replace: true, state: null });
    }
  }, [location, navigate, scrollToRoom, activeRoom, queryString]);

  return (
    <div className="home-page rooms-stack">
      <FoundationRoom />
      <LivingArchiveRoom />
      <ProjectsLedgerRoom />
      <PreservationNetworkRoom />
      <SignalsRoom />
    </div>
  );
}
