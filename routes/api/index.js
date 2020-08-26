const router = require('express').Router();
const { Op } = require('sequelize');
const db = require('../../models');
// const isAuthenticated = require('../../config/middleware/isAuthenticated');

// Get the User's profile information to populate the My Profile page
router.get('/myprofile/:id', (req, res) => {
  console.log(req.params.id, 'this is the params');
  db.User.findOne({
    where: { id: req.params.id },
    include: [
      { model: db.UserProfile },
      { model: db.Subject },
      { model: db.Availability },
    ],
  }).then((data) => {
    // console.log(data);
    res.json(data);
  });
});

// Search route if the user searches by availability
router.get('/search/day/:day', (req, res) => {
  console.log(req.params);
  console.log(req.params.day);
  db.User.findAll({
    include: [
      db.UserProfile,
      db.Subject,
      {
        model: db.Availability,
        where: { day: req.params.day },
      },
    ],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// search route if user searches by location
router.get('/search/city/:city/state/:state', (req, res) => {
  console.log(req.params.city, req.params.state);
  db.User.findAll({
    include: [
      {
        model: db.UserProfile,
        where: { city: req.params.city, state: req.params.state },
      },
      { model: db.Availability },
      { model: db.Subject },
    ],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// search route if user searches by subjects
router.get('/search/subject/:subject', (req, res) => {
  console.log(req.params.subject);
  db.User.findAll({
    include: [
      db.UserProfile,
      db.Availability,
      {
        model: db.Subject,
        where: { subject: req.params.subject },
      },
    ],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.post('/TutorStudent', (req, res) => {
  console.log('req.body', req.body);
  db.TutorStudent.create({
    TutorId: req.body.TutorId,
    StudentId: req.body.StudentId,
  });

  res.send('Tutor was added to the Student Dashboard');
});

// search route if user searches by method of delivery

router.get('/search/delivery_method/:delivery_method', (req, res) => {
  console.log(req.params.delivery_method);
  db.User.findAll({
    include: [
      db.Subject,
      db.Availability,
      {
        model: db.UserProfile,
        where: { delivery_method: req.params.delivery_method },
      },
    ],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// Route to edit the myprofile page subjects
router.put('/edit-profile/subjects/:id', async (req, res) => {
  // delete existing subjects, then post the new ones
  console.log(req.body);
  await db.Subject.destroy({
    where: { UserId: req.params.id },
  });
  await req.body.forEach((subject) => {
    db.Subject.create({
      subject,
      UserId: req.params.id,
    });
  });
  res.json(req.body);
});

// route to edit the myprofile availability
router.put('/edit-profile/availability/:id', async (req, res) => {
  // delete existing subjects, then post the new ones
  console.log(req.body);
  await db.Availability.destroy({
    where: { UserId: req.params.id },
  });

  await req.body.forEach((day) => {
    db.Availability.create({
      day,
      UserId: req.params.id,
    });
  });
  res.json(req.body);
});

// route to edit the user's basic profile information
router.put('/edit-profile/:id', async (req, res) => {
  console.log(req.body);

  // Then we can update the user (PUT)
  await db.User.update(
    {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
    },
    { where: { id: req.params.id } }
  );

  await db.UserProfile.update(
    {
      bio: req.body.userProfile.bio,
      degree: req.body.userProfile.degree,
      experience: req.body.userProfile.experience,
      delivery_method: req.body.userProfile.delivery_method,
      city: req.body.userProfile.city,
      state: req.body.userProfile.state,
      grade: req.body.userProfile.grade,
      school: req.body.userProfile.school,
      duration: req.body.userProfile.duration,
      rate: req.body.userProfile.rate,
    },
    { where: { UserId: req.params.id } }
  );
  res.json(req.body);
});

// Get the tutor-student matches to use for displaying on the dashboard
router.get('/mydashboard/:id', (req, res) => {
  db.TutorStudent.findAll({
    where: {
      [Op.or]: [{ StudentId: req.params.id }, { TutorId: req.params.id }],
    },
  }).then((data) => {
    res.json(data);
  });
});

router.get('/mydashboard/mypeeps/:id', (req, res) => {
  db.User.findOne({
    where: { id: req.params.id },
    include: [
      { model: db.UserProfile },
      { model: db.Subject },
      { model: db.Availability },
    ],
  }).then((data) => {
    // console.log(data);
    res.json(data);
  });
});

module.exports = router;
