const db = require('../config.js').db;

const Favorite = db.Model.extend({
  tableName: 'favorites',
  hasTimestamps: false,
  userId: function() {
    this.belongsTo(User, 'id');
  }
})

module.exports = Favorite;