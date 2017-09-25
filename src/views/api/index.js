const renderError = ((error, response) => {
  response.send(error.message + '\n' + error.stack);
});

const create = (id, requester, object, properties, response) => {
  if (result) {
    response.send(`Member ${requester} created ${object} ${id}.`);
  }
  else {
    response.send(
      `Member ${requester} has no permission to create a(n) ${object}.`
    );
  }
};

const error = (error, requester, object, properties, response) => {
  renderError(error, response)
};

module.exports = {create, error, renderError};
