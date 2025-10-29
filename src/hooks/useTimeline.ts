import { useState, useCallback, useMemo } from 'react';
import { VIEW_MODE_CONFIG } from '@/constants/timeline.constants';
import { generateTimeScale } from '@/utils/date.utils';

interface TimelineState {
  viewMode: 'day' | 'week' | 'month';
  startDate: Date;
  endDate: Date;
  pixelsPerDay: number;
}

export const useTimeline = (initialDate: Date = new Date()) => {
  const [state, setState] = useState<TimelineState>({
    viewMode: 'week',
    startDate: new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
    endDate: new Date(initialDate.getFullYear(), initialDate.getMonth() + 3, 0),
    pixelsPerDay: VIEW_MODE_CONFIG.week.pixelsPerDay,
  });

  const zoomIn = useCallback(() => {
    setState(prev => {
      if (prev.viewMode === 'month') {
        return { ...prev, viewMode: 'week', pixelsPerDay: VIEW_MODE_CONFIG.week.pixelsPerDay };
      }
      if (prev.viewMode === 'week') {
        return { ...prev, viewMode: 'day', pixelsPerDay: VIEW_MODE_CONFIG.day.pixelsPerDay };
      }
      return prev;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setState(prev => {
      if (prev.viewMode === 'day') {
        return { ...prev, viewMode: 'week', pixelsPerDay: VIEW_MODE_CONFIG.week.pixelsPerDay };
      }
      if (prev.viewMode === 'week') {
        return { ...prev, viewMode: 'month', pixelsPerDay: VIEW_MODE_CONFIG.month.pixelsPerDay };
      }
      return prev;
    });
  }, []);

  const scrollToToday = useCallback(() => {
    const today = new Date();
    setState(prev => ({
      ...prev,
      startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      endDate: new Date(today.getFullYear(), today.getMonth() + 2, 0),
    }));
  }, []);

  const setViewMode = useCallback((mode: 'day' | 'week' | 'month') => {
    setState(prev => ({
      ...prev,
      viewMode: mode,
      pixelsPerDay: VIEW_MODE_CONFIG[mode].pixelsPerDay,
    }));
  }, []);

  const setDateRange = useCallback((startDate: Date, endDate: Date) => {
    setState(prev => ({
      ...prev,
      startDate,
      endDate,
    }));
  }, []);

  const timeScale = useMemo(
    () => generateTimeScale(state.startDate, state.endDate, state.viewMode),
    [state.startDate, state.endDate, state.viewMode]
  );

  return {
    ...state,
    zoomIn,
    zoomOut,
    scrollToToday,
    setViewMode,
    setDateRange,
    timeScale,
  };
};

