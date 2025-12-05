import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
    isLoggedIn: false,
    login: (token: string) => { },
    logout: () => { },
    loading: true,
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setIsLoggedIn(!!token);
            } catch (e) {
                console.error("Failed to load token", e);
            } finally {
                setLoading(false);
            }
        };
        checkLoginStatus();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
