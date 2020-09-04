module.exports = (sequelize, Datatypes) => {
  const Event = sequelize.define('Event', {
    event: {
      type: Datatypes.STRING,
    },
    start: {
      type: Datatypes.DATE,
    },
    end: {
      type: Datatypes.DATE,
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'TutorId',
    });
    Event.belongsTo(models.User, {
      foreignKey: 'StudentId',
    });
  };
  return Event;
};
