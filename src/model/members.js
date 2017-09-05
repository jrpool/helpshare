const queries = require('../db/queries');

/*
  Define a function that creates a member and returns a promise resolvable
  with the ID of the new member.
*/
const create = (member, fullname, handle, phase, role) => {
  return queries.insert(member, queries.getInsertQuery(
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
  })
};

module.exports = {create};
