const model = require('../model');
const views = require('../views/api');

// Define a function that acts on the requested creation of an object.
const create = (requester, object, properties, response) => {
  model.create(requester, object, properties)
  .then(result => {
    views.create(result, requester, object, properties, response);
  })
  .catch(error => {
    views.error(error);
  });
};

module.exports = {create};
