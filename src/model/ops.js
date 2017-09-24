const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that creates a record, logs the creation, and returns
  a promise resolvable with the inserted record, if there is an authorizing
  power, or returns a promise rejectable with false if there is not.
*/
const _create = (requester, object, args) => {
  return dbPowers._insert(requester, object, args)
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
  a promise resolvable with the deleted record, if there is an authorizing
  power, or returns a promise rejectable with false if there is not.
*/
const _delete = (requester, object, id) => {
  return dbPowers._delete(requester, object, id)
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
  Define a function that updates a property in a record, logs the update, and
  returns a promise resolvable with the updated record, if there is an
  authorizing power, or returns a promise rejectable with false if there is not.
*/
const _update = (requester, object, id, property, value) => {
  return dbPowers._update(requester, object, property, id)
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

module.exports = {_create, _delete, _update};
