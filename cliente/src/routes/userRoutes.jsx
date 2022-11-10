import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const tokenPass = useSelector((state) => state.auth.tokenUpdatePass)

  if (tokenPass) {
    return <Outlet />
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoutes;
