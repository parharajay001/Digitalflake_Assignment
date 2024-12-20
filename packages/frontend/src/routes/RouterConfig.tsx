import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import { isAuthenticated } from '../utils/helper';
import PrivateRoute from './PrivateRoute';
import { IRoute } from '../types';

const AllRoutes: React.FC = () => {
  const privateRoutes: IRoute[] = useSelector((state: any) => state.Routes.privateRoutes);
  const publicRoutes: IRoute[] = useSelector((state: any) => state.Routes.publicRoutes);

  const routes = (routes: IRoute[]) => {
    return routes.map((pr) => <Route path={pr.path} key={pr.path} element={<pr.component />} />);
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={'/'} key={'default'} element={<Navigate to={'/home'} />} />
      {publicRoutes.map((pr) => (
        <Route path={pr.path} key={pr.path} element={<pr.component />} />
      ))}
      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>{routes(privateRoutes)}</Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
