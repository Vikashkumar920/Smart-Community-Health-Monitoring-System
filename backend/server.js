const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const userRoutes = require("./routes/userRoutes");
const healthRecordRoutes = require("./routes/healthRecordRoutes");
const alertRoutes = require("./routes/alertRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ArogyaAlert Backend is running"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/health-records", healthRecordRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/emergency", emergencyRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});