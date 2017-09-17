const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a claim and returns a promise
  resolvable with the new claim’s ID if the requester is authorized to create
  the claim, or returns a promise rejectable with false if not.
*/
const _create = (requester, member, skill) => {
  return modelQueries._create(requester, 'claim', {member, skill});
};

/*
  Define a function that handles the deletion of a claim and returns a promise
  resolvable with the deleted claim’s ID if the requester is authorized to
  delete the claim, or returns a promise rejectable with false if not.
*/
const _delete = (requester, claim) => {
  return modelQueries._delete(requester, 'claim', claim);
};

/*
  Define a function that handles the update of a property of a claim and
  returns a promise resolvable with the updated claim’s ID if the requester
  is authorized to update that property of that claim, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, claim, property, value) => {
  return modelQueries._update(requester, 'claim', claim, property, value);
};

module.exports = {_create, _delete, _update};
