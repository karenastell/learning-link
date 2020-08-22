const router = require('express').Router();
const db = require('../../models');
const passport = require('../../config/passport');

// Using the passport.authenticate middleware with our local strategy.
// passport.authenticate() is a middle ware provided by passport
// and is configured
router.post('/login', passport.authenticate('local'), (req, res) => {
  // console.log(req.user.dataValues);
  console.log('user is logged in');
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically
// hashed and stored securely thanks to how we configured our
// Sequelize User Model. If the user is created successfully, proceed
//  to log the user in, otherwise send back an error
// /api/auth/signup
// handle the tutor signup POST
router.post('/signup-tutor', async (req, res) => {
  // TODO: add something to check if their email already exists.... or this may already be done...
  let UserId;
  // create the User in the User table first
  const dbUser = await db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isTeacher: true,
  });
  console.log(dbUser.dataValues.id, 'This should be the id');

  const setUserId = () => {
    UserId = dbUser.dataValues.id;
  };
  await setUserId();

  // // after the User is created, then make the UserProfile
  const dbUserProfile = await db.UserProfile.create({
    bio: req.body.bio,
    degree: req.body.degree,
    experience: req.body.experience,
    delivery_method: req.body.delivery_method,
    city: req.body.city,
    state: req.body.state,
    rate: req.body.rate,
    UserId,
  });
  console.log(dbUserProfile);

  // for each subject in the subjects array, create the row in the table
  await req.body.subjects.forEach((subject) => {
    db.Subject.create({
      subject: subject,
      UserId,
    });
  });

  // for each day in the days array, create the row in the Availability table
  await req.body.days.forEach((day) => {
    db.Availability.create({
      day: day,
      UserId,
    });
  });

  res.json(dbUserProfile);
});

// Handle the student sign up POST
router.post('/signup-student', async (req, res) => {
  // TODO: add something to check if their email already exists....let UserId;
  let UserId;
  const dbUser = await db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isTeacher: false,
  });

  const setUserId = () => {
    UserId = dbUser.dataValues.id;
  };
  await setUserId();

  const dbUserProfile = await db.UserProfile.create({
    bio: req.body.bio,
    delivery_method: req.body.delivery_method,
    city: req.body.city,
    state: req.body.state,
    grade: req.body.grade,
    school: req.body.school,
    special_ed: req.body.special_ed,
    duration: req.body.duration,
    UserId,
  });

  // const dbSubject = await db.Subject.create({
  //   subject: req.body.subject,
  //   UserId,
  // });

  console.log(req.body);
  console.log(req.body.subjects);

  await req.body.subjects.forEach((subject) => {
    db.Subject.create({
      subject,
      UserId,
    });
  });
  res.json(dbUserProfile);
});

// Route for logging user out
router.get('/logout', (req, res) => {
  req.logout();
  res.json('logout successful');
});

// Route for getting some data about our user to be used client side
router.get('/user_data', (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
