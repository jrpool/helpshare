const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a simple object and returns
  a promise resolvable with the new object’s ID if the requester is authorized
  to create such an object, or returns a promise rejectable with false if not.
*/
const _create = (requester, objectType, description) => {
  return modelQueries._create(requester, objectType, {description});
};

/*
  Define a function that handles the deletion of a simple object and returns
  a promise resolvable with the deleted object’s ID if the requester is
  authorized to delete the object, or returns a promise rejectable with false
  if not.
*/
const _delete = (requester, objectType, object) => {
  return modelQueries._delete(requester, objectType, object);
};

/*
  Define a function that handles the update of a property of a simple object
  and returns a promise resolvable with the updated object’s ID if the
  requester is authorized to update that property of that object, or returns
  a promise rejectable with false if not.
*/
const _update = (requester, objectType, object, property, value) => {
  return modelQueries._update(requester, objectType, object, property, value);
};

module.exports = {_create, _delete, _update};
