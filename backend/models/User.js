const db = require("../config/db");

const User = {
  getAll: (callback) => {
    const sql = "SELECT id, name, email, role, created_at FROM users";
    db.query(sql, callback);
  },

  create: (sql, values, callback) => {
    db.query(sql, values, callback);
  }
};

module.exports = User;