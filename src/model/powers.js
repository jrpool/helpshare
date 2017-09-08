const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a column power (i.e. “change” or “read”), logs it, and returns a promise
  resolvable with true.
*/
const colCreate = (requester, power, table, col, role) => {
  const powerTable = `${power}_col`;
  return dbPowers.hasRow(requester, 'add', powerTable, false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insert(requester, dbQueries.getInsertQuery(
        powerTable, [table, col, role]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => error);
};

/*
  Define a function that, if there is an authorizing add_row power, creates
  a row power (i.e. “add” or “kill”), logs it, and returns a promise
  resolvable with true.
*/
const rowCreate = (requester, power, table, role) => {
  const powerTable = `${power}_row`;
  return dbPowers.hasRow(requester, 'add', powerTable, false)
  .then(resultRow => {
    if (resultRow.has_power) {
      return dbQueries.insert(requester, dbQueries.getInsertQuery(
        powerTable, [table, role]
      ));
    }
    else {
      return false;
    }
  })
  .catch(error => error);
};

module.exports = {colCreate, rowCreate};
