import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Container, Select, MenuItem, InputLabel } from '@mui/material';
import * as faceapi from 'face-api.js';

import SideNavS from './SideNavS';

const AttendanceForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState('');
  const [error, setError] = useState('');
  const [currentDate] = useState(new Date().toISOString().slice(0, 10)); // State to hold current date
  const videoRef = useRef();

  const loadFaceRecognitionModel = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing the camera:', err));
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  const captureImage = async () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, displaySize.width, displaySize.height);
    const imgData = canvas.toDataURL('image/jpeg');

    // Call a function to handle the captured image data
    handleCapture(imgData);
  };

  const handleCapture = (imgData) => {
    // Here you can send the imgData to your backend for processing
    // Implement the logic to send the image data to your backend
    console.log('Captured image data:', imgData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject.trim() || !attendance.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Ensure onSubmit is a function before calling it
    if (typeof onSubmit === 'function') {
      // Submit attendance
      await onSubmit({ subject: subject.trim(), attendance: attendance.trim().toLowerCase(), date: currentDate }); // Include current date
      // Reset form fields
      setSubject('');
      setAttendance('');
      setError('');
    } else {
      console.error('onSubmit is not a function');
    }
  };

  // Load face recognition model when the component mounts
  useEffect(() => {
    loadFaceRecognitionModel();
  }, []);

  return (
    <Container maxWidth="sm">
      <SideNavS/>
      <Box mt={-4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Mark Attendance
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={3}>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              labelId="subject-label"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="History">History</MenuItem>
            </Select>
          </Box>
          <Box mt={3}>
            <InputLabel id="attendance-label">Attendance</InputLabel>
            <Select
              labelId="attendance-label"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </Select>
          </Box>
          <Box mt={3}>
            <Typography variant="body1" gutterBottom>
              Date: {currentDate} {/* Display current date */}
            </Typography>
          </Box>
          <Box mt={4}>
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              autoPlay
              playsInline
              style={{
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxHeight: 'calc(100vh - 400px)' // Adjust the max height as needed
              }}
            />
          </Box>
          <Box mt={3} display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" color="primary" onClick={startVideo}>
              Start Camera
            </Button>
            <Box mx={1}></Box>
            <Button variant="contained" color="secondary" onClick={captureImage}>
              Capture Image
            </Button>
            <Box mx={1}></Box>
            <Button variant="contained" onClick={stopVideo}>
              Stop Camera
            </Button>
          </Box>
          {error && (
            <Box mt={2}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}
          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AttendanceForm;
