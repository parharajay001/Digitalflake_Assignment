import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

export const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
}));

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minHeight: '100vh',
}));

export { Drawer, DrawerHeader, MainContainer };
