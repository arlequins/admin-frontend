import React, { lazy, Suspense } from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import LoadingLayout from '@app/components/layouts/LoadingLayout';
import { store } from '@app/redux';

import '@app/styles/index.scss';

const App = lazy(() => import('@app/App'));

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Suspense fallback={<LoadingLayout />}>
          <App />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
}
