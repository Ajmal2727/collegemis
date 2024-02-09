import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';
import ForwardIcon from '@mui/icons-material/Forward';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import SideNav from './SideNav';

function ComplaintsReceiving() {
  const [complaints, setComplaints] = useState([
    { id: 1, user: 'Student A', complaint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', isNew: true },
    { id: 2, user: 'Teacher B', complaint: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', isNew: false },
    { id: 3, user: 'Student C', complaint: 'Fusce vitae lectus quis ipsum fermentum ultrices.', isNew: true },
    { id: 4, user: 'Teacher D', complaint: 'Nullam ut ex vitae ipsum congue tempor.', isNew: false },
  ]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replySuccess, setReplySuccess] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [forwardSuccess, setForwardSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initially set to true

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedComplaint(null); // Clear selected complaint when switching tabs
  };

  const handleViewComment = (id) => {
    const selected = complaints.find((complaint) => complaint.id === id);
    setSelectedComplaint(selected);
  };

  const handleReplyComplaint = () => {
    if (!replyContent.trim()) {
      return; // Do not send empty reply
    }
    // Logic to send reply
    // For demonstration, let's show a success message using a snackbar
    setReplySuccess(true);
    // Reset reply content
    setReplyContent('');
  };

  const handleForwardComplaint = (id) => {
    // Logic to forward complaint
    // For demonstration, let's show a success message using a snackbar
    setForwardSuccess(true);
    // Remove forwarded complaint from complaints state
    setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== id));
  };

  const handleCloseSnackbar = () => {
    setReplySuccess(false);
    setForwardSuccess(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter complaints by search term and user (student or teacher)
  const filteredComplaints = complaints.filter(complaint =>
    complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (complaint.user.toLowerCase().includes('student') || complaint.user.toLowerCase().includes('teacher'))
  );

  // Display complaints based on pagination
  const currentComplaints = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ marginLeft: isSidebarOpen ? '240px' : '0', transition: 'margin-left 0.3s ease-in-out' }}>
      <SideNav setIsSidebarOpen={setIsSidebarOpen} />
      <Typography variant="h4" gutterBottom style={{ color: '#1565c0', marginBottom: '20px', textAlign: 'center' }}>
        Received Complaints
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: '#1565c0', marginBottom: '20px' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="complaints tabs">
          <Tab label={<Badge badgeContent={complaints.filter(c => c.isNew).length} color="error" style={{ color: '#ffffff', backgroundColor: '#1565c0' }}>New Complaints</Badge>} />
          <Tab label="All Complaints" />
        </Tabs>
      </Box>
      {!selectedComplaint && (
        <TextField
          label="Search by Student or Teacher Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', transition: 'margin 0.3s ease-in-out' }}
        />
      )}
      {selectedComplaint ? (
        <Container maxWidth="md" style={{ backgroundColor: '#f0f4fc', padding: '20px', borderRadius: '8px', marginBottom: '20px', transition: 'opacity 0.3s ease-in-out' }}>
          <Typography variant="h5" gutterBottom style={{ color: '#1565c0', marginBottom: '10px' }}>
            Complaint Details
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ marginBottom: '10px' }}>
            User: {selectedComplaint.user}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ marginBottom: '20px' }}>
            Complaint: {selectedComplaint.complaint}
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Reply"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            variant="outlined"
            style={{ marginBottom: '20px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleReplyComplaint} style={{ backgroundColor: '#1565c0', color: '#ffffff', marginRight: '10px' }}>
              Reply
            </Button>
            <Button variant="contained" onClick={() => handleForwardComplaint(selectedComplaint.id)} style={{ backgroundColor: '#1565c0', color: '#ffffff' }}>
              Forward
            </Button>
          </Box>
        </Container>
      ) : (
        <List style={{ backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '20px' }}>
          {currentComplaints.map((complaint) => (
            <React.Fragment key={complaint.id}>
              {selectedTab === 0 && !complaint.isNew && <></>}
              <ListItem alignItems="flex-start" button onClick={() => handleViewComment(complaint.id)} style={{ backgroundColor: complaint.isNew ? '#e1f5fe' : 'inherit' }}>
                <ListItemText
                  primary={complaint.user}
                  secondary={complaint.complaint}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="view comment" onClick={() => handleViewComment(complaint.id)} style={{ color: '#1565c0' }}>
                    <VisibilityIcon style={{ color: '#1565c0' }} />
                  </IconButton>
                  <IconButton aria-label="reply" onClick={() => handleViewComment(complaint.id)} style={{ color: '#1565c0' }}>
                    <ReplyIcon style={{ color: '#1565c0' }} />
                  </IconButton>
                  <IconButton aria-label="forward" onClick={() => handleForwardComplaint(complaint.id)} style={{ color: '#1565c0' }}>
                    <ForwardIcon style={{ color: '#1565c0' }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredComplaints.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Snackbar open={replySuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Reply sent successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={forwardSuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="info">
          Complaint forwarded to the teacher.
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default ComplaintsReceiving;
