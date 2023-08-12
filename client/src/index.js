import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { CompactContextProvider } from './context/CompactContext';

ReactDOM.render(
  <React.StrictMode>
    <CompactContextProvider>
      <App />
    </CompactContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
