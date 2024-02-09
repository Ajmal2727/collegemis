import React, { useState, useEffect } from 'react';
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
import Apps from '@mui/icons-material/Apps';
import Person from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NavLink } from 'react-router-dom';
import { Container, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CSVLink } from 'react-csv';

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
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
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

function generateRandomTeachers(count) {
  const departments = ['COMPUTER', 'CIVIL', 'MECHANICAL', 'ELECTRICAL', 'IT', 'AUTOMOBILE'];
  const subjects = ['Algebra', 'Calculus', 'Physics I', 'Biology II', ' I', 'History of Europe'];

  const teachers = [];
  for (let i = 0; i < count; i++) {
    const name = `Teacher ${i + 1}`;
    const department = departments[Math.floor(Math.random() * departments.length)];
    const dateOfJoining = `20${Math.floor(Math.random() * 10) + 10}-0${Math.floor(Math.random() * 9) + 1}-0${Math.floor(Math.random() * 9) + 1}`;
    const subjectsCount = Math.floor(Math.random() * subjects.length) + 1;
    const teacherSubjects = [];
    for (let j = 0; j < subjectsCount; j++) {
      const subjectIndex = Math.floor(Math.random() * subjects.length);
      teacherSubjects.push(subjects[subjectIndex]);
      subjects.splice(subjectIndex, 1);
    }
    teachers.push({
      id: i + 1,
      name,
      department,
      dateOfJoining,
      subjects: teacherSubjects,
    });
  }
  return teachers;
}

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5); // Set teachers per page
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    department: '',
    dateOfJoining: '',
    subjects: [],
  });
  const [editTeacher, setEditTeacher] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Generate random teachers data
    const generatedTeachers = generateRandomTeachers(20);
    setTeachers(generatedTeachers);
    setFilteredTeachers(generatedTeachers); // Initially set filtered teachers to all teachers
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    // Filter teachers based on search term
    const filtered = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  const handleAssignTask = (teacherId) => {
    // Logic to assign task to a teacher
    console.log('Assign task to teacher with ID:', teacherId);
  };

  const handleAddTeacher = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditTeacher(null);
  };

  const handleSaveTeacher = () => {
    // Validate fields
    if (!newTeacher.name || !newTeacher.department || !newTeacher.dateOfJoining || newTeacher.subjects.length === 0) {
      alert('Please fill in all fields');
      return;
    }
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(newTeacher.dateOfJoining)) {
      alert('Invalid date format. Please use YYYY-MM-DD format');
      return;
    }

    if (editTeacher) {
      const updatedTeachers = teachers.map((teacher) =>
        teacher.id === editTeacher.id ? { ...editTeacher, ...newTeacher } : teacher
      );
      setTeachers(updatedTeachers);
      setFilteredTeachers(updatedTeachers);
      setEditTeacher(null);
    } else {
      const newTeacherWithId = { ...newTeacher, id: teachers.length + 1 };
      setTeachers([...teachers, newTeacherWithId]);
      setFilteredTeachers([...teachers, newTeacherWithId]);
    }

    setNewTeacher({
      name: '',
      department: '',
      dateOfJoining: '',
      subjects: [],
    });
    setOpenDialog(false);
  };

  const handleEditTeacher = (teacher) => {
    setEditTeacher(teacher);
    setNewTeacher(teacher);
    setOpenDialog(true);
  };

  const handleDeleteTeacher = (teacherId) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherId);
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
  };

  // Logic for pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {open ? (
            <Typography variant="h6" noWrap component="div">
              Admin
            </Typography>
          ) : (
            <Typography variant="h6" noWrap component="div">
              Saraswati Education Society
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
            { text: 'Home', icon: <Apps />, link: './' }, // Add your NavLink file to the link prop
            { text: 'Teacher', icon: <Person />, link: '/teacherdetails' }, // Add your NavLink file to the link prop
            { text: 'Student', icon: <Person />, link: '/studentdetails' }, // Add your NavLink file to the link prop
            { text: 'Complaints', icon: <HowToRegIcon />, link: '/complaints' }, // Add your NavLink file to the link prop
          ].map(({ text, icon, link }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={NavLink} to={link} activeClassName="Mui-selected">
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
            { text: 'Fee', icon: <MonetizationOnIcon />, link: '/fee' }, // Add your NavLink file to the link prop
            { text: 'Notice', icon: <NotificationsIcon />, link: '/notice' }, // Add your NavLink file to the link prop
            { text: 'Logout', icon: <ExitToAppIcon />, link: '/logout' }, // Add your NavLink file to the link prop
          ].map(({ text, icon, link }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={NavLink} to={link} activeClassName="Mui-selected">
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
        <Container>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            margin="normal"
          />
          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Date of Joining</TableCell>
                  <TableCell>Subjects</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher.dateOfJoining}</TableCell>
                    <TableCell>{teacher.subjects.join(', ')}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleAssignTask(teacher.id)} sx={{ marginRight: 1 }}>
                        Assign Task
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleEditTeacher(teacher)} sx={{ marginRight: 1 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDeleteTeacher(teacher.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Box display="flex" justifyContent="center" mt={2}>
            {Array.from({ length: Math.ceil(filteredTeachers.length / teachersPerPage) }, (_, i) => (
              <Button key={i} onClick={() => paginate(i + 1)} sx={{ mx: 1 }}>
                {i + 1}
              </Button>
            ))}
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{editTeacher ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                variant="outlined"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Department</InputLabel>
                <Select
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                  label="Department"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Physics">Physics</MenuItem>
                  <MenuItem value="Biology">Biology</MenuItem>
                  <MenuItem value="Chemistry">Chemistry</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Date of Joining (YYYY-MM-DD)"
                variant="outlined"
                value={newTeacher.dateOfJoining}
                onChange={(e) => setNewTeacher({ ...newTeacher, dateOfJoining: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Subjects (comma separated)"
                variant="outlined"
                value={newTeacher.subjects.join(', ')}
                onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value.split(', ') })}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
              <Button onClick={handleSaveTeacher} color="primary" variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            <CSVLink data={teachers} filename="teachers.csv">
              Download CSV
            </CSVLink>
          </Button>
          <Button variant="contained" color="primary" style={{ marginTop: '20px', marginLeft: '10px' }} onClick={handleAddTeacher}>
            Add Teacher
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
