const db = require("../config/db");

const WaterQuality = {
  getAll: (callback) => {
    const sql = `
      SELECT *
      FROM water_quality
      ORDER BY created_at DESC
    `;

    db.query(sql, callback);
  },

  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  }
};

module.exports = WaterQuality;