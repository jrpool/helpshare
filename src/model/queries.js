const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that creates a record, logs the creation, and returns
  a promise resolvable with the ID of the inserted record, if there is an
  authorizing power, or returns a promise rejectable with false if there
  is not.
*/
const createObject = (requester, object, isOwn, args) => {
  return dbPowers.hasRow(requester, 'insert', object, isOwn)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit(
        requester, dbQueries.getInsertQuery(object, args)
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
  Define a function that deletes a record, logs the deletion, and returns
  a promise resolvable with the ID of the deleted record, if there is an
  authorizing power, or returns a promise rejectable with false if there
  is not.
*/
const deleteObject = (requester, object, isOwn, id) => {
  return dbPowers.hasRow(requester, 'delete', object, isOwn)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit(requester, dbQueries.getDeleteQuery(object, id));
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
  Define a function that updates a property in a record, logs the update,
  and returns a promise resolvable with the ID of the updated record, if
  there is an authorizing power, or returns a promise rejectable with
  false if there is not.
*/
const updateProperty = (requester, object, isOwn, id, property, value) => {
  return dbPowers.hasCol(requester, 'update', object, property, isOwn)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.submit(
        requester, dbQueries.getUpdateQuery(object, id, property, value)
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

module.exports = {createObject, deleteObject, updateProperty};
