import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, Setuser] = useState(null);
    const [ready, setReady] = useState(false);

    //      Load user from localStorage when the page loads
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log('Stored user is ',storedUser)
        if (storedUser) {
            Setuser(JSON.parse(storedUser)); // Set user from localStorage
        }
        setReady(true); // Set ready after checking localStorage
    }, []);

    // Fetch user data from the API if no user is in state
    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem('token');
            if (token) {
                axios.get('/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(({ data }) => {
                    Setuser(data);
                    setReady(true);
                })
                .catch(() => {
                    setReady(true); // Ensure ready is set even if the request fails
                });
            } else {
                setReady(true); // Ensure ready is set if no token is found
            }
        }
    }, [user]);

    // Persist user to localStorage whenever user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, Setuser, ready, setReady }}>
            {children}
        </UserContext.Provider>
    );
}