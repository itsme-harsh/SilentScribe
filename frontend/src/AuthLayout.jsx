import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   
    useEffect(() => {
        // Redirect based on authentication status
        if (authentication && !isAuthenticated) {
            navigate("/login");
        } else if (!authentication && isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate, authentication]);

    // Prevent flicker before redirect
    if (authentication && !isAuthenticated) return <Loader />;

    return <>{children}</>;
}
