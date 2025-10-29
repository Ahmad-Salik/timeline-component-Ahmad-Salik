import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// This is a placeholder for development
// The actual component should be viewed via Storybook

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-card p-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Timeline/Gantt View Component
        </h1>
        <p className="text-lg text-neutral-600 mb-6">
          This is a production-grade Timeline component built with React, TypeScript, and Tailwind CSS.
        </p>
        
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary-900 mb-3">
            View Component Documentation
          </h2>
          <p className="text-primary-800 mb-4">
            To see the Timeline component in action with all its features and interactions, 
            please run Storybook:
          </p>
          <div className="bg-white rounded border border-primary-300 p-4 font-mono text-sm">
            yarn storybook
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">✨ Features</h3>
            <ul className="list-disc list-inside text-neutral-700 space-y-1">
              <li>Timeline grid with day/week/month views</li>
              <li>Task dependencies with visual arrows</li>
              <li>Row-based organization</li>
              <li>Task detail sidebar</li>
              <li>Progress tracking</li>
              <li>Fully accessible (WCAG 2.1 AA)</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">📚 Documentation</h3>
            <p className="text-neutral-700">
              See the <code className="bg-neutral-100 px-2 py-1 rounded">README.md</code> file 
              for complete documentation and usage examples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

