let rooms = {};
const setLiveData = (data, roomId) => {
  if (!Boolean(roomId)) return;
  rooms = { ...rooms, [roomId]: { ...rooms[roomId], ...data } };
};

const getLiveData = (roomId) => {
  return rooms[roomId];
};

module.exports = {
  setLiveData,
  getLiveData,
};
