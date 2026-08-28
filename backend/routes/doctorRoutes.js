const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", (req, res) => {
  Doctor.getAll((err, results) => {
    if (err) {
      console.error("Error fetching doctors:", err.message);
      return res.status(500).json({
        message: "Failed to fetch doctors"
      });
    }

    res.json(results);
  });
});

router.get(
  "/patients",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => {
    const sql = `
      SELECT id, name, email, role, created_at
      FROM users
      WHERE role = 'patient'
      ORDER BY created_at DESC
    `;

    Doctor.create(sql, [], (err, results) => {
      if (err) {
        console.error("Error fetching patients:", err.message);
        return res.status(500).json({
          message: "Failed to fetch patients"
        });
      }

      res.json(results);
    });
  }
);

router.get(
  "/patients/:userId/health-records",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => {
    const { userId } = req.params;

    const sql = `
      SELECT *
      FROM health_records
      WHERE user_id = ?
      ORDER BY recorded_at DESC
    `;

    Doctor.create(sql, [userId], (err, results) => {
      if (err) {
        console.error(
          "Error fetching patient health records:",
          err.message
        );

        return res.status(500).json({
          message: "Failed to fetch patient health records"
        });
      }

      res.json(results);
    });
  }
);

router.get(
  "/alerts",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => {
    const sql = `
      SELECT
        alerts.id,
        alerts.user_id,
        users.name AS patient_name,
        alerts.alert_type,
        alerts.message,
        alerts.severity,
        alerts.status,
        alerts.created_at
      FROM alerts
      JOIN users ON alerts.user_id = users.id
      WHERE alerts.status = 'active'
      ORDER BY alerts.created_at DESC
    `;

    Doctor.create(sql, [], (err, results) => {
      if (err) {
        console.error(
          "Error fetching active alerts:",
          err.message
        );

        return res.status(500).json({
          message: "Failed to fetch active alerts"
        });
      }

      res.json(results);
    });
  }
);
router.get("/:doctorId/patients", (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT
      users.id,
      users.name,
      users.email,
      users.role,
      doctor_assignments.assigned_at
    FROM doctor_assignments
    JOIN users
      ON doctor_assignments.patient_id = users.id
    WHERE doctor_assignments.doctor_id = ?
    ORDER BY doctor_assignments.assigned_at DESC
  `;

  Doctor.create(sql, [doctorId], (err, results) => {
    if (err) {
      console.error(
        "Error fetching assigned patients:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch assigned patients"
      });
    }

    res.json(results);
  });
});
router.get("/:doctorId/alerts/count", (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT COUNT(*) AS activeAlerts
    FROM doctor_assignments
    JOIN alerts
      ON doctor_assignments.patient_id = alerts.user_id
    WHERE doctor_assignments.doctor_id = ?
    AND alerts.status = 'active'
  `;

  Doctor.create(sql, [doctorId], (err, results) => {
    if (err) {
      console.error(
        "Error fetching alert count:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch alert count"
      });
    }

    res.json(results[0]);
  });
});
router.get("/:doctorId/dashboard", (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT
      (
        SELECT COUNT(*)
        FROM doctor_assignments
        WHERE doctor_id = ?
      ) AS totalPatients,

      (
        SELECT COUNT(*)
        FROM doctor_assignments da
        JOIN alerts a
          ON da.patient_id = a.user_id
        WHERE da.doctor_id = ?
        AND a.status = 'active'
      ) AS activeAlerts,

      (
        SELECT COUNT(*)
        FROM doctor_assignments da
        JOIN health_records hr
          ON da.patient_id = hr.user_id
        WHERE da.doctor_id = ?
      ) AS totalHealthRecords
  `;

  Doctor.create(
    sql,
    [doctorId, doctorId, doctorId],
    (err, results) => {
      if (err) {
        console.error(
          "Error fetching doctor dashboard:",
          err.message
        );

        return res.status(500).json({
          message: "Failed to fetch doctor dashboard"
        });
      }

      res.json(results[0]);
    }
  );
});
router.get("/:doctorId/alerts", (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT
      alerts.id,
      alerts.user_id,
      users.name AS patient_name,
      alerts.alert_type,
      alerts.message,
      alerts.severity,
      alerts.status,
      alerts.created_at
    FROM doctor_assignments
    JOIN users
      ON doctor_assignments.patient_id = users.id
    JOIN alerts
      ON alerts.user_id = users.id
    WHERE doctor_assignments.doctor_id = ?
 AND alerts.status = 'active'
ORDER BY alerts.created_at DESC
  `;

  Doctor.create(sql, [doctorId], (err, results) => {
    if (err) {
      console.error(
        "Error fetching doctor alerts:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch doctor alerts"
      });
    }

    res.json(results);
  });
});
router.post("/", (req, res) => {
  const {
    user_id,
    hospital_id,
    specialization,
    phone
  } = req.body;

  const sql = `
    INSERT INTO doctors
    (user_id, hospital_id, specialization, phone)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    user_id,
    hospital_id,
    specialization,
    phone
  ];

  Doctor.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating doctor:", err.message);
      return res.status(500).json({
        message: "Failed to create doctor"
      });
    }

    res.status(201).json({
      message: "Doctor created successfully",
      doctorId: result.insertId
    });
  });
});

router.put("/:id", (req, res) => {
  const {
    user_id,
    hospital_id,
    specialization,
    phone
  } = req.body;

  const { id } = req.params;

  const sql = `
    UPDATE doctors
    SET user_id = ?,
        hospital_id = ?,
        specialization = ?,
        phone = ?
    WHERE id = ?
  `;

  const values = [
    user_id,
    hospital_id,
    specialization,
    phone,
    id
  ];

  Doctor.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating doctor:", err.message);
      return res.status(500).json({
        message: "Failed to update doctor"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.json({
      message: "Doctor updated successfully"
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM doctors WHERE id = ?";

  Doctor.create(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting doctor:", err.message);
      return res.status(500).json({
        message: "Failed to delete doctor"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.json({
      message: "Doctor deleted successfully"
    });
  });
});

module.exports = router;