module.exports = (sequelize, Datatypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: Datatypes.TEXT,
    },
    reviewer: {
      type: Datatypes.STRING,
      defaultValue: 'Anonymous',
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    });
  };

  return Review;
};
