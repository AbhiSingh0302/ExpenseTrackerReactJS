import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TokenContextProvider } from './store/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </TokenContextProvider>
);
