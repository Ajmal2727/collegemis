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
  TablePagination,
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
  header: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginRight: theme.spacing(2),
  },
  actionButton: {
    marginRight: theme.spacing(1),
  },
  timetableForm: {
    marginBottom: theme.spacing(2),
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [timeTable, setTimeTable] = useState([]);
  const [testSchedule, setTestSchedule] = useState({ subject: '', date: '' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleTestScheduleChange = (event) => {
    setTestSchedule({ ...testSchedule, [event.target.name]: event.target.value });
  };

  const handleTestScheduleSubmit = (event) => {
    event.preventDefault();
    setTimeTable([...timeTable, testSchedule]);
    setTestSchedule({ subject: '', date: '' });
  };

  // Prepare CSV data
  const csvData = [
    ['Name', 'Branch', 'Subject', 'Marks Obtain', 'Total'],
    ...studentMarks.map((mark) => [
      mark.name,
      mark.branch,
      mark.subject,
      mark.marks, // Marks Obtain
      mark.marks, // Total
    ]),
  ];

  return (
    <div className={classes.root}>
      <SideNavT />
      <Typography variant="h4" gutterBottom className={classes.header}>
        Student Marks
      </Typography>
      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} aria-label="student marks tabs">
        <Tab label="Student Marks" />
        <Tab label="Uploaded Documents" />
        <Tab label="Test and Time Table" />
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
              <Button
                variant="contained"
                color="primary"
                onClick={editIndex !== -1 ? saveMark : addMark}
                className={classes.addButton}
              >
                {editIndex !== -1 ? 'Save' : 'Add Mark'}
              </Button>
              <CSVLink data={csvData} filename={'student_marks.csv'}>
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
                {(rowsPerPage > 0
                  ? studentMarks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : studentMarks
                ).map((mark, index) => (
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
                          <Button variant="contained" color="secondary" onClick={() => deleteMark(mark.id)} className={classes.actionButton}>
                            Delete
                          </Button>
                          <Button variant="contained" color="primary" onClick={() => editMark(index)} className={classes.actionButton}>
                            Edit
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={studentMarks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
      {currentTab === 1 && (
        <div>
          <Typography variant="h6">Uploaded Documents</Typography>
          <Typography variant="body1">Display uploaded documents here...</Typography>
        </div>
      )}
      {currentTab === 2 && (
        <div>
          <Typography variant="h6">Test and Time Table</Typography>
          <Grid container spacing={2} className={classes.timetableForm}>
            <Grid item>
              <TextField
                label="Subject"
                value={testSchedule.subject}
                onChange={handleTestScheduleChange}
                name="subject"
                className={classes.formControl}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Date"
                type="date"
                value={testSchedule.date}
                onChange={handleTestScheduleChange}
                name="date"
                className={classes.formControl}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleTestScheduleSubmit}>
                Add Test
              </Button>
            </Grid>
          </Grid>
          <Typography variant="h6">Test Schedule</Typography>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table className={classes.table} aria-label="test schedule table">
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeTable.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>{schedule.subject}</TableCell>
                    <TableCell>{schedule.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default Classes;
