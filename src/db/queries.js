const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns a ParameterizedQuery object that will select
  all rows from a table and return an array of row objects.
*/
const getSelectAllQuery = table => `SELECT * FROM ${table}`;

/*
  Define a function that returns a ParameterizedQuery object that will select
  1 row from a table and return a row object.
*/
const getSelect1RowQuery = (table, id) => new PQ(
  `SELECT * FROM ${table} where id = $1`, [id]
);

/*
  Define a function that returns a ParameterizedQuery object that will select
  the ID column and 1 other column from a table and return an array of row
  objects.
*/
const getSelect1ColQuery = (table, col) => `SELECT id, ${col} FROM ${table}`;

/*
  Define a function that returns a ParameterizedQuery object that will insert a
  row into a table and return an array of 1 row object containing the new row.
*/
const getInsert1RowQuery = (table, specs) => {
  const cols = Object.keys(specs);
  const vals = cols.map(col => specs[col]);
  const colList = cols.join(', ');
  const paramList = cols.map((v, index) => `$${index + 1}`).join(', ');
  return new PQ(
    `INSERT INTO ${table} (${colList}) VALUES (${paramList}) RETURNING *`,
    vals
  );
};

/*
  Define a function that returns a ParameterizedQuery object that will delete
  a row from a table and return an array of 1 row object containing the
  deleted row.
*/
const getDelete1RowQuery = (table, id) => new PQ(
  `DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]
);

/*
  Define a function that returns a ParameterizedQuery object that will update
  a column of a row in a table and return an array of 1 row object containing
  the updated row.
*/
const getUpdate1ValueQuery = (table, id, col, value) => {
  return new PQ(
    `UPDATE ${table} SET ${col} = $1 WHERE id = $2 RETURNING *`, [value, id]
  );
};

/*
  Define a function that submits a query designed to return 1 row and returns
  the row as a promise’s resolution value.
*/
const submit1 = query => {
  return db.one(query)
  .catch(error => {
    return error;
  });
};

/*
  Define a function that submits a query designed to return 1 row, logs it,
  and returns the row as a promise’s resolution value.
*/
const submit1AndLog = (requester, query) => {
  return db.task(context => {
    return context.one(query)
    .then(resultRow => {
      return context.none(log.getQuery(requester, query))
      .then(() => resultRow);
    });
  })
  .catch(error => {
    return error;
  });
};

/*
  Define a function that submits a query designed to return a set of rows and
  returns an array of the rows as a promise’s resolution value.
*/
const submitAll = query => {
  return db.manyOrNone(query)
  .then(resultRows => {
    return resultRows;
  })
  .catch(error => error);
};

/*
  Define a function that submits a query designed to return a set of rows,
  logs it, and returns an array of the rows as a promise’s resolution value.
*/
const submitAllAndLog = (requester, query) => {
  return db.task(context => {
    return context.manyOrNone(query)
    .then(resultRows => {
      return context.none(log.getQuery(requester, query))
      .then(() => resultRows);
    });
  })
  .catch(error => error);
};

module.exports = {
  getSelectAllQuery, getSelect1RowQuery, getSelect1ColQuery,
  getInsert1RowQuery, getDelete1RowQuery, getUpdate1ValueQuery,
  submit1, submit1AndLog, submitAll, submitAllAndLog
};
