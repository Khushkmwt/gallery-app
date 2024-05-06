import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton'

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('/api/user/auth');
                setIsAuthenticated(response.data.isLoggedIn);
            } catch (error) {
                console.error('Failed to fetch authentication status:', error.message);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <div className="header bg-blue-500 p-4">
            <Link className="mr-4 text-white" to="/">Home</Link>
            <Link className="mr-4 text-white" to="/gallery">Uploaded</Link>
            {isAuthenticated ? (
                <LogoutButton/>
            ) : (
                <LoginButton/>
            )}
        </div>
    );
}

export default Header;
