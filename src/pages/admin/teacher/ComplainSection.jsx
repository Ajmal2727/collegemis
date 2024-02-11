import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Snackbar,
  Tab,
  Tabs,
  AppBar,
  Container,
} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import SideNavT component
import SideNavT from './SideNavT'; // Adjust the path as per your file structure

const drawerWidth = 240; // Define the width of your SideNavT

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    margin: theme.spacing(1), // Adding margin to create space around the component
  },
  form: {
    maxWidth: 400,
    margin: 'auto',
    padding: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#2196f3',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#0d47a1',
    },
  },
  // Adjust the style for SideNavT integration
  content: {
    marginLeft: drawerWidth,
    marginRight: drawerWidth,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3), // Adding margin to create space between the AppBar and content
  },
}));

function ComplainSection() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [complaintHistory, setComplaintHistory] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleFacultyOrStudentChange = (event) => {
    event.preventDefault();
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    let valid = true;
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required';
      valid = false;
    }

    if (subject.trim() === '') {
      errors.subject = 'Subject is required';
      valid = false;
    }

    if (contact.trim() === '') {
      errors.contact = 'Contact information is required';
      valid = false;
    }

    if (comment.trim() === '') {
      errors.comment = 'Comment is required';
      valid = false;
    }

    if (valid) {
      setOpenSnackbar(true);
      setName('');
      setSubject('');
      setContact('');
      setComment('');
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrors({});
  };

  const renderComplaintHistory = () => {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Complaint History
        </Typography>
        {complaintHistory.length === 0 ? (
          <Typography variant="body2">No complaints found.</Typography>
        ) : (
          complaintHistory.map((complaint, index) => (
            <Paper key={index} elevation={3} className={classes.root}>
              <Typography variant="body1">{`Complaint ${index + 1}: ${complaint.subject}`}</Typography>
              <Typography variant="body2">{`Status: ${complaint.status}`}</Typography>
            </Paper>
          ))
        )}
      </div>
    );
  };

  const fetchComplaintHistory = () => {
    setComplaintHistory([
      { subject: 'Internet Connectivity Issue', status: 'Resolved' },
      { subject: 'Printer Not Working', status: 'Pending' },
    ]);
  };

  return (
    <div>
      <SideNavT />
      <main className={classes.content}>
        <Container style={{ marginTop: -24 }}>
          <AppBar position="static" style={{ backgroundColor: '#2196f3' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Send Complaint" style={{ color: '#ffffff' }} />
              <Tab label="Check Complaint Status" style={{ color: '#ffffff' }} />
            </Tabs>
          </AppBar>
          {tabValue === 0 && (
            <Paper className={classes.root}>
              <Typography variant="h5" align="center" gutterBottom style={{ color: '#2196f3' }}>
                Send Complaint
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name *"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your name"
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Subject *"
                      variant="outlined"
                      fullWidth
                      value={subject}
                      onChange={handleSubjectChange}
                      placeholder="Enter subject"
                      error={!!errors.subject}
                      helperText={errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="facultyOrStudent-label" style={{ color: '#2196f3' }}>
                        Faculty or Student *
                      </InputLabel>
                      <Select
                        labelId="facultyOrStudent-label"
                        value="Faculty"
                        onChange={handleFacultyOrStudentChange}
                        label="Faculty or Student"
                        style={{ color: '#2196f3' }}
                      >
                        <MenuItem value="Faculty">Faculty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Contact *"
                      variant="outlined"
                      fullWidth
                      value={contact}
                      onChange={handleContactChange}
                      placeholder="Enter your contact information"
                      error={!!errors.contact}
                      helperText={errors.contact}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Comment *"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Enter your comment"
                      error={!!errors.comment}
                      helperText={errors.comment}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submitButton}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </form>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
                message="Complaint sent successfully!"
                style={{ top: 16, right: 16 }} // Position Snackbar on top right
              />
            </Paper>
          )}
          {tabValue === 1 && (
            <Paper className={classes.root}>
              <Typography variant="h5" align="center" gutterBottom style={{ color: '#2196f3' }}>
                Check Complaint Status
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="my-3"
                onClick={fetchComplaintHistory}
                style={{ backgroundColor: '#2196f3', color: '#ffffff' }}
              >
                Fetch Complaint History
              </Button>
              {renderComplaintHistory()}
            </Paper>
          )}
        </Container>
      </main>
    </div>
  );
}

export default ComplainSection;
