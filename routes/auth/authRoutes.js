const router = require('express').Router();
const db = require('../../models');
const passport = require('../../config/passport');

// Using the passport.authenticate middleware with our local strategy.
// passport.authenticate() is a middle ware provided by passport
// and is configured
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req);
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically
// hashed and stored securely thanks to how we configured our
// Sequelize User Model. If the user is created successfully, proceed
//  to log the user in, otherwise send back an error
// /api/auth/signup
router.post('/signup-tutor', async (req, res) => {
  // add something to check if their email already exists....
  let UserId;
  const dbUser = await db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isTeacher: true,
  })
    .then((dbResponse) => {
      console.log(dbResponse.dataValues.id, 'this is the user ID');
      UserId = dbResponse.dataValues.id;
      // res.json(dbResponse);
    })
    .catch((err) => {
      res.json(err);
    });

  const dbUserProfile = await db.UserProfile.create({
    bio: req.body.bio,
    degree: req.body.degree,
    experience: req.body.experience,
    delivery_method: req.body.delivery_method,
    location: req.body.location,
    rate: req.body.rate,
    UserId,
  });
  console.log(dbUserProfile);

  const dbSubject = await db.Subject.create({
    subject: req.body.subject,
    UserId,
  });

  const dbAvailability = await db.Availability.create({
    day: req.body.day,
    UserId,
  });

  res.json(dbUserProfile);
});
router.post('/signup-student', async (req, res) => {
  // check for the same email
  let UserId;
  const dbUser = await db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isTeacher: false,
  })
    .then((dbResponse) => {
      console.log(dbResponse.dataValues.id, 'this is the user ID');
      UserId = dbResponse.dataValues.id;
    })
    .catch((err) => {
      res.json(err);
    });

  const dbUserProfile = await db.UserProfile.create({
    bio: req.body.bio,
    delivery_method: req.body.delivery_method,
    location: req.body.location,
    grade: req.body.grade,
    school: req.body.school,
    special_ed: req.body.special_ed,
    duration: req.body.duration,
    UserId,
  });
  const dbSubject = await db.Subject.create({
    subject: req.body.subject,
    UserId,
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
