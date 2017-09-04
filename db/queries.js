const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that makes a batch of queries returning no result within
  a transaction. Each query may be a string or a parameterized query object.
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

/*
  Define a function that makes a batch of queries within a transaction. Each
  query may be a string or a parameterized query object.
*/
const submit = (queries) => {
  return db.tx(context => {
    const promises = [];
    for (const query of queries) {
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

/*
  Define a bad function that inserts a row into a table and logs the insertion,
  all within a transaction.
*/
const badinsert = (doer, table, colValues) => {
  const cols = Object.keys(colValues);
  const params = cols.map(col => colValues[col]);
  const colList = cols.join(', ');
  const paramList = params.map((value, index) => '$' + (index + 1)).join(', ');
  const text
    = `INSERT INTO ${table} (${colList}) VALUES (${paramList}) RETURNING id`;
  return db.tx(tx => {
    tx.one(new PQ(text, params))
    .then(idRow => {
      const id = idRow.id;
      const logQueries
        = log.getRowQueries(tx, doer, table, id, colValues, true);
      return tx.batch(logQueries);
    })
    .catch(error => {
      db.$pool.end();
      console.log('Error 1: ' + error);
      throw 1;
    });
  })
  .then(() => {
    db.$pool.end();
    console.log('Insertion completed and logged.');
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error 2: ' + error);
    throw 2;
  });
};

/*
  Define a function that inserts a row into a table and logs the insertion,
  all within a transaction.
*/
const insert = (doer, table, colValues) => {
  const cols = Object.keys(colValues);
  const params = cols.map(col => colValues[col]);
  const colList = cols.join(', ');
  const paramList = params.map((value, index) => '$' + (index + 1)).join(', ');
  const text
    = `INSERT INTO ${table} (${colList}) VALUES (${paramList}) RETURNING id`;
  return db.tx(tx => {
    tx.one(new PQ(text, params))
    .then(idRow => {
      const id = idRow.id;
      const logQueries
        = log.getRowQueries(tx, doer, table, id, colValues, true);
      return tx.batch(logQueries);
    })
    .catch(error => {
      db.$pool.end();
      console.log('Error 1: ' + error);
      throw 1;
    });
  })
  .then(() => {
    db.$pool.end();
    console.log('Insertion completed and logged.');
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error 2: ' + error);
    throw 2;
  });
};

/*
  Define a test function for transactions.
*/
const test = () => {
  return db.tx(tx => {
    return tx.one(
      'INSERT INTO member (fullname, handle, phase, role) '
      + 'VALUES ($1, $2, $3, $4) RETURNING id',
      ['Temporary Manager', 'tempmgr', 1, 1]
    )
    .then(id => {
      const batchResult = tx.batch([
        tx.none(
          'INSERT INTO phase (description) VALUES ($1)',
          ['staff']
        ),
        tx.none(
          'INSERT INTO role (description) VALUES ($1)',
          ['superuser']
        )
      ]);
      db.$pool.end();
      return batchResult;
    })
    .catch(error => {
      db.$pool.end();
      console.log('Error 1: ' + error);
      throw 1;
    });
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error 2: ' + error);
    throw 2;
  });
};

module.exports = {badinsert, insert, submit, test};
