const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a badge and returns a promise
  resolvable with the new badge’s ID if the requester is authorized to create
  the badge, or returns a promise rejectable with false if not.
*/
const _create = (requester, member, role) => {
  return modelQueries._create(requester, 'badge', {member, role});
};

/*
  Define a function that handles the deletion of a badge and returns a promise
  resolvable with the deleted badge’s ID if the requester is authorized to
  delete the badge, or returns a promise rejectable with false if not.
*/
const _delete = (requester, badge) => {
  return modelQueries._delete(requester, 'badge', badge);
};

/*
  Define a function that handles the update of a property of a badge and
  returns a promise resolvable with the updated badge’s ID if the requester
  is authorized to update that property of that badge, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, badge, property, value) => {
  return modelQueries._update(requester, 'badge', badge, property, value);
};

module.exports = {_create, _delete, _update};
