
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const { user } = useContext(UserContext) || {}; 

  
    return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
