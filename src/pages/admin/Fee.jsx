import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  FormControl,
  InputLabel,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import SideNav from './SideNav';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Fee() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', feeAmount: 500, department: 'Computer', contact: '123-456-7890' },
    { id: 2, name: 'Jane Smith', feeAmount: 600, department: 'Civil', contact: '987-654-3210' },
    // Add more students as needed
  ]);

  const [newStudent, setNewStudent] = useState({ name: '', feeAmount: '', department: '', contact: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    // Scroll to top if Snackbar is open
    const scrollWindow = () => {
      if (snackbarOpen && document.body !== null) {
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Conditionally scroll
    if (snackbarOpen) {
      scrollWindow();
    }
  }, [snackbarOpen]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePaymentSubmit = (studentId, amount) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, feeAmount: student.feeAmount - amount } : student
    );
    setStudents(updatedStudents);

    // Snackbar notification
    setSnackbarSeverity('success');
    setSnackbarMessage('Payment submitted successfully');
    setSnackbarOpen(true);
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.feeAmount !== '' && newStudent.department && newStudent.contact) {
      const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
      const newStudentWithId = { ...newStudent, id: newId };
      setStudents([...students, newStudentWithId]);
      setNewStudent({ name: '', feeAmount: '', department: '', contact: '' });

      // Snackbar notification
      setSnackbarSeverity('success');
      setSnackbarMessage('Student added successfully');
      setSnackbarOpen(true);
    } else {
      // Snackbar notification for invalid student details
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fill in all the student details');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);

    // Snackbar notification
    setSnackbarSeverity('success');
    setSnackbarMessage('Student deleted successfully');
    setSnackbarOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setNewStudent({ ...newStudent, department: event.target.value });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SideNav />

      <div style={{ marginTop: '70px', width: '80%', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Fee Collection and Management
        </Typography>

        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          style={{ marginBottom: '20px' }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Remaining Fee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.feeAmount}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      label="Payment"
                      variant="outlined"
                      size="small"
                      value={student.paymentAmount || ''}
                      onChange={(e) => handlePaymentSubmit(student.id, parseInt(e.target.value))}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePaymentSubmit(student.id, student.paymentAmount)}
                      style={{ marginLeft: '5px' }}
                    >
                      <PaymentIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteStudent(student.id)}
                      style={{ marginLeft: '5px' }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Add New Student
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            style={{ marginBottom: '10px', marginRight: '10px' }}
          />
          <TextField
            type="number"
            label="Initial Fee Amount"
            variant="outlined"
            size="small"
            value={newStudent.feeAmount}
            onChange={(e) => setNewStudent({ ...newStudent, feeAmount: parseInt(e.target.value) })}
            style={{ marginBottom: '10px', marginRight: '10px' }}
          />
          <FormControl variant="outlined" size="small" style={{ width: '200px', marginBottom: '10px' }}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              value={newStudent.department}
              onChange={handleDepartmentChange}
              label="Department"
            >
              <MenuItem value="Computer">Computer Science</MenuItem>
              <MenuItem value="Civil">Civil Engineering</MenuItem>
              {/* Add more departments as needed */}
            </Select>
          </FormControl>
          <TextField
            label="Contact"
            variant="outlined"
            size="small"
            value={newStudent.contact}
            onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
            style={{ marginBottom: '10px', marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </div>

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Fee;
