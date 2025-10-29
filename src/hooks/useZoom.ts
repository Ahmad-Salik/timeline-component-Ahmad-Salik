import { useState, useCallback } from 'react';
import { VIEW_MODE_CONFIG } from '@/constants/timeline.constants';

type ViewMode = 'day' | 'week' | 'month';

interface UseZoomProps {
  initialMode?: ViewMode;
  onZoomChange?: (mode: ViewMode) => void;
}

export const useZoom = ({ initialMode = 'week', onZoomChange }: UseZoomProps = {}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);

  const zoomIn = useCallback(() => {
    let newMode: ViewMode = viewMode;
    
    if (viewMode === 'month') {
      newMode = 'week';
    } else if (viewMode === 'week') {
      newMode = 'day';
    }

    if (newMode !== viewMode) {
      setViewMode(newMode);
      onZoomChange?.(newMode);
    }
  }, [viewMode, onZoomChange]);

  const zoomOut = useCallback(() => {
    let newMode: ViewMode = viewMode;
    
    if (viewMode === 'day') {
      newMode = 'week';
    } else if (viewMode === 'week') {
      newMode = 'month';
    }

    if (newMode !== viewMode) {
      setViewMode(newMode);
      onZoomChange?.(newMode);
    }
  }, [viewMode, onZoomChange]);

  const setZoomLevel = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    onZoomChange?.(mode);
  }, [onZoomChange]);

  const canZoomIn = viewMode !== 'day';
  const canZoomOut = viewMode !== 'month';

  const pixelsPerDay = VIEW_MODE_CONFIG[viewMode].pixelsPerDay;

  return {
    viewMode,
    zoomIn,
    zoomOut,
    setZoomLevel,
    canZoomIn,
    canZoomOut,
    pixelsPerDay,
  };
};

