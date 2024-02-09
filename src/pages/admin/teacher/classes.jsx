import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Tabs,
  Tab,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { CSVLink } from 'react-csv';
import SideNavT from './SideNavT';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Classes() {
  const classes = useStyles();
  const [studentMarks, setStudentMarks] = useState([
    { id: 1, name: 'John Doe', branch: 'Computer Science', subject: 'Mathematics', marks: 85 },
    { id: 2, name: 'Jane Smith', branch: 'Computer Science', subject: 'Physics', marks: 78 },
    { id: 3, name: 'Alice Johnson', branch: 'Electronics', subject: 'Physics', marks: 80 },
    { id: 4, name: 'Bob Brown', branch: 'Electronics', subject: 'Chemistry', marks: 90 },
    { id: 5, name: 'Charlie Davis', branch: 'Mechanical', subject: 'Mathematics', marks: 92 },
    { id: 6, name: 'David Wilson', branch: 'Mechanical', subject: 'Chemistry', marks: 88 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newMark, setNewMark] = useState({ name: '', branch: '', subject: '', marks: '' });
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the row being edited
  const [currentTab, setCurrentTab] = useState(0); // Track the active tab index

  const handleNameChange = (event) => {
    setNewMark({ ...newMark, name: event.target.value });
  };

  const handleBranchChange = (event) => {
    setNewMark({ ...newMark, branch: event.target.value });
  };

  const handleSubjectChange = (event) => {
    setNewMark({ ...newMark, subject: event.target.value });
  };

  const handleMarksChange = (event) => {
    setNewMark({ ...newMark, marks: event.target.value });
  };

  const addMark = () => {
    const newStudentMarks = [...studentMarks, { ...newMark, id: studentMarks.length + 1 }];
    setStudentMarks(newStudentMarks);
    setNewMark({ name: '', branch: '', subject: '', marks: '' });
  };

  const deleteMark = (id) => {
    const updatedMarks = studentMarks.filter((mark) => mark.id !== id);
    setStudentMarks(updatedMarks);
  };

  const editMark = (index) => {
    setEditIndex(index);
    setNewMark(studentMarks[index]);
  };

  const saveMark = () => {
    const updatedMarks = [...studentMarks];
    updatedMarks[editIndex] = newMark;
    setStudentMarks(updatedMarks);
    setEditIndex(-1);
    setNewMark({ name: '', branch: '', subject: '', marks: '' });
  };

  const search = (query) => {
    setSearchQuery(query);
  };

  const filteredStudentMarks = studentMarks.filter(
    (mark) =>
      mark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mark.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mark.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Prepare CSV data
  const csvData = [
    ['Name', 'Branch', 'Subject', 'Marks Obtain', 'Total'],
    ...filteredStudentMarks.map((mark) => [
      mark.name,
      mark.branch,
      mark.subject,
      mark.marks, // Marks Obtain
      mark.marks, // Total
    ]),
  ];

  // Function to handle uploading test document
  const handleUploadDocument = (id) => {
    // Implement the functionality to handle document upload
    alert(`Upload document for student with ID: ${id}`);
  };

  return (
    <div className={classes.root}>
      <SideNavT/>
      <Typography variant="h4" gutterBottom>
        Student Marks
      </Typography>
      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} aria-label="student marks tabs">
        <Tab label="Student Marks" />
        <Tab label="Uploaded Documents" />
      </Tabs>
      {currentTab === 0 && (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                placeholder="Search by name, branch, or subject"
                value={searchQuery}
                onChange={(e) => search(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => search('')}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="branch-select-label">Branch</InputLabel>
                <Select labelId="branch-select-label" id="branch-select" value={newMark.branch} onChange={handleBranchChange}>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Mechanical">Mechanical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="subject-select-label">Subject</InputLabel>
                <Select labelId="subject-select-label" id="subject-select" value={newMark.subject} onChange={handleSubjectChange}>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Physics">Physics</MenuItem>
                  <MenuItem value="Chemistry">Chemistry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField label="Name" value={newMark.name} onChange={handleNameChange} className={classes.formControl} />
            </Grid>
            <Grid item>
              <TextField label="Marks" value={newMark.marks} onChange={handleMarksChange} className={classes.formControl} />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={editIndex !== -1 ? saveMark : addMark}>
                {editIndex !== -1 ? 'Save' : 'Add Mark'}
              </Button>
            </Grid>
            <Grid item>
              <CSVLink data={csvData} filename={"student_marks.csv"}>
                <Button variant="contained" color="primary">
                  Download CSV
                </Button>
              </CSVLink>
            </Grid>
          </Grid>

          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Marks Obtain</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudentMarks.map((mark, index) => (
                  <TableRow key={mark.id}>
                    <TableCell>{mark.name}</TableCell>
                    <TableCell>{mark.branch}</TableCell>
                    <TableCell>{mark.subject}</TableCell>
                    <TableCell>{mark.marks}</TableCell>
                    <TableCell>{mark.marks}</TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <Button variant="contained" color="primary" onClick={() => saveMark()}>
                          Save
                        </Button>
                      ) : (
                        <>
                          <Button variant="contained" color="secondary" onClick={() => deleteMark(mark.id)}>
                            Delete
                          </Button>
                          <Button variant="contained" color="primary" onClick={() => editMark(index)}>
                            Edit
                          </Button>
                          <Button variant="contained" color="primary" onClick={() => handleUploadDocument(mark.id)}>
                            Upload Document
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {currentTab === 1 && (
        <div>
          <Typography variant="h6">Uploaded Documents</Typography>
          <Typography variant="body1">Display uploaded documents here...</Typography>
        </div>
      )}
    </div>
  );
}

export default Classes;
