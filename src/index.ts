// Main exports for the Timeline component library
export { TimelineView } from './components/Timeline';
export type { 
  TimelineTask, 
  TimelineRow, 
  TimelineViewProps,
  TimeScale,
  TaskPosition,
  DependencyLine 
} from './types/timeline.types';

// Export hooks
export { 
  useTimeline, 
  useDragAndDrop, 
  useZoom, 
  useScrollSync 
} from './hooks';

// Export primitives
export { Button, Modal, Slider } from './components/primitives';
export type { ButtonProps, ModalProps, SliderProps } from './components/primitives';

// Export utilities
export * from './utils/date.utils';
export * from './utils/position.utils';
export * from './utils/dependency.utils';
export * from './utils/validation.utils';
export * from './utils/formatting.utils';

// Export constants
export { 
  VIEW_MODE_CONFIG, 
  TIMELINE_CONSTANTS, 
  DEFAULT_COLORS 
} from './constants/timeline.constants';

