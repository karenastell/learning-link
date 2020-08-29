const users = [];

const addUser = ({ id, user1, user2 }) => {
  const user = { id, user1, user2 };

  users.push(user);
  return { user };
};

const getUser = (id) => users.find((use) => user.id === id);

module.exports = { addUser, getUser };
