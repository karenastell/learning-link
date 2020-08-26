module.exports = (sequelize, Datatypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: Datatypes.TEXT,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'recieverId',
    });
  };

  return Message;
};
