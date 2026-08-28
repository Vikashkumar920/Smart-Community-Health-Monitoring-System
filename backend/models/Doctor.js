const db = require("../config/db");

const Doctor = {
  getAll: (callback) => {
    const sql = "SELECT * FROM doctors";
    db.query(sql, callback);
  },

  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  }
};

module.exports = Doctor;
