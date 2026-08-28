const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM users WHERE role = 'doctor') AS totalDoctors,
      (SELECT COUNT(*) FROM hospitals) AS totalHospitals,
      (SELECT COUNT(*) FROM alerts WHERE status = 'active') AS activeAlerts,
      (SELECT COUNT(*) FROM health_records) AS totalHealthRecords
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard:", err.message);

      return res.status(500).json({
        message: "Failed to fetch dashboard data"
      });
    }

    res.json(results[0]);
  });
});
router.get("/recent-alerts", (req, res) => {
  const sql = `
    SELECT
      alerts.id,
      users.name AS patient_name,
      alerts.alert_type,
      alerts.message,
      alerts.severity,
      alerts.status,
      alerts.created_at
    FROM alerts
    JOIN users
      ON alerts.user_id = users.id
    ORDER BY alerts.created_at DESC
    LIMIT 10
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "Error fetching recent alerts:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch recent alerts"
      });
    }

    res.json(results);
  });
});
module.exports = router;