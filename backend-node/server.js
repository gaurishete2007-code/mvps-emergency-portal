const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Practical 14: Serve static resources
app.use('/static', express.static(path.join(__dirname, 'public')));

// In-Memory Database for Campus Emergencies
let incidents = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    department: "Computer Engineering",
    type: "Medical Emergency",
    location: "Main Building - Lab 3",
    phone: "9876543210",
    status: "Pending",
    createdAt: new Date().toLocaleTimeString()
  },
  {
    id: 2,
    studentName: "Priya Patil",
    department: "Information Technology",
    type: "Lab Hazard",
    location: "Chemistry Lab Floor 2",
    phone: "9123456789",
    status: "Dispatched",
    createdAt: new Date().toLocaleTimeString()
  }
];

// Practical 15: REST API Routes

// GET /api/incidents - Fetch all reports
app.get('/api/incidents', (req, res) => {
  res.status(200).json({
    success: true,
    college: "Maratha Vidya Prasarak Samaj's College of Engineering (KBTCOE)",
    count: incidents.length,
    data: incidents
  });
});

// POST /api/incidents - Create a new SOS alert
app.post('/api/incidents', (req, res) => {
  const { studentName, department, type, location, phone } = req.body;

  if (!studentName || !type || !location || !phone) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields."
    });
  }

  const newIncident = {
    id: incidents.length + 1,
    studentName,
    department: department || "General Campus",
    type,
    location,
    phone,
    status: "Dispatched",
    createdAt: new Date().toLocaleTimeString()
  };

  incidents.unshift(newIncident);

  res.status(201).json({
    success: true,
    message: "SOS Alert sent to MVPS Security Room!",
    data: newIncident
  });
});

// PATCH /api/incidents/:id - Update incident status
app.patch('/api/incidents/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const incident = incidents.find(item => item.id === parseInt(id));

  if (!incident) {
    return res.status(404).json({ success: false, message: "Incident record not found." });
  }

  if (status) incident.status = status;

  res.status(200).json({
    success: true,
    message: `Incident #${id} updated to ${status}`,
    data: incident
  });
});

// Start Node Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` MVPS KBTCOE Emergency Portal Backend Running`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` REST API: http://localhost:${PORT}/api/incidents`);
  console.log(`===================================================`);
});