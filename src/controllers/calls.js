const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a call and returns a promise
  resolvable with the new call’s ID if the requester is authorized to create
  the call, or returns a promise rejectable with false if not.
*/
const _create = (requester, skill, member, area, comment) => {
  return modelQueries._create(
    requester, 'call', {skill, member, area, comment}
  );
};

/*
  Define a function that handles the deletion of a call and returns a promise
  resolvable with the deleted call’s ID if the requester is authorized to
  delete the call, or returns a promise rejectable with false if not.
*/
const _delete = (requester, call) => {
  return modelQueries._delete(requester, 'call', call);
};

/*
  Define a function that handles the update of a property of a call and returns
  a promise resolvable with the updated member’s ID if the requester is
  authorized to update that property of that member, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, call, property, value) => {
  return modelQueries._update(requester, 'call', call, property, value);
};

module.exports = {_create, _delete, _update};
