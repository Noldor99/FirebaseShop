import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Basket from './Basket';
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../store/slice/cartSlice";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../store/slice/authSlice";

import ShowOnLogin, { ShowOnLogout } from './hiddenLink/hiddenLink';
import AccountIcon from './AccountIcon';
import LogoutButton from './UI/LogoutButton';


// interface HeaderProps {
//   window?: any
// }



const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];
const navItems = [ { nameLink: 'Home', link: 'FirebaseShop' }];



const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [displayName, setdisplayName] = React.useState("");
  const navigate = useNavigate()
  const { pathname } = useLocation()


  const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(CALCULATE_TOTAL_QUANTITY());
    }, []);

    // Monitor currently sign in user
    React.useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user);
          if (user.displayName == null) {
            const u1 = user.email.slice(0, -10);
            const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
            setdisplayName(uName);
          } else {
            setdisplayName(user.displayName);
          }
  
          dispatch(
            SET_ACTIVE_USER({
              email: user.email,
              userName: user.displayName ? user.displayName : displayName,
              userID: user.uid,
            })
          );
        } else {
          setdisplayName("");
          dispatch(REMOVE_ACTIVE_USER());
        }
      });
    }, [dispatch, displayName]);




  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  if (pathname === '/auth' || pathname === '/userdetails/:id') return

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <ShowOnLogin>
        <AccountIcon displayName={displayName}/>
        <LogoutButton/>
      </ShowOnLogin>
      <ShowOnLogout>
        <Button 
          sx={{color:'white'}}
          onClick={()=>navigate('login')}>
          Login
        </Button>
      </ShowOnLogout>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.nameLink} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.link)}>
              <ListItemText primary={item.nameLink} />
            </ListItemButton>
          </ListItem>
        ))}
        <Basket/>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <ShowOnLogin>
            <AccountIcon displayName={displayName}/>
            <LogoutButton/>
          </ShowOnLogin>
          <ShowOnLogout>
            <Button 
              sx={{color:'white'}}
              onClick={()=>navigate('login')}>
              Login
            </Button>
          </ShowOnLogout>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems:'center' }}>
            {navItems.map((item) => (
              <Button key={item.nameLink} sx={{ color: '#ffffff' }}
                onClick={() => navigate(item.link)}>
                {item.nameLink}
              </Button>
            ))}
            <Basket/>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header