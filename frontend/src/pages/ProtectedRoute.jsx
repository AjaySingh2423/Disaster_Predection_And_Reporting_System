import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const checkUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try {

                await axios.get(`${import.meta.env.VITE_API_URL}/home`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAuthenticated(true);

            } catch (err) {

                localStorage.removeItem("token");
                localStorage.removeItem("role");

                setAuthenticated(false);

            } finally {

                setLoading(false);

            }
        };

        checkUser();

    }, []);

    if (loading) return <h2>Loading...</h2>;

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;