import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx'; // Correct path is crucial
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);