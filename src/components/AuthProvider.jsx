import { createContext, useContext } from "react"
import { useSelector } from "react-redux";

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
    const isLoggedIn = useSelector((state) => {
        return state?.user?.user?.id ? true : false;
    });
    
    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
