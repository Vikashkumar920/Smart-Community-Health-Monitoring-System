const express = require("express");
const router = express.Router();

const HealthRecord = require("../models/HealthRecord");
const Alert = require("../models/Alert");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/recent", (req, res) => {
  const sql = `
    SELECT
      id,
      user_id,
      heart_rate,
      blood_pressure,
      temperature,
      oxygen_level,
      recorded_at
    FROM health_records
    ORDER BY recorded_at DESC
    LIMIT 10
  `;

  HealthRecord.create(sql, [], (err, results) => {
    if (err) {
      console.error("Error fetching recent health records:", err.message);
      return res.status(500).json({
        message: "Failed to fetch recent health records"
      });
    }

    res.json(results);
  });
});

router.get(
  "/",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => {
    HealthRecord.getAll((err, results) => {
      if (err) {
        console.error("Error fetching health records:", err.message);
        return res.status(500).json({
          message: "Failed to fetch health records"
        });
      }

      res.json(results);
    });
  }
);

router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT *
    FROM health_records
    WHERE user_id = ?
    ORDER BY recorded_at DESC
  `;

  HealthRecord.create(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user health records:", err.message);
      return res.status(500).json({
        message: "Failed to fetch user health records"
      });
    }

    res.json(results);
  });
});

router.post("/", (req, res) => {
  const {
    user_id,
    heart_rate,
    blood_pressure,
    temperature,
    oxygen_level
  } = req.body;

  const sql = `
    INSERT INTO health_records
    (
      user_id,
      heart_rate,
      blood_pressure,
      temperature,
      oxygen_level
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    heart_rate,
    blood_pressure,
    temperature,
    oxygen_level
  ];

  HealthRecord.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating health record:", err.message);
      return res.status(500).json({
        message: "Failed to create health record"
      });
    }

    const alertSql = `
      INSERT INTO alerts
      (
        user_id,
        alert_type,
        message,
        severity
      )
      VALUES (?, ?, ?, ?)
    `;

    if (oxygen_level < 95) {
      Alert.create(
        alertSql,
        [
          user_id,
          "Low Oxygen",
          "Patient oxygen level is below normal",
          "high"
        ],
        (alertErr) => {
          if (alertErr) {
            console.error("Error creating oxygen alert:", alertErr.message);
          }
        }
      );
    }

    if (heart_rate > 120) {
      Alert.create(
        alertSql,
        [
          user_id,
          "High Heart Rate",
          "Patient heart rate is above normal",
          "high"
        ],
        (alertErr) => {
          if (alertErr) {
            console.error("Error creating heart rate alert:", alertErr.message);
          }
        }
      );
    }

    if (temperature > 38) {
      Alert.create(
        alertSql,
        [
          user_id,
          "High Fever",
          "Patient temperature is above normal",
          "medium"
        ],
        (alertErr) => {
          if (alertErr) {
            console.error("Error creating fever alert:", alertErr.message);
          }
        }
      );
    }

    res.status(201).json({
      message: "Health record created successfully",
      recordId: result.insertId
    });
  });
});

module.exports = router;