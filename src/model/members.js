const dbQueries = require('../db/queries');
const dbPowers = require('../db/powers');

/*
  Define a function that, if the requester is so authorized, creates a
  member and returns a promise resolvable with the ID of the new member.
*/
const create = (requester, fullname, handle, phase, role) => {
  return dbPowers.hasRow(requester, 'inserter', 'member', false)
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
};

module.exports = {create};
