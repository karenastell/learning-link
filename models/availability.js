module.exports = (sequelize, Datatypes) => {
  const Availability = sequelize.define('Availability', {
    day: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  return Availability;
};
