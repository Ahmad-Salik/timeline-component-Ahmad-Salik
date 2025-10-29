import type { Meta, StoryObj } from '@storybook/react';
import { TimelineView } from './TimelineView';
import { TimelineTask, TimelineRow } from '@/types/timeline.types';
import { useState } from 'react';

const meta = {
  title: 'Components/TimelineView',
  component: TimelineView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: { type: 'select' },
      options: ['day', 'week', 'month'],
    },
  },
} satisfies Meta<typeof TimelineView>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const today = new Date();

const sampleRows: TimelineRow[] = [
  { id: 'row-1', label: 'Frontend Team', tasks: ['task-1', 'task-2'] },
  { id: 'row-2', label: 'Backend Team', tasks: ['task-3', 'task-4'] },
  { id: 'row-3', label: 'Design Team', tasks: ['task-5'] },
  { id: 'row-4', label: 'QA Team', tasks: ['task-6'] },
];

const sampleTasks: Record<string, TimelineTask> = {
  'task-1': {
    id: 'task-1',
    title: 'UI Component Development',
    description: 'Build reusable UI components',
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth(), 15),
    progress: 60,
    assignee: 'Frontend Team',
    rowId: 'row-1',
    dependencies: [],
    color: '#3b82f6',
    isMilestone: false,
  },
  'task-2': {
    id: 'task-2',
    title: 'Integration Testing',
    startDate: new Date(today.getFullYear(), today.getMonth(), 16),
    endDate: new Date(today.getFullYear(), today.getMonth(), 25),
    progress: 0,
    assignee: 'Frontend Team',
    rowId: 'row-1',
    dependencies: ['task-1', 'task-3'],
    color: '#3b82f6',
    isMilestone: false,
  },
  'task-3': {
    id: 'task-3',
    title: 'API Development',
    description: 'Build RESTful API endpoints',
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth(), 14),
    progress: 80,
    assignee: 'Backend Team',
    rowId: 'row-2',
    dependencies: [],
    color: '#10b981',
    isMilestone: false,
  },
  'task-4': {
    id: 'task-4',
    title: 'Database Migration',
    startDate: new Date(today.getFullYear(), today.getMonth(), 8),
    endDate: new Date(today.getFullYear(), today.getMonth(), 12),
    progress: 100,
    assignee: 'Backend Team',
    rowId: 'row-2',
    dependencies: [],
    color: '#10b981',
    isMilestone: false,
  },
  'task-5': {
    id: 'task-5',
    title: 'Design System Update',
    startDate: new Date(today.getFullYear(), today.getMonth(), 5),
    endDate: new Date(today.getFullYear(), today.getMonth(), 12),
    progress: 100,
    assignee: 'Design Team',
    rowId: 'row-3',
    dependencies: [],
    color: '#f59e0b',
    isMilestone: false,
  },
  'task-6': {
    id: 'task-6',
    title: 'Testing Phase',
    startDate: new Date(today.getFullYear(), today.getMonth(), 26),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 5),
    progress: 0,
    assignee: 'QA Team',
    rowId: 'row-4',
    dependencies: ['task-2'],
    color: '#ef4444',
    isMilestone: false,
  },
};

// Default Story
export const Default: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 2, 0),
    viewMode: 'week',
  },
};

// Empty State Story
export const Empty: Story = {
  args: {
    rows: [
      { id: 'row-1', label: 'Team 1', tasks: [] },
      { id: 'row-2', label: 'Team 2', tasks: [] },
    ],
    tasks: {},
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    viewMode: 'week',
  },
};

// With Dependencies Story
export const WithDependencies: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 2, 0),
    viewMode: 'week',
  },
};

// Day View Mode
export const DayView: Story = {
  args: {
    rows: sampleRows.slice(0, 2),
    tasks: {
      'task-1': sampleTasks['task-1'],
      'task-3': sampleTasks['task-3'],
    },
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth(), 14),
    viewMode: 'day',
  },
};

// Month View Mode
export const MonthView: Story = {
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 3, 0),
    viewMode: 'month',
  },
};

