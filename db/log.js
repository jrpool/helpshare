const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns an array of parameterized query objects
  for the creation of log entries for a row insertion or deletion.
*/
const getRowQueries = (tx, doer, table, id, colValues, isInsertion) => {
  const lastParams = isInsertion ? 'null, $5' : '$5, null';
  return Object.keys(colValues).map(col => {
    const text = `
      INSERT INTO change
      VALUES (default, CURRENT_TIME, $1, $2, $3, $4, ${lastParams})
    `;
    const params = [doer, table, id, col, colValues[col]];
    return tx.none(new PQ(text, params));
  });
};

/*
  Define a function that returns an array of parameterized query objects
  for the creation of log entries for a single-row, single-column update.
*/
const getUpdateQuery = (tx, doer, table, id, col, oldValue, newValue) => {
  const text = `
    INSERT INTO change
    VALUES (default, CURRENT_TIME, $1, $2, $3, $4, $5, $6)
  `;
  const params = [doer, table, id, col, oldValue, newValue];
  return tx.none(new PQ(text, params));
};

module.exports = {getRowQueries, getUpdateQuery};
