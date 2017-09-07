const queries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if there is an authorizing add_row power, creates
  a column power (i.e. change_col or read_col) and returns a promise
  resolvable with the ID of the new power.
*/
const colCreate = (requester, power, table, col, role) => {
  return dbPowers.hasRow(requester, 'inserter', power, false)
  .then(table => {
    if (table) {
      return dbQueries.insert(requester, queries.getInsertQuery(
        'member',
        ['fullname', 'handle', 'phase', 'role'],
        [fullname, handle, phase, role]
      ))
    }
    else {
      throw `Member ${requester} may not create a member.\n`;
    }
  })
  .then(id => {
    if (typeof id !== 'number') {
      throw 'Member insertion failed.';
    }
    else {
      return id;
    }
  })
  .catch(error => error);




  return queries.insert(requester, queries.getInsertQuery(
    power, ['relation', 'col', 'role'], [table, col, role]
  ))
  .then(id => {
    if (typeof id !== 'number') {
      throw 1;
    }
    else {
      return id;
    }
  })
  .catch(error => {
    console.log('Error (model/powers/colCreate): ' + error.message);
  });
};

/*
  Define a function that creates a row right and returns a promise resolvable
  with the ID of the new right.
*/
const rowCreate = (requester, right, table, role) => {
  return queries.insert(requester, queries.getInsertQuery(
    right, ['relation', 'role'], [table, role]
  ))
  .then(id => {
    if (typeof id !== 'number') {
      throw 1;
    }
    else {
      return id;
    }
  })
  .catch(error => {
    console.log('Error (model/powers/rowCreate): ' + error.message);
  });
};

module.exports = {create};
