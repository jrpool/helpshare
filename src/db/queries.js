const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns a query inserting a row into a table and
  returning the ID of the new row.
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
  returning 1 if deleted or 0 if not.
*/
const getDeleteQuery = (table, id) => new PQ(
  `DELETE FROM ${table} WHERE id = $1 RETURNING id`, [id]
);

/*
  Define a function that submits an insertion query returning an ID, logs it,
  and returns a promise resolvable with that ID. The query may be a string
  or a parameterized query object.
*/
const insert = (requester, query) => {
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

/*
  Define a function that submits a deletion query, logs it, and returns
  a promise resolvable with the query result. The query may be a string
  or a parameterized query object.
*/
const del = (requester, query) => {
  return db.task(context => {
    return context.any(query)
    .then(resultRows => {
      return context.none(log.getQueryQuery(requester, query))
      .then(() => resultRows);
    });
  })
  .catch(error => {
    return error;
  });
};

module.exports = {del, getDeleteQuery, getInsertQuery, insert};
