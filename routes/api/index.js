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

router.put('/edit-profile/subjects/:id', async (req, res) => {
  // delete existing subjects, then post the new ones
  console.log(req.body)
  await db.Subject.destroy({
    where: { UserId: req.params.id },
  });
  await req.body.forEach((subject) => {
    db.Subject.create({
      subject,
      UserId: req.params.id,
    });
  });
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

});

router.put('/edit-profile/:id', async (req, res) => {
  console.log(req.body);

  // first we need to delete existing subjects and days(delete)
  // if the role is teacher, delete the availabilities, then create the new ones
  if (req.body.user.isTeacher === true) {
    console.log(req.body.availabilityInfo, 'there is availability info');
    // await db.Availability.destroy({
    //   where: { UserId: req.params.id },
    // });
  } else {
    console.log('no availability info');
  }

  // Then we can update the user (PUT)
  // db.User.updateOne()
});
// .then((data) => {
//   // console.log(data);
//   // res.json(data);
// })

module.exports = router;
