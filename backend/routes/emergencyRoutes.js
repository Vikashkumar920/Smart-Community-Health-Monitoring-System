const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const Alert = require("../models/Alert");
const calculateDistance = require("../utils/distance");

router.post("/sos", (req, res) => {
  const { user_id, latitude, longitude } = req.body;

  if (!user_id || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      message: "user_id, latitude and longitude are required"
    });
  }

  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({
      message: "latitude and longitude must be valid numbers"
    });
  }

  Hospital.getAll((err, hospitals) => {
    if (err) {
      console.error("Error fetching hospitals:", err.message);
      return res.status(500).json({
        message: "Failed to find nearest hospital"
      });
    }

    if (hospitals.length === 0) {
      return res.status(404).json({
        message: "No hospitals found"
      });
    }

    let nearestHospital = null;
    let minDistance = Number.MAX_VALUE;

    hospitals.forEach((hospital) => {
      const hospitalLat = parseFloat(hospital.latitude);
      const hospitalLng = parseFloat(hospital.longitude);

      const distance = calculateDistance(
        userLat,
        userLng,
        hospitalLat,
        hospitalLng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestHospital = hospital;
      }
    });

    const checkAlertSql = `
      SELECT id
      FROM alerts
      WHERE user_id = ?
      AND alert_type = 'Emergency SOS'
      AND status = 'active'
      LIMIT 1
    `;

    Alert.create(
      checkAlertSql,
      [user_id],
      (checkErr, existingAlerts) => {
        if (checkErr) {
          console.error(
            "Error checking existing SOS alert:",
            checkErr.message
          );

          return res.status(500).json({
            message: "Failed to check existing SOS alert"
          });
        }

        if (existingAlerts.length > 0) {
          return res.json({
            message: "SOS already active",
            user_id,
            location: {
              latitude: userLat,
              longitude: userLng
            },
            nearestHospital,
            distance: Number(minDistance.toFixed(2)),
            unit: "km",
            alertId: existingAlerts[0].id
          });
        }

        const alertSql = `
          INSERT INTO alerts
          (user_id, alert_type, message, severity)
          VALUES (?, ?, ?, ?)
        `;

        const alertValues = [
          user_id,
          "Emergency SOS",
          `Emergency SOS triggered. Nearest hospital: ${nearestHospital.name}`,
          "high"
        ];

        Alert.create(
          alertSql,
          alertValues,
          (alertErr, alertResult) => {
            if (alertErr) {
              console.error(
                "Error creating SOS alert:",
                alertErr.message
              );

              return res.status(500).json({
                message: "SOS triggered, but failed to create emergency alert"
              });
            }

            res.json({
              message: "SOS triggered successfully",
              user_id,
              location: {
                latitude: userLat,
                longitude: userLng
              },
              nearestHospital,
              distance: Number(minDistance.toFixed(2)),
              unit: "km",
              alertId: alertResult.insertId
            });
          }
        );
      }
    );
  });
});

module.exports = router;