import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Fix iOS Safari viewport height (address bar show/hide causes 100vh reflow)
const setVh = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};
setVh();
window.addEventListener('resize', setVh, { passive: true });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
