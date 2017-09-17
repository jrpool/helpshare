const PQ = require('pg-promise').ParameterizedQuery;

// Define a function to consolidate whitespace in a string.
const compact = string => string.replace(/[\n ]+/g, ' ');

/*
  Define a function that returns the log query, in the form of a
  parameterizedQuery object, for a query.
  Preconditions:
    0. The genre for query log entries has ID 1.
    1. query is either a string or a parameterizedQuery object.
*/
const getQuery = (member, query) => {
  const text
    = 'INSERT INTO log VALUES (DEFAULT, CURRENT_TIMESTAMP, $1, $2, $3)';
  const values = typeof query === 'string'
    ? [member, compact(query), null]
    : [member, compact(query.text), JSON.stringify(query.values)];
  return new PQ(text, values);
};

module.exports = {getQuery};
