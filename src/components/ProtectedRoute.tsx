import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) return <Navigate to="/login" replace />;

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;
