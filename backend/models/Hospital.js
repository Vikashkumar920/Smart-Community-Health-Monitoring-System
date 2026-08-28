const db = require("../config/db");

const Hospital = {
  getAll: (callback) => {
    const sql = "SELECT * FROM hospitals";
    db.query(sql, callback);
  },

  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  }
};

module.exports = Hospital;
