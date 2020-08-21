module.exports = (sequelize, Datatypes) => {
  const Subject = sequelize.define('Subject', {
    subject: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Subject.associate = (models) => {
    Subject.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Subject;
};
