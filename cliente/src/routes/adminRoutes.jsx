import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  
  if(isLoggedIn && !isAdmin){
    return  <Navigate to="/home" />
  }
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;