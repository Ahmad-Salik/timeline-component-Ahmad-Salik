import React from 'react';
import { DependencyLine as DependencyLineType } from '@/types/timeline.types';
import { TIMELINE_CONSTANTS } from '@/constants/timeline.constants';

interface DependencyLineProps {
  line: DependencyLineType;
  isHighlighted?: boolean;
}

export const DependencyLine: React.FC<DependencyLineProps> = ({
  line,
  isHighlighted = false,
}) => {
  const { x1, y1, x2, y2 } = line;

  // Calculate control points for a smooth curve
  const midX = (x1 + x2) / 2;
  const path = `M ${x1} ${y1} Q ${midX} ${y1}, ${midX} ${(y1 + y2) / 2} T ${x2} ${y2}`;

  return (
    <g>
      <defs>
        <marker
          id={`arrowhead-${line.fromTaskId}-${line.toTaskId}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3, 0 6"
            fill={isHighlighted ? '#0ea5e9' : TIMELINE_CONSTANTS.DEPENDENCY_LINE_COLOR}
          />
        </marker>
      </defs>
      <path
        d={path}
        stroke={isHighlighted ? '#0ea5e9' : TIMELINE_CONSTANTS.DEPENDENCY_LINE_COLOR}
        strokeWidth={isHighlighted ? 3 : 2}
        fill="none"
        markerEnd={`url(#arrowhead-${line.fromTaskId}-${line.toTaskId})`}
        className="transition-all"
      />
    </g>
  );
};

