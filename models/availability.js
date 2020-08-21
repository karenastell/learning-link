module.exports = (sequelize, Datatypes) => {
  const Availability = sequelize.define('Availability', {
    day: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  Availability.associate = (models) => {
    Availability.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Availability;
};
