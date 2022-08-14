import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/index.scss';
import App from '@c/App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
