import { Box } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from './Appbar/Appbar';
import { DrawerHeader, MainContainer } from './Layout.Styled';
import SideDrawer from './SideDrawer/SideDrawer';
import { fetchUser } from '../../store/actions/user.action';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/GlobalStore';
import { useSelector } from 'react-redux';

const Layout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const User = useSelector((state: any) => state.User);
  return User?.data?.email ? (
    <Box sx={{ display: 'flex' }}>
      <Appbar />
      <SideDrawer />
      <MainContainer sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box marginBottom={10}>
          <Outlet />
        </Box>
      </MainContainer>
    </Box>
  ) : null;
};

export default Layout;
