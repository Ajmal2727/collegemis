import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Container, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ClassIcon from '@mui/icons-material/Class';
import GroupIcon from '@mui/icons-material/Group';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { NavLink } from 'react-router-dom'; // Import NavLink

function SideNavT() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false); // New state for dialog

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" sx={{ bgcolor: '#2196f3' }}> {/* Fixed position */}
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SARASWATI EDUCATION SOCIETY
          </Typography>
          {/* Avatar with profile */}
          <IconButton color="inherit" onClick={handleProfileToggle}>
            <Avatar alt="Profile" src="/path/to/profile-image.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Display */}
      <Drawer anchor="right" open={isProfileOpen} onClose={handleProfileToggle}>
        <div style={{ width: '250px', padding: '20px' }}>
          <Avatar alt="Profile" src="/path/to/profile-image.jpg" sx={{ width: 100, height: 100, margin: 'auto' }} />
          {/* Additional profile information can be displayed here */}
          <Divider style={{ margin: '20px 0' }} />
          <List>
            <ListItem button onClick={handleDialogOpen}> {/* Open dialog on click */}
              <ListItemText primary="Profile Details" />
            </ListItem>
            {/* Replace with actual user profile details */}
            <ListItem>
              <ListItemText primary="Name: John Doe" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email: john.doe@example.com" />
            </ListItem>
            {/* Add more profile details as needed */}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Dialog for profile details */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          {/* Replace with actual profile details */}
          <Typography>Name: John Doe</Typography>
          <Typography>Email: john.doe@example.com</Typography>
          {/* Add more profile details as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Side Navigation */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: '250px' }}>
          <List>
            <ListItem button component={NavLink} to="/TeacherDashboard" activeClassName="active" exact>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={NavLink} to="/classes" activeClassName="active" exact>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Class" />
            </ListItem>
            <ListItem button component={NavLink} to="/student-teacherdb" activeClassName="active" exact>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Student" />
            </ListItem>
            <ListItem button component={NavLink} to="/complain" activeClassName="active" exact>
              <ListItemIcon>
                <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText primary="Complain" />
            </ListItem>
            <ListItem button component={NavLink} to="/login" activeClassName="active" exact>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <Container sx={{ paddingTop: '64px' }} maxWidth="xl">
        {/* Replace 'xl' with your preferred maxWidth */}
        {/* Your main content goes here */}
      </Container>
    </div>
  );
}

export default SideNavT;
