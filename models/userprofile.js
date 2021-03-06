module.exports = (sequelize, Datatypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    bio: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    degree: Datatypes.STRING,
    experience: Datatypes.TEXT,
    delivery_method: Datatypes.STRING,
    city: Datatypes.STRING,
    state: Datatypes.STRING,
    rate: Datatypes.STRING,
    grade: Datatypes.STRING,
    school: Datatypes.STRING,
    special_ed: Datatypes.BOOLEAN,
    duration: Datatypes.STRING,
  });

  UserProfile.associate = (models) => {
    //   hasOne or belongsTo?
    UserProfile.belongsTo(models.User, {
      // foreignKey: {
      //   allowNull: false,
      // },
    });
  };

  return UserProfile;
};
