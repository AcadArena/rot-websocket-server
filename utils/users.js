let users = [];

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  if (!users.some((u) => u === user)) {
    users.push(user);
  }
  return user;
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (roomId) => {
  return users.filter((user) => user.room === roomId);
};

const removeUser = (id) => {
  users = users.filter((u) => u.id !== id);
};

const updateUsername = (id, newUsername) => {
  users = users.map((u) => (u.id === id ? { ...u, username: newUsername } : u));
  return users;
};

module.exports = {
  userJoin,
  getCurrentUser,
  getUsersInRoom,
  removeUser,
  updateUsername,
};
