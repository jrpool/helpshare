const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

// Define a function that returns an insertion query with ID returned.
const getInsertQuery = (table, cols, values) => {
  const colList = cols.join(', ');
  const paramList = values.map((v, index) => '$' + (index + 1)).join(', ');
  return new PQ(
    `INSERT INTO ${table} (${colList}) VALUES (${paramList}) RETURNING id`,
    values
  );
};

/*
  Define a function that submits an insertion query that returns the ID of
  the inserted row, logs it, and returns a promise resolvable with that ID.
  The query may be a string or a parameterized query object.
*/
const insert = (member, query) => {
  return db.tx(context => {
    return context.one(query)
    .then(idRow => {
      console.log('About to submit log query.');
      context.none(log.getQueryQuery(member, query));
      return idRow.id;
    })
    .then(id => {
      console.log('Insertion submitted and logged.');
      console.log('New row has ID ' + id + '.');
      return id;
    })
    .catch(error => {
      console.log('Error (insert.tx): ' + error);
    });
  });
};

module.exports = {getInsertQuery, insert};
