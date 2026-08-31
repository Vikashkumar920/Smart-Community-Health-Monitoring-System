const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const {
    village_name,
    symptoms,
    affected_people,
    report_date
  } = req.body;

  const sql = `
    INSERT INTO community_reports
    (
      village_name,
      symptoms,
      affected_people,
      report_date
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      village_name,
      symptoms,
      affected_people,
      report_date
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to create community report"
        });
      }

      res.status(201).json({
        message: "Community report created successfully",
        reportId: result.insertId
      });
    }
  );
});

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM community_reports ORDER BY id DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch reports"
        });
      }

      res.json(results);
    }
  );
});

router.get("/summary", (req, res) => {
  const sql = `
    SELECT
      SUM(CASE WHEN affected_people >= 50 THEN 1 ELSE 0 END) AS highRiskVillages,
      SUM(CASE WHEN affected_people >= 20 AND affected_people < 50 THEN 1 ELSE 0 END) AS mediumRiskVillages,
      SUM(CASE WHEN affected_people < 20 THEN 1 ELSE 0 END) AS lowRiskVillages
    FROM community_reports
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch summary"
      });
    }

    res.json(results[0]);
  });
});

router.get("/outbreaks", (req, res) => {
  const sql = `
    SELECT
      village_name,
      affected_people
    FROM community_reports
    WHERE affected_people >= 50
    ORDER BY affected_people DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch outbreaks"
      });
    }

    const outbreaks = results.map(report => ({
      village: report.village_name,
      totalHighRiskRecords: report.affected_people,
      status: "OUTBREAK WARNING",
      riskLevel: "CRITICAL"
    }));

    res.json(outbreaks);
  });
});

module.exports = router;