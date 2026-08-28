const express = require("express");
const router = express.Router();
const WaterQuality = require("../models/WaterQuality");
const Alert = require("../models/Alert");

router.get("/", (req, res) => {
  WaterQuality.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch water quality records"
      });
    }

    res.json(results);
  });
});

router.post("/", (req, res) => {
  const {
    village_name,
    ph_level,
    turbidity,
    contamination_level
  } = req.body;

  let risk_status = "low";

  if (
    contamination_level >= 80 ||
    turbidity >= 10 ||
    ph_level < 6 ||
    ph_level > 8.5
  ) {
    risk_status = "high";
  } else if (
    contamination_level >= 50 ||
    turbidity >= 5
  ) {
    risk_status = "medium";
  }

  const sql = `
    INSERT INTO water_quality
    (
      village_name,
      ph_level,
      turbidity,
      contamination_level,
      risk_status
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  WaterQuality.create(
    sql,
    [
      village_name,
      ph_level,
      turbidity,
      contamination_level,
      risk_status
    ],
    (err, result) => {
      if (err) {
        console.error(err.message);

        return res.status(500).json({
          message: "Failed to create water quality record"
        });
      }

      if (risk_status === "high") {

        console.log("Creating Water Contamination Alert...");

        const alertSql = `
          INSERT INTO alerts
          (user_id, alert_type, message, severity)
          VALUES (?, ?, ?, ?)
        `;

        Alert.create(
          alertSql,
          [
            2,
            "Water Contamination",
            `High contamination detected in ${village_name}`,
            "high"
          ],
          (alertErr) => {
            if (alertErr) {
              console.error(
                "Error creating water alert:",
                alertErr.message
              );
            } else {
              console.log(
                "Water alert created successfully"
              );
            }
          }
        );
      }

      res.status(201).json({
        message: "Water quality record created successfully",
        riskStatus: risk_status,
        recordId: result.insertId
      });
    }
  );
});

module.exports = router;