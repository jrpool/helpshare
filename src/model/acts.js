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
  creates a call, logs it, and returns a promise resolvable with the ID
  of the new call.
*/
const createCall = (requester, skill, location, comment) => {
  return dbPowers.hasRow(requester, 'add', 'call', true)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'call', [
          skill, requester, location, comment, new Date().toUTCString(), null
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

/*
  Define a function that, if there is an authorizing own-row add_row power,
  creates an offer, logs it, and returns a promise resolvable with the ID
  of the new offer.
*/
const createOffer = (requester, call) => {
  return dbPowers.hasRow(requester, 'add', 'offer', true)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'offer', [
          call, requester, new Date().toUTCString(), null
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

/*
  Define a function that, if there is an authorizing own-row add_row power,
  creates an assessment, logs it, and returns a promise resolvable with
  the ID of the new assessment.
*/
const createAssessment = (requester, offer, rating, comment) => {
  return dbPowers.hasRow(requester, 'add', 'assessment', true)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'assessment', [
          offer, requester, rating, comment, new Date().toUTCString()
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

module.exports = {
  createAssessment, createCall, createLocation, createOffer, createRating
};
