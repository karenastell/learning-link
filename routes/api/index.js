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
    console.log(data);
    res.json(data);
  });
});

router.get('/search/day/:day', (req, res) => {
  console.log(req.params);
  console.log(req.params.day);
  db.Availability.findAll({
    where: { day: req.params.day },
    include: [{ model: db.User }],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/search/city/:city/state/:state', (req, res) => {
  console.log(req.params.city, req.params.state);
  db.UserProfile.findAll({
    where: { city: req.params.city, state: req.params.state },
    include: [{ model: db.User }],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/search/subject/:subject', (req, res) => {
  console.log(req.params.subject);
  db.Subject.findAll({
    where: { subject: req.params.subject },
    include: [{ model: db.User }],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/search/delivery_method/:delivery_method', (req, res) => {
  console.log(req.params.delivery_method);
  db.UserProfile.findAll({
    where: { delivery_method: req.params.delivery_method },
    include: [{ model: db.User }],
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
