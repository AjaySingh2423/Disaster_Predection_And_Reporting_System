import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function AdminRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {

        const checkAdmin = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            try {

                await axios.get(`${import.meta.env.VITE_API_URL}/adminAuth`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAuthorized(true);

            } catch (err) {

                setAuthorized(false);

            } finally {

                setLoading(false);

            }

        };

        checkAdmin();

    }, []);

    if (loading) return <h2>Loading...</h2>;

    if (!authorized) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;