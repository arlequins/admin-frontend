import React from 'react';
import ExtendReactDOM from "../types/react";
import App from './App';

const container = document.getElementById('app');
const root = ExtendReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
