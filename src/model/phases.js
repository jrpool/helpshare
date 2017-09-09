const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a phase, logs it, and returns a promise resolvable with the ID of the
  new phase.
*/
const create = (requester, description) => {
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

module.exports = {create};