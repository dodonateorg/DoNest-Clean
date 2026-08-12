import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';
import App from './App.tsx';
import './index.css';

const env = (import.meta as any).env || {};
const posthogKey = (env.VITE_POSTHOG_KEY as string) || '';
const posthogHost = (env.VITE_POSTHOG_HOST as string) || 'https://t.dodonate.org';

if (typeof window !== 'undefined' && posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only',
    session_recording: {
      maskAllInputs: false,
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>,
);
