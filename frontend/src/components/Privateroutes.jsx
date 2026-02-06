import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


export default  function PrivateRoutes ({children, allowedRoles}){
    const {auth, loading} = useAuth();

    if (loading) {
        return <div>loading....</div>;
    }

    if (!auth || !auth.accessToken) {
        return <Navigate to='/login' />
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to='/login' />
    }

    return typeof children === 'function' ? children(auth) : children;
}