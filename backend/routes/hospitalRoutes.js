const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const calculateDistance = require("../utils/distance");

router.get("/", (req, res) => {
  Hospital.getAll((err, results) => {
    if (err) {
      console.error("Error fetching hospitals:", err.message);
      return res.status(500).json({
        message: "Failed to fetch hospitals"
      });
    }

    res.json(results);
  });
});

router.get("/nearest", (req, res) => {
  const { lat, lng } = req.query;

  if (lat === undefined || lng === undefined) {
    return res.status(400).json({
      message: "lat and lng are required"
    });
  }

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({
      message: "lat and lng must be valid numbers"
    });
  }

  Hospital.getAll((err, hospitals) => {
    if (err) {
      console.error("Error finding nearest hospital:", err.message);
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

    res.json({
      hospital: nearestHospital,
      distance: Number(minDistance.toFixed(2)),
      unit: "km"
    });
  });
});

router.post("/", (req, res) => {
  const {
    name,
    address,
    phone,
    latitude,
    longitude
  } = req.body;

  const sql = `
    INSERT INTO hospitals
    (name, address, phone, latitude, longitude)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    address,
    phone,
    latitude,
    longitude
  ];

  Hospital.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating hospital:", err.message);
      return res.status(500).json({
        message: "Failed to create hospital"
      });
    }

    res.status(201).json({
      message: "Hospital created successfully",
      hospitalId: result.insertId
    });
  });
});

router.put("/:id", (req, res) => {
  const {
    name,
    address,
    phone,
    latitude,
    longitude
  } = req.body;

  const { id } = req.params;

  const sql = `
    UPDATE hospitals
    SET name = ?,
        address = ?,
        phone = ?,
        latitude = ?,
        longitude = ?
    WHERE id = ?
  `;

  const values = [
    name,
    address,
    phone,
    latitude,
    longitude,
    id
  ];

  Hospital.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating hospital:", err.message);
      return res.status(500).json({
        message: "Failed to update hospital"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Hospital not found"
      });
    }

    res.json({
      message: "Hospital updated successfully"
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM hospitals WHERE id = ?";

  Hospital.create(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting hospital:", err.message);
      return res.status(500).json({
        message: "Failed to delete hospital"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Hospital not found"
      });
    }

    res.json({
      message: "Hospital deleted successfully"
    });
  });
});

module.exports = router;