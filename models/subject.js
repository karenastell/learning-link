module.exports = (sequelize, Datatypes) => {
  const Subject = sequelize.define('Subject', {
    subject: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return Subject;
};
