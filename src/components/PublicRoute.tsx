import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/api';
import type { ReactNode } from 'react';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const token = getToken();

    if (token) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
