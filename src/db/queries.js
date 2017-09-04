const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that makes, and optionally logs, a batch of queries
  returning no result within a transaction. Each query may be a string
  or a parameterized query object.
*/
const batchSubmit = (member, queries, areLogged) => {
  const finalQueries = queries.slice();
  if (areLogged) {
    const logQueries = queries.map(query => {
      return log.getQueryQuery(member, query);
    });
    finalQueries.push(...logQueries);
  }
  return db.tx(context => {
    const promises = [];
    for (const query of finalQueries) {
      promises.push(context.none(query));
    }
    return context.batch(promises);
  })
  .then(results => {
    db.$pool.end();
    console.log(`Query batch (size ${results.length}) submitted.`);
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error (batchSubmit): ' + error);
  });
};

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
      context.none(log.getQueryQuery(member, query));
      return idRow.id;
    })
    .then(id => {
      db.$pool.end();
      console.log('Insertion submitted and logged.');
      console.log('New row has ID ' + id + '.');
      return id;
    })
    .catch(error => {
      db.$pool.end();
      console.log('Error (insert.tx): ' + error);
    });
  });
};

module.exports = {batchSubmit, getInsertQuery, insert};
