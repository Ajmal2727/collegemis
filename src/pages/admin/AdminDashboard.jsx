import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import 'chart.js/auto';
import SideNav from './SideNav';

const styles = {
  card: {
    borderRadius: '8px',
    padding: '20px',
    background: 'linear-gradient(135deg, #2196f3, #ffffff)', // Blue and white gradient
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s, margin-left 0.55s',
    marginBottom: '20px',
    height: '100%', // Fixed height for all cards
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '8px',
    color: '#ffffff', // White icon color
  },
  title: {
    marginBottom: '8px',
    color: '#ffffff', // White title color
  },
  content: {
    color: '#ffffff', // White content color
  },
  section: {
    marginTop: '0px',
    marginLeft: '220px',
  },
  responsiveSection: {
    marginTop: '85px',
    marginLeft: '0px',
  },
  chartContainer: {
    marginTop: '20px',
  },
  bigNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
};

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDepartmentCardHovered, setIsDepartmentCardHovered] = useState(false);

  const [liveData, setLiveData] = useState({
    students: [],
    teachers: [],
    fees: [],
    departments: Array.from({ length: 5 }, () => 6),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newStudents = [...liveData.students, Math.floor(Math.random() * 401) + 500];
      const newTeachers = [...liveData.teachers, Math.floor(Math.random() * 21) + 30];
      const newFees = [...liveData.fees, Math.floor(Math.random() * 200001) + 500000];
      setLiveData({
        students: newStudents.slice(-5),
        teachers: newTeachers.slice(-5),
        fees: newFees.slice(-5),
        departments: liveData.departments,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [liveData]);

  const sectionStyle = isSidebarOpen ? styles.responsiveSection : styles.section;

  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Students',
        data: liveData.students,
        fill: false,
        borderColor: '#00bcd4', // Blue color
        tension: 0.1,
      },
      {
        label: 'Teachers',
        data: liveData.teachers,
        fill: false,
        borderColor: '#4caf50', // Green color
        tension: 0.1,
      },
      {
        label: 'Fees',
        data: liveData.fees,
        fill: false,
        borderColor: '#ff9800', // Orange color
        tension: 0.1,
      },
      {
        label: 'Departments',
        data: liveData.departments,
        fill: false,
        borderColor: isDepartmentCardHovered ? '#ffeb3b' : '#9c27b0', // Yellow color on hover, Purple color otherwise
        tension: 0.1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div>
      <SideNav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <section id="AdminDashboard" style={{ ...sectionStyle, ...styles.section }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item md={5.95}>
              <Card
                style={styles.card}
                onMouseEnter={() => setIsDepartmentCardHovered(true)}
                onMouseLeave={() => setIsDepartmentCardHovered(false)}
              >
                <CardContent>
                  <SchoolIcon style={styles.icon} />
                  <Typography gutterBottom variant="h5" component="div" style={styles.title}>
                    Total Students
                  </Typography>
                  <Typography variant="body2" style={{ ...styles.content, ...styles.bigNumber }}>
                    {liveData.students.length > 0 && liveData.students[liveData.students.length - 1]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={5.95}>
              <Card style={styles.card}>
                <CardContent>
                  <PeopleIcon style={styles.icon} />
                  <Typography gutterBottom variant="h5" component="div" style={styles.title}>
                    Total Teachers
                  </Typography>
                  <Typography variant="body2" style={{ ...styles.content, ...styles.bigNumber }}>
                    {liveData.teachers.length > 0 && liveData.teachers[liveData.teachers.length - 1]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Added padding/margin between upper and lower cards */}
          <div style={{ marginTop: '20px' }}></div>

          <Grid container spacing={4}>
            <Grid item md={5.95}>
              <Card
                style={styles.card}
                onMouseEnter={() => setIsDepartmentCardHovered(true)}
                onMouseLeave={() => setIsDepartmentCardHovered(false)}
              >
                <CardContent>
                  <BusinessIcon style={styles.icon} />
                  <Typography gutterBottom variant="h5" component="div" style={styles.title}>
                    College Department
                  </Typography>
                  <Typography variant="body2" style={{ ...styles.content, ...styles.bigNumber }}>
                    {liveData.departments.length > 0 && liveData.departments[liveData.departments.length - 1]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={5.95}>
              <Card style={styles.card}>
                <CardContent>
                  <MonetizationOnIcon style={styles.icon} />
                  <Typography gutterBottom variant="h5" component="div" style={styles.title}>
                    Fees Collection (₹)
                  </Typography>
                  <Typography variant="body2" style={{ ...styles.content, ...styles.bigNumber }}>
                    {liveData.fees.length > 0 && liveData.fees[liveData.fees.length - 1].toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4} style={styles.chartContainer}>
            <Grid item xs={12}>
              <Line data={data} options={options} />
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
}

export default AdminDashboard;
