
module.exports = (sequelize, Datatypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: Datatypes.TEXT,
    },
    room: {
      type: Datatypes.INTEGER,
    },
    tutorRead: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
    studentRead: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'SenderId',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'StudentId',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'TutorId',
    });
  };

  return Message;
};
