"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type LastVisited = { slug: string; title: string; href: string; visitedAt: string };
type ProgressState = {
  version: 1;
  selectedPath: string | null;
  startedSlugs: string[];
  completedSlugs: string[];
  completedActivities: string[];
  readPositions: Record<string, number>;
  lastVisited: LastVisited | null;
};

type ProgressContextValue = ProgressState & {
  ready: boolean;
  selectPath: (path: string) => void;
  visitChapter: (chapter: Omit<LastVisited, "visitedAt">) => void;
  setChapterCompleted: (slug: string, completed: boolean) => void;
  setActivityCompleted: (id: string, completed: boolean) => void;
  saveReadPosition: (slug: string, position: number) => void;
};

const storageKey = "asfm-progress-v1";
const initialState: ProgressState = {
  version: 1,
  selectedPath: null,
  startedSlugs: [],
  completedSlugs: [],
  completedActivities: [],
  readPositions: {},
  lastVisited: null,
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function restoreProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const lastVisited = parsed.lastVisited
      && typeof parsed.lastVisited.slug === "string"
      && typeof parsed.lastVisited.title === "string"
      && typeof parsed.lastVisited.href === "string"
      ? parsed.lastVisited
      : null;
    return {
      version: 1,
      selectedPath: typeof parsed.selectedPath === "string" ? parsed.selectedPath : null,
      startedSlugs: stringArray(parsed.startedSlugs),
      completedSlugs: stringArray(parsed.completedSlugs),
      completedActivities: stringArray(parsed.completedActivities),
      readPositions: parsed.readPositions && typeof parsed.readPositions === "object" ? parsed.readPositions : {},
      lastVisited,
    };
  } catch {
    return initialState;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setState(restoreProgress());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Progress is an enhancement. The reader remains fully usable without storage.
    }
  }, [ready, state]);

  const selectPath = useCallback((selectedPath: string) => setState((current) => ({ ...current, selectedPath })), []);
  const visitChapter = useCallback((chapter: Omit<LastVisited, "visitedAt">) => {
    setState((current) => ({
      ...current,
      startedSlugs: current.startedSlugs.includes(chapter.slug)
        ? current.startedSlugs
        : [...current.startedSlugs, chapter.slug],
      lastVisited: { ...chapter, visitedAt: new Date().toISOString() },
    }));
  }, []);
  const setChapterCompleted = useCallback((slug: string, completed: boolean) => {
    setState((current) => ({
      ...current,
      startedSlugs: current.startedSlugs.includes(slug) ? current.startedSlugs : [...current.startedSlugs, slug],
      completedSlugs: completed
        ? [...new Set([...current.completedSlugs, slug])]
        : current.completedSlugs.filter((candidate) => candidate !== slug),
    }));
  }, []);
  const setActivityCompleted = useCallback((id: string, completed: boolean) => {
    setState((current) => ({
      ...current,
      completedActivities: completed
        ? [...new Set([...current.completedActivities, id])]
        : current.completedActivities.filter((candidate) => candidate !== id),
    }));
  }, []);
  const saveReadPosition = useCallback((slug: string, position: number) => {
    setState((current) => ({
      ...current,
      readPositions: { ...current.readPositions, [slug]: Math.max(0, Math.min(100, Math.round(position))) },
    }));
  }, []);

  const value = useMemo(() => ({
    ...state,
    ready,
    selectPath,
    visitChapter,
    setChapterCompleted,
    setActivityCompleted,
    saveReadPosition,
  }), [ready, saveReadPosition, selectPath, setActivityCompleted, setChapterCompleted, state, visitChapter]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}
