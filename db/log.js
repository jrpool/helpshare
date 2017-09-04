const PQ = require('pg-promise').ParameterizedQuery;

// Define a function that returns the log query for a query.
const getLogQuery = (member, query) => {
  return new PQ(
    'INSERT INTO log VALUES (DEFAULT, CURRENT_TIMESTAMP(1), $1, 1, $2)',
    [member, typeof query === 'string' ? query : query.text + ' [' + query.values + ']']
  );
};

module.exports = {getLogQuery};
