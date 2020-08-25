const router = require('express').Router();
const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

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

router.get('/search/day/:day', (req, res) => {
  console.log(req.params);
  console.log(req.params.day);
  db.User.findAll({
    include: [
      db.UserProfile,
      db.Subjects,
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

router.get('/search/city/:city/state/:state', (req, res) => {
  console.log(req.params.city, req.params.state);
  db.User.findAll({
    include: [
      {
        model: db.UserProfile,
        where: { state: req.params.state },
      },
      { model: db.Availability },
      { model: db.Subject },
    ],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

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

router.put('/edit-profile/:id', async (req, res) => {
  console.log(req.body);

  // Then we can update the user (PUT)
  await db.User.update(
    {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
    },
    { where: { id: req.params.id } },
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
    { where: { UserId: req.params.id } },
  );
  res.json(req.body);
});

module.exports = router;
