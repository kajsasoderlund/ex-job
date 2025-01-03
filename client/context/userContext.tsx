

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logoutUser } from '../src/services/response';
import { User } from '../src/interfaces/User'; 


interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
    loading: boolean;
    //Property timeOfDay will hold either morning or evening type
    timeOfDay: 'morning' | 'evening';
}



export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    //timeOfday state, setTimeOfDay function updates timeOfDay state, will hold morning or evening type 
    const [timeOfDay, setTimeOfDay] = useState<'morning' | 'evening'>('morning');
    const navigate = useNavigate();

    useEffect(() => {
        //gets currenthour ( with date, gethours returns hours)
        const currentHour = new Date().getHours();
        //after 16 before 05 = evening. else will be morning
        if (currentHour >= 16 || currentHour < 5) {
            setTimeOfDay('evening');
        } else {
            setTimeOfDay('morning');
        }
    }, []);

  
    const logout = async () => {
        try {
            await logoutUser(); 
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const userData = await getProfile();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logout, loading, timeOfDay }}>
            {children}
        </UserContext.Provider>
    );
}


export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};



