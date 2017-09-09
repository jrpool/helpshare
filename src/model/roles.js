const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a role, logs it, and returns a promise resolvable with the ID of the
  new role.
*/
const create = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'role', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'role', [description]
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
  a roleplay, logs it, and returns a promise resolvable with the ID of the
  new roleplay.
*/
const grant = (requester, member, role) => {
  return dbPowers.hasRow(requester, 'add', 'roleplay', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'roleplay', [member, role]
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

module.exports = {create, grant};
