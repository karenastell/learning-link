module.exports = (sequelize, Datatypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: Datatypes.TEXT,
    },
  });

  return Review;
};
