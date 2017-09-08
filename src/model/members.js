const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a member, logs it, and returns a promise resolvable with the ID of the
  new member.
*/
const create = (requester, fullname, handle, phase, role) => {
  return dbPowers.hasRow(requester, 'add', 'member', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'member', [fullname, handle, phase, role]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => error);
};

module.exports = {create};
