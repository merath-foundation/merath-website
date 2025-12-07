import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ArchiveStatus = 'idle' | 'active' | 'paused' | 'complete';

interface LivingArchiveSnapshot {
  readonly promptLabel: string | null;
  readonly projectId: string | null;
  readonly collectedCount: number;
  readonly totalCount: number;
  readonly status: ArchiveStatus;
}

interface ArchiveReport extends LivingArchiveSnapshot {
  readonly tempo: ArchiveStatus;
}

interface LivingArchiveContextValue extends LivingArchiveSnapshot {
  readonly tempo: ArchiveStatus;
  reportState: (snapshot: ArchiveReport) => void;
}

const defaultSnapshot: LivingArchiveSnapshot = {
  promptLabel: null,
  projectId: null,
  collectedCount: 0,
  totalCount: 0,
  status: 'idle',
};

const LivingArchiveContext = createContext<LivingArchiveContextValue | undefined>(undefined);

export function LivingArchiveProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [snapshot, setSnapshot] = useState<LivingArchiveSnapshot>(defaultSnapshot);
  const [tempo, setTempo] = useState<ArchiveStatus>('idle');

  const reportState = useCallback((next: ArchiveReport) => {
    setSnapshot({
      promptLabel: next.promptLabel,
      projectId: next.projectId,
      collectedCount: next.collectedCount,
      totalCount: next.totalCount,
      status: next.status,
    });
    setTempo(next.tempo);
  }, []);

  useEffect(() => {
    document.body.dataset.archiveTempo = tempo;
    return () => {
      delete document.body.dataset.archiveTempo;
    };
  }, [tempo]);

  const value = useMemo(() => ({
    ...snapshot,
    tempo,
    reportState,
  }), [snapshot, tempo, reportState]);

  return (
    <LivingArchiveContext.Provider value={value}>
      {children}
    </LivingArchiveContext.Provider>
  );
}

export function useLivingArchive() {
  const ctx = useContext(LivingArchiveContext);
  if (!ctx) {
    throw new Error('useLivingArchive must be used within a LivingArchiveProvider');
  }
  return ctx;
}
