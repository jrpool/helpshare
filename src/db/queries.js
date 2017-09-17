const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns a query inserting a row into a table and
  returning an array of row objects containing the IDs of the new rows.
*/
const getInsertQuery = (table, args) => {
  const cols = Object.keys(args);
  const vals = cols.map(col => args[col]);
  const colList = cols.join(', ');
  const paramList = cols.map((v, index) => `$${index + 1}`).join(', ');
  return new PQ(
    `INSERT INTO ${table} (${colList}) VALUES (${paramList}) RETURNING id`,
    vals
  );
};

/*
  Define a function that returns a query deleting a row from a table and
  returning an array of row objects containing the IDs of the deleted rows.
*/
const getDeleteQuery = (table, id) => new PQ(
  `DELETE FROM ${table} WHERE id = $1 RETURNING id`, [id]
);

/*
  Define a function that returns a query updating a column of a row in a
  table and returning an array of row objects containing the IDs of the
  updated rows.
*/
const getUpdateQuery = (table, row, col, value) => {
  return new PQ(
    `UPDATE ${table} SET ${col} = $1 WHERE id = $2 RETURNING id`,
    [value, row]
  );
};

/*
  Define a function that submits a query, logs it, and returns a promise resolvable with the ID of the affected row, or rejectable with a reason
  if the count of affected rows is not 1. The query may be a string or a
  parameterized query object.
*/
const submit = (requester, query) => {
  return db.task(context => {
    return context.one(query)
    .then(idRow => {
      return context.none(log.getQueryQuery(requester, query))
      .then(() => idRow.id);
    });
  })
  .catch(error => {
    return error;
  });
};

module.exports = {
  getDeleteQuery, getInsertQuery, getUpdateQuery, submit
};
