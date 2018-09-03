var generateMessage = (from, text) => {
  return {
    from, //ES6 equi of from: from
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage};
