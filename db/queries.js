const db = require('./db').db;
const log = require('./log');

// Define a function that makes a set of queries to the database.
const submitQueries = (db, queries) => {
  db.tx(context => {
    const promises = [];
    for (const query of queries) {
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
    console.log('Error: ' + error);
  });
};

const insert = (doer, relation, values) => {
  db.none(
    `INSERT INTO ${relation} VALUES (${values.join(', ')}) RETURNING idRow`
  )
  .then(idRow => {
    for (const col of Object.keys(values)) {
      log.insert(doer, relation, idRow.id, col, values[col]);
    }
    return '';
  })
  .catch(error => error);
};

module.exports = {insert, submitQueries};
