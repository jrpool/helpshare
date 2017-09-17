const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of an about and returns a promise
  resolvable with the new about’s ID if the requester is authorized to create
  an about, or returns a promise rejectable with false if not.
*/
const _create = (requester, skill, domain) => {
  return modelQueries._create(requester, 'about', {skill, domain});
};

/*
  Define a function that handles the deletion of an about and returns a promise
  resolvable with the deleted about’s ID if the requester is authorized to
  delete the about, or returns a promise rejectable with false if not.
*/
const _delete = (requester, about) => {
  return modelQueries._delete(requester, 'about', about);
};

/*
  Define a function that handles the update of a property of an about and
  returns a promise resolvable with the updated about’s ID if the requester
  is authorized to update that property of that about, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, about, property, value) => {
  return modelQueries._update(requester, 'about', about, property, value);
};

module.exports = {_create, _delete, _update};
