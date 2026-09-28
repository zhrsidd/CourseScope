import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applySiteMeta } from './lib/site-meta';
import './index.css';

// Origin-dependent metadata (canonical, og:url). A no-op until a deployment
// origin is configured — see src/lib/site-meta.ts.
applySiteMeta();

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
