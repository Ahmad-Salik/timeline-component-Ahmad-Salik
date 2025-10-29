import { useState, useCallback, useRef } from 'react';

interface DragState {
  isDragging: boolean;
  taskId: string | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

interface UseDragAndDropProps {
  onDragEnd?: (taskId: string, deltaX: number, deltaY: number) => void;
}

export const useDragAndDrop = ({ onDragEnd }: UseDragAndDropProps = {}) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    taskId: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  const dragRef = useRef<DragState>(dragState);
  dragRef.current = dragState;

  const startDrag = useCallback((taskId: string, x: number, y: number) => {
    setDragState({
      isDragging: true,
      taskId,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
    });
  }, []);

  const updateDrag = useCallback((x: number, y: number) => {
    setDragState(prev => ({
      ...prev,
      currentX: x,
      currentY: y,
    }));
  }, []);

  const endDrag = useCallback(() => {
    const { taskId, startX, startY, currentX, currentY } = dragRef.current;
    
    if (taskId && onDragEnd) {
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      onDragEnd(taskId, deltaX, deltaY);
    }

    setDragState({
      isDragging: false,
      taskId: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
  }, [onDragEnd]);

  const cancelDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      taskId: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
  }, []);

  const getDragOffset = useCallback(() => {
    return {
      x: dragState.currentX - dragState.startX,
      y: dragState.currentY - dragState.startY,
    };
  }, [dragState]);

  return {
    isDragging: dragState.isDragging,
    draggedTaskId: dragState.taskId,
    startDrag,
    updateDrag,
    endDrag,
    cancelDrag,
    getDragOffset,
  };
};

