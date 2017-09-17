const modelQueries = require('../model/queries');

/*
  Define a function that handles the creation of a report and returns a promise
  resolvable with the new report’s ID if the requester is authorized to create
  a report, or returns a promise rejectable with false if not.
*/
const _create = (requester, offer, member, rating, comment) => {
  return modelQueries._create(
    requester, 'report', {offer, member, rating, comment}
  );
};

/*
  Define a function that handles the deletion of a report and returns a promise
  resolvable with the deleted report’s ID if the requester is authorized to
  delete the report, or returns a promise rejectable with false if not.
*/
const _delete = (requester, report) => {
  return modelQueries._delete(requester, 'report', report);
};

/*
  Define a function that handles the update of a property of a report and
  returns a promise resolvable with the updated report’s ID if the requester
  is authorized to update that property of that report, or returns a promise
  rejectable with false if not.
*/
const _update = (requester, report, property, value) => {
  return modelQueries._update(requester, 'report', report, property, value);
};

module.exports = {_create, _delete, _update};
