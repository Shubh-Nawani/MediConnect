import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

// Aggressively disable all development tools in production
if (import.meta.env.PROD) {
  // Block React DevTools completely
  Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    value: {
      isDisabled: true,
      supportsFiber: true,
      inject: () => {},
      onCommitFiberRoot: () => {},
      onCommitFiberUnmount: () => {},
      onCommitFiberMount: () => {},
      onBeforeCommitFiberRoot: () => {},
      on: () => {},
      off: () => {},
      emit: () => {},
      addListener: () => {},
      removeListener: () => {},
    },
    writable: false,
    configurable: false
  });

  // Block React Scan
  Object.defineProperty(window, '__REACT_SCAN__', {
    value: undefined,
    writable: false,
    configurable: false
  });

  // Block other debugging tools
  window.React = undefined;
  window.ReactDOM = undefined;
  
  // Disable console in production (optional)
  if (typeof console !== 'undefined') {
    console.log = () => {};
    console.warn = () => {};
    console.info = () => {};
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
