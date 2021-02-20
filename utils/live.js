let live = {};

const setLiveData = (data) => {
  live = { ...live, ...data };
};

const getLiveData = () => {
  return live;
};

module.exports = {
  setLiveData,
  getLiveData,
};
