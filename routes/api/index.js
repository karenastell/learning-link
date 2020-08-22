const router = require('express').Router();
const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

router.get('/myprofile/:id', (req, res) => {
  console.log(req.params.id, "this is the params");
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

router.put('/edit-profile/:id', (req, res) => {
  console.log(req.body);
  db.User.updateOne()
}).then((data) => {
  console.log(data);
  res.json(data);
})

module.exports = router;
