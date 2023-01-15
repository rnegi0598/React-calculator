import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// issues
/*
after = operation entering digit not working --> done
decimal . not working after +/- operation  --> done
. not displaying after entering . only   --> done
after = operation decimal number like 2.3 does not work and neither double triple like 23 4567 work


*/