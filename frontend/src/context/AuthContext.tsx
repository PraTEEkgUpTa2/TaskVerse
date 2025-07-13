
import React, { useEffect, useState } from "react";
import axios from "@/api/axios";


interface User {
    name: string;
    email: string;
    avatar?: string;
    coverImage?: string;
    level?: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>({user: null, loading: true});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Simulate fetching user data
    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/v1/users/profile");
            if (response.status === 200) {
                setUser(response.data.data);
            } else {
                console.error("Failed to fetch user details");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => React.useContext(AuthContext);
