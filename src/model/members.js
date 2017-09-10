const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a member, logs it, and returns a promise resolvable with the ID of the
  new member.
*/
const create = (requester, fullname, handle, phase) => {
  return dbPowers.hasRow(requester, 'add', 'member', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'member', [fullname, handle, phase]
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
  a phase, logs it, and returns a promise resolvable with the ID of the
  new phase.
*/
const createPhase = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'phase', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'phase', [description]
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

module.exports = {create, createPhase};
