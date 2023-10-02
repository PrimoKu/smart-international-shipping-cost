import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/users/current', { withCredentials: true });
                if (res.data) {
                    console.log(res.data);
                    setUser(res.data);
                    setIsAuthenticated(res.data !== null);
                } else {
                    // console.log("No User");
                    setUser(null);
                    setIsAuthenticated(res.data !== null);
                }
            } catch (error) {
                // console.error('Error fetching current user', error);
            }
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            { children }
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};
  
export { AuthProvider, useAuth };