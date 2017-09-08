const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns the log query for a query.
  Precondition: the class for query log entries has ID 1.
*/
const getQueryQuery = (member, query) => {
  const text
    = `INSERT INTO log VALUES (DEFAULT, CURRENT_TIMESTAMP, $1, 1, $2, $3)`;
  const values = typeof query === 'string'
    ? [member, query, null]
    : [
      member,
      query.text.replace(/[\n ]+/g, ' '),
      JSON.stringify(query.values)
    ];
  return new PQ(text, values);
};

module.exports = {getQueryQuery};
