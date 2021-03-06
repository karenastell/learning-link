const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    // The email cannot be null, and must be a proper email before creation
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isTeacher: {
      type: DataTypes.BOOLEAN,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.User, {
      through: 'TutorStudent',
      as: 'Student',
      foreignkey: 'TutorId',
      otherKey: 'StudentId',
    });
  };

  User.associate = (models) => {
    User.belongsToMany(models.User, {
      through: 'TutorStudent',
      as: 'Tutor',
      foreignkey: 'StudentId',
      otherKey: 'TutorId',
    });
  };

  User.associate = (models) => {
    User.hasOne(models.UserProfile, {
      foreignKey: {
        allowNull: false,
      },
    });
    User.hasMany(models.Subject, {
      onDelete: 'cascade',
    });

    User.hasMany(models.Availability, {
      onDelete: 'cascade',
    });

    User.hasMany(models.Review, {
      onDelete: 'cascade',
    });

    // User.hasMany(models.Message, {
    //   onDelete: 'casecade',
    //   foreignKey: 'recieverId',
    // });
    // User.hasMany(models.Message, {
    //   onDelete: 'casecade',
    //   foreignKey: 'senderId',
    // });
  };

  // Creating a custom method for our User model. This will check if an unhashed
  // password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook('beforeCreate', (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null,
    );
  });
  return User;
};
