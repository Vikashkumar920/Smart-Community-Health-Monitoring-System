const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const sql = `
    SELECT w1.*
    FROM water_quality w1
    INNER JOIN (
      SELECT village_name, MAX(id) AS latest_id
      FROM water_quality
      GROUP BY village_name
    ) w2
    ON w1.id = w2.latest_id
    ORDER BY w1.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch village risks"
      });
    }

    res.json(results);
  });
});

router.get("/summary", (req, res) => {
  const sql = `
    SELECT
      SUM(CASE WHEN risk_status = 'high' THEN 1 ELSE 0 END) AS highRiskVillages,
      SUM(CASE WHEN risk_status = 'medium' THEN 1 ELSE 0 END) AS mediumRiskVillages,
      SUM(CASE WHEN risk_status = 'low' THEN 1 ELSE 0 END) AS lowRiskVillages
    FROM (
      SELECT w1.*
      FROM water_quality w1
      INNER JOIN (
        SELECT village_name, MAX(id) AS latest_id
        FROM water_quality
        GROUP BY village_name
      ) w2
      ON w1.id = w2.latest_id
    ) latest_records
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch village risk summary"
      });
    }

    res.json(results[0]);
  });
});

router.get("/outbreaks", (req, res) => {
  const sql = `
    SELECT
      village_name,
      COUNT(*) AS totalRecords
    FROM water_quality
    WHERE risk_status = 'high'
    GROUP BY village_name
    HAVING COUNT(*) >= 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to detect outbreaks"
      });
    }

    const outbreaks = results.map(village => ({
      village: village.village_name,
      totalHighRiskRecords: village.totalRecords,
      status: "OUTBREAK WARNING",
      riskLevel: "CRITICAL"
    }));

    res.json(outbreaks);
  });
});

module.exports = router;