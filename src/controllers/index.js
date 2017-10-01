const model = require('../model');
const views = require('../views/api');

// Define a function that handles requests to retrieve all objects of a type.
const readAll = (requester, object, response) => {
  model.readAll(requester, object)
  .then(resultRows => {
    views.reportAll(resultRows, requester, object, response);
  })
  .catch(error => {
    views.error(error, response);
  });
};

// Define a function that handles requests to retrieve 1 object.
const read1Record = (requester, object, id, response) => {
  model.read1Record(requester, object, id)
  .then(resultRow => {
    views.report1Record(resultRow, requester, object, id, response);
  })
  .catch(error => {
    views.error(error, response);
  });
};

/*
  Define a function that handles requests to retrieve 1 property of all
  objects of a type.
*/
const read1Property = (requester, object, property, response) => {
  model.read1Property(requester, object, property)
  .then(resultRows => {
    views.report1Property(
      resultRows, requester, object, property, response
    );
  })
  .catch(error => {
    views.error(error, response);
  });
};

// Define a function that handles object-creation requests.
const create1Record = (requester, object, specs, response) => {
  model.create1Record(requester, object, specs)
  .then(resultRow => {
    views.created1Record(resultRow, requester, object, specs, response);
  })
  .catch(error => {
    views.error(error, response);
  });
};

// Define a function that handles single-object deletion requests.
const delete1Record = (requester, object, id, response) => {
  model.delete1Record(requester, object, id)
  .then(resultRow => {
    views.deleted1Record(resultRow, requester, object, id, response);
  })
  .catch(error => {
    views.error(error, response);
  });
};

// Define a function that handles single-object single-property update requests.
const update1Value = (requester, object, id, property, value, response) => {
  model.update1Value(requester, object, id, property, value)
  .then(resultRow => {
    views.updated1Value(
      resultRow, requester, object, id, property, value, response
    );
  })
  .catch(error => {
    views.error(error, response);
  });
};

// Define a function that acts on an error.
const error = (error, response) => {
  views.error(error, response);
};

module.exports = {
  readAll, read1Record, read1Property, create1Record,
  delete1Record, update1Value, error
};
