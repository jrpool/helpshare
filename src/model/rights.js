const queries = require('../db/queries');

/*
  Define a function that creates a right and returns a promise resolvable
  with the ID of the new right.
*/
const create = (requester, fullname, handle, phase, role) => {
  return queries.insert(requester, queries.getInsertQuery(
    'member',
    ['fullname', 'handle', 'phase', 'role'],
    [fullname, handle, phase, role]
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
    console.log('Error (models/members/create): ' + error.message);
  });
};

module.exports = {create};
