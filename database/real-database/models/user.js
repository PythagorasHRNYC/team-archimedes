const db = require('../config.js').db;

const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false
})

module.exports = User;