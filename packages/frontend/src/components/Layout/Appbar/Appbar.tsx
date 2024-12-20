import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Digitalflake_Logo } from '../../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../Popup/Popup';
import ConfirmationBox from '../../ConfirmationBox/ConfirmationBox';
import { useSelector } from 'react-redux';

const settings = ['Logout'];

const Appbar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const User = useSelector((state: any) => state.User);

  const handleCloseUserMenu = (btnKey?: string) => {
    if (btnKey === 'Logout') {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position='fixed' sx={{ zIndex: 1300, px: 2 }}>
      <Toolbar disableGutters>
        <Link to={'home'} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Digitalflake_Logo} alt='Digitalflake Logo' width='296px' />
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={User?.data?.firstName} src={User?.data?.firstName} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={() => {
              handleCloseUserMenu();
            }}
          >
            {settings.map((setting: string) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      <Popup
        open={open}
        close={() => {
          setOpen(false);
        }}
        dialogId='popup'
        width={{ xs: '90%', lg: '518px', sm: '518px' }}
        sx={{ borderRadius: '10px' }}
      >
        <ConfirmationBox
          MainTitle='Logout'
          Title='Are you sure you want to logout?'
          cancleCallback={() => {
            setOpen(false);
          }}
          confirmCallback={() => {
            handleCloseUserMenu('Logout');
          }}
        />
      </Popup>
    </AppBar>
  );
};
export default Appbar;
