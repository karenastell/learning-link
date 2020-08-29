const users = [];

const addUser = ({ id, user1, room }) => {
  const user = { id, user1, room };

  users.push(user);
  return { user };
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser, getUser };
