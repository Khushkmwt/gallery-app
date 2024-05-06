// LogoutButton.js
import React from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
const LogoutButton = () => {
    const navigate =useNavigate()
    const handleLogout = () => {
        axios.post('/api/user/logout')
            .then(() => {
                onLogout();
                navigate('/')
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
