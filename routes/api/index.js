const router = require('express').Router();
const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

// TODO: we will want to make sure this is authenticated!!!!
// router.get('/my-profile', (req, res) => {
//   db.UserProfile.
// });

module.exports = router;
