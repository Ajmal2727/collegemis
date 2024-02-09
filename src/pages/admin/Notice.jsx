import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SideNav from './SideNav';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddNotice = () => {
    setDialogOpen(true);
  };

  const handleSendNotice = (recipient) => {
    if (newNotice.trim() !== '') {
      const sentTo = recipient === 'Both' ? 'Teacher and Student' : recipient;
      setNotices([...notices, { id: notices.length + 1, content: newNotice, sentTo }]);
      setNewNotice('');
      setDialogOpen(false);
      handleSnackbarOpen(`Notice sent successfully to ${sentTo}`);
    }
  };

  const handleDeleteNotice = (id) => {
    const updatedNotices = notices.filter((notice) => notice.id !== id);
    setNotices(updatedNotices);
  };

  const handleEditNotice = (id) => {
    const noticeToEdit = notices.find((notice) => notice.id === id);
    if (noticeToEdit) {
      setSelectedNotice(noticeToEdit);
      setNewNotice(noticeToEdit.content);
      setEditMode(true);
      setDialogOpen(true);
    }
  };

  const handleSaveEdit = () => {
    const updatedNotices = notices.map((notice) =>
      notice.id === selectedNotice.id ? { ...notice, content: newNotice } : notice
    );
    setNotices(updatedNotices);
    setNewNotice('');
    setSelectedNotice(null);
    setEditMode(false);
    setDialogOpen(false);
  };

  const handleOpenHistory = () => {
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <SideNav/>
      <Box mt={3}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Notices
          </Typography>

          {showHistory && (
            <div>
              {notices.length === 0 ? (
                <Typography variant="body1">No notices available.</Typography>
              ) : (
                <ul>
                  {notices.map((notice) => (
                    <li key={notice.id}>
                      <Typography variant="body1">{notice.content}</Typography>
                      <Typography variant="body2">Sent To: {notice.sentTo}</Typography>
                      <IconButton aria-label="edit" onClick={() => handleEditNotice(notice.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDeleteNotice(notice.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              )}
              <DialogActions>
                <Button onClick={handleCloseHistory} color="primary">
                  Close
                </Button>
              </DialogActions>
            </div>
          )}

          {!showHistory && (
            <div>
              <TextField
                label="New Notice"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="primary" onClick={handleAddNotice} fullWidth>
                    Add Notice
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" color="primary" onClick={handleOpenHistory} fullWidth>
                    Notice History
                  </Button>
                </Grid>
              </Grid>

              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{editMode ? 'Edit Notice' : 'Send Notice'}</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Notice Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newNotice}
                    onChange={(e) => setNewNotice(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                  {editMode ? (
                    <Button onClick={handleSaveEdit} color="primary">
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button onClick={() => handleSendNotice('Teacher')} color="primary">
                        Send to Teacher
                      </Button>
                      <Button onClick={() => handleSendNotice('Student')} color="primary">
                        Send to Student
                      </Button>
                      <Button onClick={() => handleSendNotice('Both')} color="primary">
                        Send to Both
                      </Button>
                    </>
                  )}
                </DialogActions>
              </Dialog>
            </div>
          )}
        </Paper>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default NoticePage;
