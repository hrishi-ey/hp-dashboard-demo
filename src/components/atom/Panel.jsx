import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

const Panel = ({ children }) => {
  return (
    <article className={`w-full flex-grow h-full bg-panel border border-panelborder rounded-lg flex flex-col`}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </article>
  );
}

export default Panel;
