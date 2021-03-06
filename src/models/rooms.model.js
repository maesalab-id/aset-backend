// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const rooms = sequelizeClient.define('rooms', {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  rooms.associate = function (models) {
    rooms.hasMany(models.assets, { onDelete: 'cascade' });
    rooms.belongsTo(models.majors, { onDelete: 'cascade' });
  };

  return rooms;
};
