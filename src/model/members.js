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
  ));
};

module.exports = {create};
