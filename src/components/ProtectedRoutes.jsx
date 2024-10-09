import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const user = useAuth();    
    const navigate = useNavigate();

    useEffect(() => {
        if(!user.isLoggedIn) {
            navigate("/", {replace: true});
        }
    }, [user, navigate]);

    return children;
}

export default ProtectedRoutes;

