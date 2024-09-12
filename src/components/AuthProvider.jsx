import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useSelector } from "react-redux";

// === === === === === === === === CREATING TYPES

// === === === === === === === === CREATING CONTEXT (Which can either be Type User or Type Null)
const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn }) {
  
  const [user] = useState(isSignedIn ? {id: 1} : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(context === undefined) {
    throw new Error('useAuth must be within an AuthProvider');
  }
  return context;
}

