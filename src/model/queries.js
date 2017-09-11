const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a thing, logs it, and returns a promise resolvable with the ID of the
  new thing.
*/
const create = (requester, thing, ownRow, args) => {
  return dbPowers.hasRow(requester, 'add', thing, ownRow)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insert(
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
  Define a function that, if there is an authorizing own-row kill_row power,
  deletes a thing, logs the deletion, and returns a promise resolvable with
  1 if the thing was deleted or 0 if not.
*/
const del = (requester, thing, ownRow, id) => {
  return dbPowers.hasRow(requester, 'kill', thing, ownRow)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.del(requester, dbQueries.getDeleteQuery(thing, id));
    }
    else {
      return false;
    }
  })
  .catch(error => {
    return error;
  });
};

module.exports = {create, del};
