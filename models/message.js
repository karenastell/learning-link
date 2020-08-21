module.exports = (sequelize, Datatypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: Datatypes.TEXT,
    },
  });

  return Message;
};
