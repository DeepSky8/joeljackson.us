import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';

const container = document.getElementById('root');
const appRoot = createRoot(container);
appRoot.render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
)
