module.exports = (sequelize, Datatypes) => {
  const TutorStudent = sequelize.define('TutorStudent', {
    StudentId: Datatypes.INTEGER,
    TutorId: Datatypes.INTEGER,
  });


  return TutorStudent;
};
