import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AuthContextProvider } from './store/auth-context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
    <App />
</AuthContextProvider>
);
