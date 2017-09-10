const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a location, logs it, and returns a promise resolvable with the ID of the
  new location.
*/
const createLocation = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'location', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'location', [description]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

/*
  Define a function that, if there is an authorizing add_row power, creates
  a rating, logs it, and returns a promise resolvable with the ID of the
  new rating.
*/
const createRating = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'rating', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'rating', [description]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

/*
  Define a function that, if there is an authorizing own-row add_row power,
  creates a request, logs it, and returns a promise resolvable with the ID
  of the new request.
*/
const createRequest = (requester, skill, location, comment) => {
  return dbPowers.hasRow(requester, 'add', 'request', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'request', [
          skill, requester, location, comment, Date.now(), null
        ]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

module.exports = {createLocation, createRating, createRequest};
