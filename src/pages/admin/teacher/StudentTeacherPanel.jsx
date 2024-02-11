import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Tabs,
  Tab,
  Snackbar,
  Box,
  CircularProgress
} from '@mui/material';
import { CSVLink } from 'react-csv';
import SideNavT from './SideNavT';

function AdvancedAttendanceSystem() {
  // State variables
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomAttendanceData, setRandomAttendanceData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  useEffect(() => {
    // Simulating API call to fetch student data
    setTimeout(() => {
      const sampleData = [
        {
          id: 1,
          name: 'John Doe',
          branch: 'Computer Science',
          subjects: ['Math', 'Science', 'History'],
          attendance: {}
        },
        {
          id: 2,
          name: 'Jane Smith',
          branch: 'Electrical Engineering',
          subjects: ['Physics', 'Chemistry', 'Literature'],
          attendance: {}
        },
        // Add more students as needed
      ];
      setStudents(sampleData);
      setLoading(false);
    }, 1500);
  }, []);

  // Generate random attendance data for all students and subjects
  useEffect(() => {
    const randomData = {};
    students.forEach(student => {
      const studentAttendance = {};
      student.subjects.forEach(subject => {
        const randomStatus = Math.random() < 0.5 ? true : false; // Assuming a 50% chance of being present
        studentAttendance[subject] = randomStatus;
      });
      randomData[student.id] = studentAttendance;
    });
    setRandomAttendanceData(randomData);
  }, [students]);

  // Event handlers
  const handleAttendanceChange = (id, subject) => {
    const updatedStudents = students.map(student =>
      student.id === id
        ? {
            ...student,
            attendance: {
              ...student.attendance,
              [selectedDate]: {
                ...student.attendance[selectedDate],
                [subject]: !student.attendance[selectedDate]?.[subject]
              }
            }
          }
        : student
    );
    setStudents(updatedStudents);
    setSnackbarMessage('Attendance marked successfully');
    setSnackbarOpen(true);
  };

  const markLeave = (id, subject) => {
    const updatedStudents = students.map(student =>
      student.id === id
        ? {
            ...student,
            attendance: {
              ...student.attendance,
              [selectedDate]: { ...student.attendance[selectedDate], [subject]: null }
            }
          }
        : student
    );
    setStudents(updatedStudents);
    setSnackbarMessage('Leave marked successfully');
    setSnackbarOpen(true);
  };

  const handleChangeDate = e => {
    setSelectedDate(e.target.value);
  };

  const handleChangeSubject = (e, newValue) => {
    setSelectedSubject(newValue);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Helper functions
  const getAttendanceStatus = (student, subject) => {
    const status = randomAttendanceData[student.id]?.[subject];
    return status === null ? 'Leave' : status ? 'Present' : 'Absent';
  };

  const calculateAttendancePercentage = () => {
    const presentCount = students.filter(student => student.attendance[selectedDate]?.[selectedSubject]).length;
    return (presentCount / students.length) * 100 || 0;
  };

  const csvData = students.map(student => {
    const attendance = student.attendance[selectedDate];
    return {
      Name: student.name,
      Branch: student.branch,
      Subject: selectedSubject,
      [selectedSubject]: attendance ? getAttendanceStatus(student, selectedSubject) : 'N/A'
    };
  });

  const headers = [
    { label: 'Name', key: 'Name' },
    { label: 'Branch', key: 'Branch' },
    { label: 'Subject', key: 'Subject' },
    { label: selectedSubject, key: selectedSubject }
  ];

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <SideNavT/>
      <Typography variant="h4" gutterBottom>
        Attendance System
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            id="search"
            label="Search by Name"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="subject-select-label">Select Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              id="subject-select"
              value={selectedSubject}
              onChange={handleChangeSubject}
              fullWidth
            >
              {students.length > 0 &&
                students[0].subjects.map(subject => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="date"
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={handleChangeDate}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Total Attendance Percentage: {calculateAttendancePercentage().toFixed(2)}%
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CSVLink data={csvData} headers={headers} filename={`attendance_${selectedDate}_${selectedSubject}.csv`}>
            <Button variant="contained" color="primary">
              Download CSV
            </Button>
          </CSVLink>
        </Grid>
      </Grid>
      <Tabs value={selectedSubject} onChange={handleChangeSubject} aria-label="subject tabs">
        {students.length > 0 &&
          students[0].subjects.map(subject => (
            <Tab key={subject} value={subject} label={subject} />
          ))}
      </Tabs>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{selectedSubject}</TableCell>
                <TableCell>{getAttendanceStatus(student, selectedSubject)}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={student.attendance[selectedDate]?.[selectedSubject]}
                        onChange={() => handleAttendanceChange(student.id, selectedSubject)}
                        color="primary"
                        disabled={student.attendance[selectedDate]?.[selectedSubject] === null}
                      />
                    }
                    label={getAttendanceStatus(student, selectedSubject)}
                  />
                  <Button onClick={() => markLeave(student.id, selectedSubject)} disabled={student.attendance[selectedDate]?.[selectedSubject] === null}>
                    Mark Leave
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Paper>
  );
}

export default AdvancedAttendanceSystem;
