import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user === null) {
      navigate("/", {replace: true});
    }
  }, [user, navigate]);

  return children;
}
