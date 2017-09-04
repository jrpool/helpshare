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
      return log.getLogQuery(member, query);
    });
    finalQueries.push(...logQueries);
  }
  return db.tx(context => {
    const promises = [];
    for (const query of finalQueries) {
      promises.push(context.none(query));
    }
    context.batch(promises);
  })
  .then(() => {
    db.$pool.end();
    console.log('Queries completed.');
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error: ' + error);
    return error;
  });
};

module.exports = {batchSubmit};
