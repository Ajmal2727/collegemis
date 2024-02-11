import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Subject, Assignment } from '@mui/icons-material';
import SideNavS from './SideNavS';


function StudentDashboard() {
  // State for tracking read status of notices
  const [notices, setNotices] = useState([
    { id: 1, title: 'Notice 1', content: 'Content of Notice 1', date: '2024-02-10', read: false },
    { id: 2, title: 'Notice 2', content: 'Content of Notice 2', date: '2024-02-09', read: false },
    { id: 3, title: 'Notice 3', content: 'Content of Notice 3', date: '2024-02-08', read: false },
    { id: 3, title: 'Notice 4', content: 'Content of Notice 3', date: '2024-02-08', read: false },
    { id: 3, title: 'Notice 5', content: 'Content of Notice 3', date: '2024-02-08', read: false },
    { id: 3, title: 'Notice 6', content: 'Content of Notice 3', date: '2024-02-08', read: false },
    // Add more notices as needed
  ]);

  // Function to mark a notice as read
  const markAsRead = (id) => {
    setNotices(notices.map(notice => {
      if (notice.id === id) {
        return { ...notice, read: true };
      }
      return notice;
    }));
  };

  // Pagination state
  const [page, setPage] = useState(1);
  const noticesPerPage = 4; // Adjust the number of notices per page
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  // Function to handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Filter notices for the current page
  const filteredNotices = notices.slice((page - 1) * noticesPerPage, page * noticesPerPage);

  return (
    <div>
   <SideNavS/>  
      <Grid container spacing={2} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                <Subject fontSize="large" color="primary" />
                Subjects
              </Typography>
              <Typography variant="body1" color="textSecondary">
                5 subjects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                <Assignment fontSize="large" color="secondary" />
                Assignments
              </Typography>
              <Typography variant="body1" color="textSecondary">
                10 assignments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notices Table */}
      <Grid container spacing={2} justifyContent="center" mt={4}>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white', backgroundColor: 'black' }}>Title</TableCell>
                  <TableCell style={{ color: 'white', backgroundColor: 'black' }}>Content</TableCell>
                  <TableCell style={{ color: 'white', backgroundColor: 'black' }}>Date</TableCell>
                  <TableCell style={{ color: 'white', backgroundColor: 'black' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNotices.map(notice => (
                  <TableRow key={notice.id}>
                    <TableCell>{notice.title}</TableCell>
                    <TableCell>{notice.content}</TableCell>
                    <TableCell>{notice.date}</TableCell>
                    <TableCell>
                      {!notice.read ? (
                        <Button onClick={() => markAsRead(notice.id)} color="primary">
                          Mark as Read
                        </Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Read
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Pagination */}
      <Grid container spacing={2} justifyContent="center" mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Grid item key={index}>
            <Button
              variant={index + 1 === page ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default StudentDashboard;
