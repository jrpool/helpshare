const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a domain, logs it, and returns a promise resolvable with the ID of the
  new domain.
*/
const createDomain = (requester, description) => {
  return dbPowers.hasRow(requester, 'add', 'domain', false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insertAndGetID(requester, dbQueries.getInsertQuery(
        'domain', [description]
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

module.exports = {createDomain};
