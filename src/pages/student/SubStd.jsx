import React, { useState } from 'react';
import { Typography, Button, Tab, Tabs, Paper, MenuItem, Select, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system';
import SideNavS from './SideNavS';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssessmentIcon from '@mui/icons-material/Assessment';

const RootContainer = styled(Paper)({
  margin: '8rem auto',
  padding: '32px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  maxWidth: '900px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const ButtonContainer = styled('div')({
  marginTop: '16px',
});

const TabContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
});

const ProfessorContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '16px',
});

const ProfessorDetails = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const ProfessorSection = ({ professors }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
    {professors.map((professor, index) => (
      <Paper key={index} elevation={3} style={{ width: '45%', marginBottom: '16px' }}>
        <div style={{ padding: '16px' }}>
          <Typography variant="subtitle1">Professor: {professor.name}</Typography>
          <Typography variant="subtitle1">Subject: {professor.subject}</Typography>
        </div>
        <Button variant="outlined" color="primary" style={{ margin: '16px' }}>
          View Notes
        </Button>
      </Paper>
    ))}
  </div>
);

const TestMarks = ({ marks }) => (
  <div>
    <Typography variant="subtitle1">Last Test Marks: {marks}</Typography>
  </div>
);

const Notes = ({ subjectName, activeTab }) => (
  <div style={{ marginTop: '16px' }}>
    {activeTab === 0 && (
      <Button variant="contained" color="primary">
        View {subjectName} Notes
      </Button>
    )}
  </div>
);

const StyledTable = styled(Table)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
});

const StyledTableCell = styled(TableCell)({
  border: '1px solid #ddd',
});

const ScheduleSection = ({ timetableData }) => {
  const allDates = [];
  const allTimes = [];

  Object.values(timetableData).forEach((entries) => {
    entries.forEach((entry) => {
      if (!allDates.includes(entry.date)) {
        allDates.push(entry.date);
      }
      if (!allTimes.includes(entry.time)) {
        allTimes.push(entry.time);
      }
    });
  });

  const getTimeForDate = (date, subject) => {
    const entry = timetableData[subject].find((entry) => entry.date === date);
    return entry ? entry.time : '';
  };

  return (
    <div>
      <Typography variant="h6">Timetable:</Typography>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject</StyledTableCell>
            {allDates.map((date, index) => (
              <StyledTableCell key={index}>{date}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(timetableData).map(([subject, entries], index) => (
            <TableRow key={index}>
              <StyledTableCell>{subject}</StyledTableCell>
              {allDates.map((date, index) => (
                <StyledTableCell key={index}>{getTimeForDate(date, subject)}</StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

const CreditsSection = ({ credits }) => (
  <div>
    <Typography variant="h6">Credits:</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Subject</TableCell>
          <TableCell>Credits</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(credits).map(([subject, credit], index) => (
          <TableRow key={index}>
            <TableCell>{subject}</TableCell>
            <TableCell>{credit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const ActionsSection = () => (
  <ButtonContainer>
    <Button variant="contained" color="primary">
      Enroll
    </Button>
  </ButtonContainer>
);

const LastTestMarks = ({ lastTestMarks }) => (
  <div>
    <Typography variant="h6">Last Test Marks:</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Subject</TableCell>
          <TableCell>Marks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(lastTestMarks).map(([subject, marks], index) => (
          <TableRow key={index}>
            <TableCell>{subject}</TableCell>
            <TableCell>{marks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const SubjectFeature = ({ subjects }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(subjects && subjects.length > 0 ? subjects[0] : '');
  const [professors] = useState([
    { name: 'Dr. John Doe', subject: 'Math' },
    { name: 'Dr. Jane Smith', subject: 'Science' },
    { name: 'Prof. Michael Johnson', subject: 'History' },
    { name: 'Dr. Emily Brown', subject: 'Literature' },
  ]);
  const [schedule] = useState('Mon, Wed, Fri 9:00 AM - 10:00 AM');
  const [credits] = useState({
    Math: 3,
    Science: 4,
    History: 3,
    Literature: 4,
  });
  const [testMarks, setTestMarks] = useState({});
  const [lastTestMarks, setLastTestMarks] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    // Set last test marks for the selected subject
    setLastTestMarks((prevMarks) => ({
      ...prevMarks,
      [event.target.value]: testMarks[event.target.value] || 'No marks available',
    }));
  };

  const handleViewMarks = (subject) => {
    const marks = lastTestMarks[subject] || 'No marks available';
    alert(`Last Test Marks for ${subject}: ${marks}`);
  };

  const timetableData = {
    Math: [
      { date: '2024-05-07', time: '9:00 AM - 10:00 AM' },
      { date: '2024-05-09', time: '9:00 AM - 10:00 AM' },
      { date: '2024-05-11', time: '9:00 AM - 10:00 AM' },
    ],
    Science: [
      { date: '2024-05-08', time: '10:00 AM - 11:00 AM' },
      { date: '2024-05-10', time: '10:00 AM - 11:00 AM' },
    ],
    History: [
      { date: '2024-05-07', time: '11:00 AM - 12:00 PM' },
      { date: '2024-05-09', time: '11:00 AM - 12:00 PM' },
      { date: '2024-05-11', time: '11:00 AM - 12:00 PM' },
    ],
    Literature: [
      { date: '2024-05-08', time: '1:00 PM - 2:00 PM' },
      { date: '2024-05-10', time: '1:00 PM - 2:00 PM' },
      { date: '2024-05-12', time: '1:00 PM - 2:00 PM' },
    ],
  };

  return (
    <RootContainer elevation={8}>
      <TabContainer>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab icon={<PersonIcon />} label="Professor" />
          <Tab icon={<ScheduleIcon />} label="Schedule" />
          <Tab icon={<CreditCardIcon />} label="Credits" />
          <Tab icon={<AssessmentIcon />} label="Test Marks" />
        </Tabs>
        <SideNavS />
      </TabContainer>
      {activeTab === 0 && <ProfessorSection professors={professors} />}
      {activeTab === 1 && (
        <div>
          <ScheduleSection timetableData={timetableData} />
        </div>
      )}
      {activeTab === 2 && <CreditsSection credits={credits} />}
      {activeTab === 3 && (
        <div>
          <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>Select Subject:</Typography>
          <Select value={selectedSubject} onChange={handleSubjectChange} style={{ marginBottom: '16px', width: '100%' }}>
            {subjects && subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
          <div style={{ marginBottom: '16px' }}>
            {lastTestMarks[selectedSubject] && (
              <Button variant="contained" color="primary" onClick={() => handleViewMarks(selectedSubject)} style={{ width: '100%' }}>
                View Marks
              </Button>
            )}
            <LastTestMarks lastTestMarks={lastTestMarks} />
          </div>
        </div>
      )}
    </RootContainer>
  );
};

export default SubjectFeature;
