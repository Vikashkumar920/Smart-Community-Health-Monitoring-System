const db = require("../config/db");

const HealthRecord = {
  getAll: (callback) => {
    const sql = "SELECT * FROM health_records";
    db.query(sql, callback);
  },

  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  }
};

module.exports = HealthRecord;