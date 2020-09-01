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
router.get('/search/day/:day', async (req, res) => {
  const daySearch = await db.User.findAll({
    include: [
      {
        model: db.Availability,
        where: { day: req.params.day },
      },
    ],
  });

  const allUserIds = [];
  const usersDays = [];

  daySearch.forEach((user) => {
    allUserIds.push(user.dataValues.id);
  });

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < allUserIds.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const oneUser = await db.User.findOne({
      where: { id: allUserIds[i] },
      include: [
        { model: db.Subject },
        { model: db.UserProfile },
        { model: db.Availability },
      ],
    });
    usersDays.push(oneUser);
  }
  console.log(usersDays, 'Look here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  res.json(usersDays);
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
router.get('/search/subject/:subject', async (req, res) => {
  console.log(req.params.subject);
  const subjectSearch = await db.User.findAll({
    include: [
      {
        model: db.Subject,
        where: { subject: req.params.subject },
      },
    ],
  });

  const allUserIds = [];
  const usersSubjects = [];

  subjectSearch.forEach((user) => {
    console.log('other for each', user.dataValues.id);
    allUserIds.push(user.dataValues.id);
  });

  console.log(allUserIds);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < allUserIds.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const oneUser = await db.User.findOne({
      where: { id: allUserIds[i] },
      include: [
        { model: db.Subject },
        { model: db.UserProfile },
        { model: db.Availability },
      ],
    });
    usersSubjects.push(oneUser);
  }

  res.json(usersSubjects);
});

router.post('/TutorStudent', async (req, res) => {
  console.log('req.body', req.body);
  // First check that this pair does not already exist
  const alreadyExists = await db.TutorStudent.findOne({
    where: {
      StudentId: req.body.StudentId,
      TutorId: req.body.TutorId,
    },
  });
  console.log(alreadyExists);
  // If the match does not exist, create it.  If not send a message saying it already exists
  if (alreadyExists === null) {
    db.TutorStudent.create({
      TutorId: req.body.TutorId,
      StudentId: req.body.StudentId,
    });

    res.send('Tutor was added to the Student Dashboard');
  } else {
    res.send('This pair already exists');
  }
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

router.post('/mydashboard/review/:id', (req, res) => {
  console.log(req.body);
  db.Review.create({
    review: req.body.review,
    reviewer: req.body.reviewer,
    UserId: req.params.id,
  }).then(() => {
    res.json('Review was posted');
  });
});

router.get('/read-reviews/:id', (req, res) => {
  db.Review.findAll({
    where: { UserId: req.params.id },
  }).then((reviews) => {
    res.json(reviews);
  });
});

router.delete('/mydashboard/:idOne/remove/:idTwo/:isTeacher', (req, res) => {
  const { idOne, idTwo, isTeacher } = req.params;
  console.log(idOne, idTwo, isTeacher);
  if (isTeacher === 'true') {
    db.TutorStudent.destroy({
      where: {
        TutorId: idOne,
        StudentId: idTwo,
      },
    });
  } else {
    db.TutorStudent.destroy({
      where: {
        TutorId: idTwo,
        StudentId: idOne,
      },
    });
  }
  res.json('Entry deleted');
});

router.get(
  '/message-room/tutor:TutorId/student:StudentId',
  async (req, res) => {
    const room = Math.floor(Math.random() * 900000000);
    console.log(req.params.TutorId, req.params.StudentId);
    const roomInfo = await db.Message.findOrCreate({
      where: {
        TutorId: req.params.TutorId,
        StudentId: req.params.StudentId,
      },
      defaults: {
        room,
      },
      include: [{ model: db.User }],
    });

    const userInfo = await db.User.findOne({
      where: {
        id: req.params.StudentId,
      },
      include: [{ model: db.UserProfile }],
    });

    res.json({ roomInfo, userInfo });
  }
);

router.post(
  '/message/tutor:TutorId/student:StudentId/sender:SenderId/room:room',
  (req, res) => {
    console.log(req.params.SenderId, 'sender');
    console.log(req.params.StudentId, 'student');
    console.log(req.params.TutorId, 'Tutor');
    if (req.params.SenderId === req.params.StudentId) {
      db.Message.create({
        message: req.body.message,
        SenderId: req.params.SenderId,
        TutorId: req.params.TutorId,
        StudentId: req.params.StudentId,
        room: req.params.room,
        studentRead: true,
      });
    } else {
      db.Message.create({
        message: req.body.message,
        SenderId: req.params.SenderId,
        TutorId: req.params.TutorId,
        StudentId: req.params.StudentId,
        room: req.params.room,
        tutorRead: true,
      });
    }

    res.json('message was posted to database');
  }
);

router.get('/all-messages/student:studentId', (req, res) => {
  console.log(req.params.studentId);
  db.Message.findAll({
    where: { StudentId: req.params.studentId },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/all-messages/tutor:tutorId', (req, res) => {
  console.log(req.params.tutorId);
  db.Message.findAll({
    where: { TutorId: req.params.tutorId },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/all-messages/student-name/:studentId', (req, res) => {
  console.log(req.params.studentId);
  db.User.findOne({
    where: { id: req.params.studentId },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/sent-messages-to/:personId', (req, res) => {
  console.log(req.params.personId);
  db.User.findOne({
    where: { id: req.params.personId },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

router.get('/all-messages/:studentId/:tutorId', (req, res) => {
  console.log(req.params);
  db.Message.findAll({
    where: { StudentId: req.params.studentId, TutorId: req.params.tutorId },
    include: { model: db.User },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
