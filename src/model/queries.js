const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a thing, logs it, and returns a promise resolvable with the ID of the
  new thing, or, if not, with false.
*/
const createOne = (requester, thing, own, args) => {
  return dbPowers.hasRow(requester, 'add', thing, own)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit(
        requester, dbQueries.getInsertQuery(thing, args)
      );
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
  Define a function that, if there is an authorizing kill_row power, deletes
  a thing, logs the deletion, and returns a promise resolvable with the
  result of the deletion, or, if not, with false.
*/
const deleteOne = (requester, thing, own, id) => {
  return dbPowers.hasRow(requester, 'kill', thing, own)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit(requester, dbQueries.getDeleteQuery(thing, id));
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
  Define a function that, if there is an authorizing change_col power,
  changes the value of a property of a thing, logs the change, and returns
  a promise resolvable with the ID of the thing, or, if not, with false.
*/
const changeOne = (requester, thing, own, id, property, value) => {
  return dbPowers.hasCol(requester, 'change', thing, property, own)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit(
        requester, dbQueries.getUpdateQuery(thing, id, property, value)
      );
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

module.exports = {createOne, deleteOne, changeOne};
