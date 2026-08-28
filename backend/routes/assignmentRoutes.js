const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
router.get("/", (req, res) => {
  Assignment.getAll((err, results) => {
    if (err) {
      console.error(
        "Error fetching assignments:",
        err.message
      );

      return res.status(500).json({
        message: "Failed to fetch assignments"
      });
    }

    res.json(results);
  });
});
router.post("/", (req, res) => {
  const { doctor_id, patient_id } = req.body;

  const sql = `
    INSERT INTO doctor_assignments
    (doctor_id, patient_id)
    VALUES (?, ?)
  `;

  Assignment.create(
    sql,
    [doctor_id, patient_id],
    (err, result) => {
      if (err) {
        console.error(
          "Error assigning doctor:",
          err.message
        );

        return res.status(500).json({
          message: "Failed to assign doctor"
        });
      }

      res.status(201).json({
        message: "Doctor assigned successfully",
        assignmentId: result.insertId
      });
    }
  );
});

module.exports = router;