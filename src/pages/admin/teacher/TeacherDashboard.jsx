import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Button, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SideNavT from './SideNavT';

function TeacherDashboard() {
  // Sample data for charts (replace with actual data)
  const barChartData = {
    labels: ['Class A', 'Class B', 'Class C'],
    datasets: [
      {
        label: 'Class Stats',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80],
      },
    ],
  };

  const pieChartData = {
    labels: ['Passed', 'Failed', 'Not Assessed'],
    datasets: [
      {
        label: 'Class Results',
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        data: [55, 30, 15],
      },
    ],
  };

  // Dummy notices data (replace with actual data)
  const notices = [
    { id: 1, title: 'Notice 1', content: 'This is notice 1 content.', date: '2024-02-09' },
    { id: 2, title: 'Notice 2', content: 'This is notice 2 content.', date: '2024-02-08' },
    { id: 3, title: 'Notice 3', content: 'This is notice 3 content.', date: '2024-02-07' },
  ];

  // State for read notices
  const [readNotices, setReadNotices] = useState([]);

  // Function to mark notice as read
  const markNoticeAsRead = (noticeId) => {
    setReadNotices([...readNotices, noticeId]);
  };

  return (
    <div>
        <SideNavT/>
      {/* Content */}
      <div className="container mx-auto p-8">
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Paper elevation={3} className="p-4">
              <Typography variant="h4" gutterBottom>Class Stats</Typography>
              <Bar
                data={barChartData}
                options={{
                  maintainAspectRatio: true, // Set to true
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} className="p-">
              <Typography variant="h4" gutterBottom>Class Results</Typography>
              <div className="pie-chart-container" style={{ height: '343px' }}>
                <Pie
                  data={pieChartData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                  }}
                />
                {/* <Typography variant="body1" className="mt-0">Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography> */}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div className="mt-8">
          <Typography variant="h4" gutterBottom>Notices</Typography>
          <TableContainer component={Paper} className="w-full">
            <Table className="w-full">
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold">Title</TableCell>
                  <TableCell className="font-semibold">Details</TableCell>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell>{notice.title}</TableCell>
                    <TableCell>{notice.content}</TableCell>
                    <TableCell>{notice.date}</TableCell>
                    <TableCell>
                      {!readNotices.includes(notice.id) ? (
                        <Button onClick={() => markNoticeAsRead(notice.id)} variant="contained" color="primary" className="py-1 px-2">Mark as Read</Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">Read</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
