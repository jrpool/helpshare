const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a power and returns a promise
  resolvable with the new power’s ID if the requester is authorized to create a power, or returns a promise rejectable with false if not.
*/
const _create = (requester, action, object, property, role) => {
  return modelQueries._create(
    requester, 'power', {action, object, property, role}
  );
};

/*
  Define a function that handles the deletion of a power and returns a promise
  resolvable with the deleted power’s ID if the requester is authorized to
  delete the power, or returns a promise rejectable with false if not.
*/
const _delete = (requester, power) => {
  return modelQueries._delete(requester, 'power', power);
};

/*
  Define a function that handles the update of a property of a power and
  returns a promise resolvable with the updated power’s ID if the requester
  is authorized to update that property of that power, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, power, property, value) => {
  return modelQueries._update(requester, 'power', power, property, value);
};

module.exports = {_create, _delete, _update};
