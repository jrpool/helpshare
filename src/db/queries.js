const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;
const schema = require('./schema').getSchema();

/*
  Define a function that returns a query inserting values into a table.
  Require the count of values to be equal to the count of non-ID columns
  and assume they are given in the table’s column order. Make the query
  return the ID of the inserted row, if the table has an ID column, or
  otherwise return nothing.
*/
const getInsertQuery = (table, values) => {
  const allCols = Object.keys(schema.tables[table]);
  const cols = allCols.filter(value => value !== 'id');
  if (values.length === cols.length) {
    const colList = cols.join(', ');
    const paramList = cols.map((v, index) => `$${index + 1}`).join(', ');
    const returnClause = allCols.includes('id') ? ' RETURNING id' : '';
    return new PQ(
      `INSERT INTO ${table} (${colList}) VALUES (${paramList})${returnClause}`,
      values
    );
  }
  else {
    const error = new Error('Wrong value count.');
    error.detail = `${values.length}, but should be ${cols.length}.`;
    throw error;
  }
};

/*
  Define a function that submits an insertion query returning an ID, logs it,
  and returns a promise resolvable with that ID. The query may be a string
  or a parameterized query object.
*/
const insertAndGetID = (requester, query) => {
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
  Define a function that submits an insertion query returning nothing,
  logs it, and returns a promise resolvable with true. The query may be
  a string or a parameterized query object.
*/
const insert = (requester, query) => {
  return db.task(context => {
    return context.none(query)
    .then(() => {
      return context.none(log.getQueryQuery(requester, query));
    });
  })
  .then(() => true)
  .catch(error => error);
};

module.exports = {insertAndGetID, getInsertQuery, insert};
