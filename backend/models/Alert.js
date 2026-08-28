const db = require("../config/db");

const Alert = {
  getAll: (callback) => {
    const sql = "SELECT * FROM alerts ORDER BY created_at DESC";
    db.query(sql, callback);
  },

  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  }
};

module.exports = Alert;
