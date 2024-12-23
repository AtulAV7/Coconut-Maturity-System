import React, { useState } from 'react';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (username, password) => {
        if (username && password) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Please enter both username and password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
    ) : (
        <Login onLogin={handleLogin} error={error} />
    );
}

export default App;