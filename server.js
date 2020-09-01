const express = require('express');

const app = express();
const session = require('express-session');
const path = require('path');
const server = require('http').createServer(app);
const socketio = require('socket.io');
// const http = require('http');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');
const { addUser, getUser } = require('./users');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('we have a new connection!!!!!!');
  socket.on('join', ({ user1, room }, callback) => {
    console.log(user1, room);
    const { user } = addUser({ id: socket.id, user1, room });

    socket.emit('message', {
      user: 'admin',
      text: 'Welcome to Learning Link Messaging!',
    });

    // socket.broadcast.to(user.room).emit('message', {
    //   user: 'admin',
    //   text: `user: ${user.name} has joined`,
    // });

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.user1, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('user has left!!!!');
  });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Express boilerplate middleware
// =============================================
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session middleware
// =============================================
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routing
// =============================================
app.use('/api', routes);
app.use(cors());
// Everything that is not an api request is sent to index.html
// for client side routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Sync sequelize models then start Express app
// =============================================
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('\n*************************************');
    console.log(`${process.env.DB_NAME} database connected`);
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
      console.log('*************************************\n');
    });
  });
