const db = require("../config/db");

const Assignment = {
  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM doctor_assignments";
    db.query(sql, callback);
  }
};

module.exports = Assignment;