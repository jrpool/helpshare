const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of an offer and returns a promise
  resolvable with the new offer’s ID if the requester is authorized to create
  an offer, or returns a promise rejectable with false if not.
*/
const _create = (requester, call, member) => {
  return modelQueries._create(requester, 'offer', {call, member});
};

/*
  Define a function that handles the deletion of an offer and returns a promise
  resolvable with the deleted offer’s ID if the requester is authorized to
  delete the offer, or returns a promise rejectable with false if not.
*/
const _delete = (requester, offer) => {
  return modelQueries._delete(requester, 'offer', offer);
};

/*
  Define a function that handles the update of a property of an offer and
  returns a promise resolvable with the updated offer’s ID if the requester
  is authorized to update that property of that offer, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, offer, property, value) => {
  return modelQueries._update(requester, 'offer', offer, property, value);
};

module.exports = {_create, _delete, _update};
