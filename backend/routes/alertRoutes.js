const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

router.get("/", (req, res) => {
  Alert.getAll((err, results) => {
    if (err) {
      console.error("Error fetching alerts:", err.message);
      return res.status(500).json({
        message: "Failed to fetch alerts"
      });
    }

    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { user_id, alert_type, message, severity } = req.body;

  const sql = `
    INSERT INTO alerts (user_id, alert_type, message, severity)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    user_id,
    alert_type,
    message,
    severity || "medium"
  ];

  Alert.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating alert:", err.message);
      return res.status(500).json({
        message: "Failed to create alert"
      });
    }

    res.status(201).json({
      message: "Alert created successfully",
      alertId: result.insertId
    });
  });
});
router.put("/:id/resolve", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE alerts
    SET status = 'resolved'
    WHERE id = ?
  `;

  Alert.create(sql, [id], (err, result) => {
    if (err) {
      console.error(
        "Error resolving alert:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to resolve alert"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Alert not found"
      });
    }

    res.json({
      message: "Alert resolved successfully"
    });
  });
});
router.put("/:id", (req, res) => {
  const { status, severity } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE alerts
    SET status = ?, severity = ?
    WHERE id = ?
  `;

  const values = [
    status,
    severity,
    id
  ];

  Alert.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating alert:", err.message);
      return res.status(500).json({
        message: "Failed to update alert"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Alert not found"
      });
    }

    res.json({
      message: "Alert updated successfully"
    });
  });
});
module.exports = router;
