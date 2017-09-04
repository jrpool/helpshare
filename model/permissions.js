const db = require('./db').db;
const log = require('./log');

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
  .then(() => {
    db.$pool.end();
    console.log('Queries completed.');
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error (batchSubmit): ' + error);
  });
};

/*
  Define a function that makes, logs, and returns the result of an insertion
  query that returns the ID of the inserted row. The query may be a string
  or a parameterized query object.
*/
const insert = (member, query) => {
  return db.tx(context => {
    context.one(query)
    .then(newID => {
      context.none(log.getQueryQuery(member, query));
      return newID;
    })
    .then(newID => {
      db.$pool.end();
      console.log('Queries completed.');
      return newID;
    })
    .catch(error => {
      db.$pool.end();
      console.log('Error (insert): ' + error);
    });
  });
};

module.exports = {batchSubmit, insert};
