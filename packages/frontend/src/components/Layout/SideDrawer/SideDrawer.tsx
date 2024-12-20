import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISideMenuItem } from '../../../types';
import { Drawer, DrawerHeader } from '../Layout.Styled';
const SideDrawer: React.FC = () => {
  const MenusItems: ISideMenuItem[] = useSelector((state: any) => state.MenusItems.menu);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  return (
    <Drawer
      variant='permanent'
      open={true}
      PaperProps={{
        sx: {
          backgroundColor: '#F4F4F4',
        },
      }}
    >
      <DrawerHeader />
      <Box sx={{ width: 250 }} role='presentation'>
        <List>
          {MenusItems?.map(({ Icon, key, title, link }) => (
            <ListItem key={key} disablePadding onClick={() => navigate(link)}>
              <ListItemButton sx={{ m: 0, py: '6px', ...(isActive(link) ? { background: '#F4EDAF' } : {}) }}>
                <Icon style={{ width: '40px', paddingRight: '10px' }} />
                <ListItemText primary={title} />
                <PlayArrowIcon />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
