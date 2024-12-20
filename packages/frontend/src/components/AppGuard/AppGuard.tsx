import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/theme';
import { setPrivateRoutes, setPublicRoutes } from '../../store/actions/routes.action';
import { MenuItems } from '../../menus/menuRegistry';
import { privateRoutes, publicRoutes } from '../../routes/routerRegistry';
import { setMenu } from '../../store/actions/menu.action';

const AppGuard: React.FC<{ children: any }> = ({ children }) => {
  const dispatch = useDispatch();

  const theme = useSelector((state: { theme: { darkmode: boolean } }) => state.theme);

  useEffect(() => {
    const onMount = async () => {
      dispatch(setPrivateRoutes(privateRoutes));
      dispatch(setPublicRoutes(publicRoutes));
      dispatch(setMenu(MenuItems));
    };
    onMount();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme?.darkmode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default AppGuard;
