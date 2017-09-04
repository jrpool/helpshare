const PQ = require('pg-promise').ParameterizedQuery;

// Define a function that returns the log query for a query.
const getLogQuery = (member, query) => {
  const text
    = 'INSERT INTO log VALUES ('
    + `DEFAULT, CURRENT_TIMESTAMP, ${member}, 'q', $1, $2`
    + ')';
  const values = typeof query === 'string'
    ? [query, null]
    : [query.text.replace(/[\n ]+/g, ' '), query.values.toString()];
  return new PQ(text, values);
};

module.exports = {getLogQuery};