// Large Dataset Story
const largeRows: TimelineRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: `row-${i + 1}`,
  label: `Team ${i + 1}`,
  tasks: [`task-${i * 3 + 1}`, `task-${i * 3 + 2}`, `task-${i * 3 + 3}`],
}));

const largeTasks: Record<string, TimelineTask> = {};
for (let i = 0; i < 30; i++) {
  const startDay = Math.floor(Math.random() * 60);
  const duration = Math.floor(Math.random() * 14) + 3;
  largeTasks[`task-${i + 1}`] = {
    id: `task-${i + 1}`,
    title: `Task ${i + 1}`,
    startDate: new Date(today.getFullYear(), today.getMonth(), startDay + 1),
    endDate: new Date(today.getFullYear(), today.getMonth(), startDay + duration),
    progress: Math.floor(Math.random() * 100),
    assignee: `Team ${Math.floor(i / 3) + 1}`,
    rowId: `row-${Math.floor(i / 3) + 1}`,
    dependencies: [],
    color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i % 5],
    isMilestone: false,
  };
}

export const LargeDataset: Story = {
  args: {
    rows: largeRows,
    tasks: largeTasks,
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 3, 0),
    viewMode: 'week',
  },
};

// Interactive Demo with State Management
export const InteractiveDemo: Story = {
  render: (args) => {
    const [tasks, setTasks] = useState(sampleTasks);
    
    const handleTaskUpdate = (taskId: string, updates: Partial<TimelineTask>) => {
      setTasks(prev => ({
        ...prev,
        [taskId]: { ...prev[taskId], ...updates },
      }));
    };

    return (
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Interactive Timeline Demo</h2>
          <p className="text-neutral-600">Click on any task to edit its details</p>
        </div>
        <TimelineView
          {...args}
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
        />
      </div>
    );
  },
  args: {
    rows: sampleRows,
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 2, 0),
    viewMode: 'week',
  },
};

// Mobile View
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    rows: sampleRows.slice(0, 2),
    tasks: {
      'task-1': sampleTasks['task-1'],
      'task-3': sampleTasks['task-3'],
    },
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    viewMode: 'week',
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: (args) => (
    <div className="p-4">
      <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="font-bold text-primary-900 mb-2">Keyboard Navigation:</h3>
        <ul className="text-sm text-primary-800 space-y-1">
          <li>• <kbd className="px-2 py-1 bg-white rounded border">Tab</kbd> - Navigate between tasks</li>
          <li>• <kbd className="px-2 py-1 bg-white rounded border">Enter</kbd> - Open task details</li>
          <li>• <kbd className="px-2 py-1 bg-white rounded border">Escape</kbd> - Close sidebar</li>
          <li>• All interactive elements have proper ARIA labels</li>
        </ul>
      </div>
      <TimelineView {...args} />
    </div>
  ),
  args: {
    rows: sampleRows,
    tasks: sampleTasks,
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 2, 0),
    viewMode: 'week',
  },
};

// With Milestones
const tasksWithMilestones: Record<string, TimelineTask> = {
  ...sampleTasks,
  'milestone-1': {
    id: 'milestone-1',
    title: 'Project Kickoff',
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth(), 1),
    progress: 100,
    assignee: 'All Teams',
    rowId: 'row-1',
    dependencies: [],
    color: '#8b5cf6',
    isMilestone: true,
  },
};

const rowsWithMilestones: TimelineRow[] = [
  { id: 'row-1', label: 'Frontend Team', tasks: ['milestone-1', 'task-1', 'task-2'] },
  { id: 'row-2', label: 'Backend Team', tasks: ['task-3', 'task-4'] },
  { id: 'row-3', label: 'Design Team', tasks: ['task-5'] },
  { id: 'row-4', label: 'QA Team', tasks: ['task-6'] },
];

export const WithMilestones: Story = {
  args: {
    rows: rowsWithMilestones,
    tasks: tasksWithMilestones,
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 2, 0),
    viewMode: 'week',
  },
};

