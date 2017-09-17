const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a member and returns
  a promise resolvable with the new member’s ID if the requester is
  authorized to create a member, or returns a promise rejectable with false
  if not.
*/
const _create = (requester, fullname, handle, phase) => {
  return modelQueries.createObject(
    requester, 'member', false, {fullname, handle, phase}
  );
};

/*
  Define a function that handles the deletion of a member and returns
  a promise resolvable with the deleted member’s ID if the requester is
  authorized to delete the member, or returns a promise rejectable with false
  if not.
*/
const _delete = (requester, member, isOwn) => {
  return modelQueries.deleteObject(requester, 'member', isOwn, member);
};

/*
  Define a function that handles the update of a property of a member and
  returns a promise resolvable with the updated member’s ID if the requester
  is authorized to update that property of that member, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, member, property, value, isOwn) => {
  return modelQueries.updateProperty(
    requester, 'member', isOwn, member, property, value
  );
};

module.exports = {_create, _delete, _update};
