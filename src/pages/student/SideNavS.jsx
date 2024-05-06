import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import { ErrorOutline } from '@mui/icons-material'; // Import the ErrorOutline icon




import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';

import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        marginLeft: '0', // Adjusted to start from the left edge
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .MuiDrawer-paperAnchorDockedLeft': {
        borderRight: 'none',
      },
    }),
  }),
);

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  fontWeight: 'bold',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '&:active': {
    color: theme.palette.primary.main,
  },
}));

const ActiveIndicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 3,
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  left: 0,
  top: 0,
  transition: '0.3s ease',
}));

export default function SideNavS() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {open && (
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              STUDENT
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Home', icon: <AppsIcon />, link: '/StudentDashboard' },
            { text: 'Subject', icon: <BookIcon />, link: '/student-subject-section' }, // Changed icon to BookIcon
            { text: 'Attendance', icon: <EventIcon />, link: '/student-attendance-section' }, // Changed icon to EventIcon
          ].map(({ text, icon, link }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block', position: 'relative' }}>
              <ListItemButton component={NavLink} to={link} activeClassName={text === 'Teacher' ? 'Mui-selected' : ''} exact>
                {window.location.pathname === link && <ActiveIndicator />}
                <ListItemIconStyled
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIconStyled>
                <ListItemTextStyled
                  primary={text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
             { text: 'Complain', icon: <ErrorOutline />, link: '/student-complaint-section' }, 
            // { text: 'Complain', icon: <ReportProblemIcon />, link: '/student-complaint-section' },
            { text: 'Logout', icon: <ExitToAppIcon />, link: '/login' },
          ].map(({ text, icon, link }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block', position: 'relative' }}>
              <ListItemButton component={NavLink} to={link} activeClassName="Mui-selected" exact>
                {window.location.pathname === link && <ActiveIndicator />}
                <ListItemIconStyled
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIconStyled>
                <ListItemTextStyled
                  primary={text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
