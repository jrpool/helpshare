const db = require('./db').db;
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns a record if a member has a column right
  over a table, or null if not, given whether the row is the member’s own.
*/
const hasCol = (requester, power, table, col, isOwn) => {
  const pq = new PQ(
    `
      SELECT ${power}.relation FROM ${power}, member
      WHERE ${power}.relation = $1
      AND ${power}.col = $2
      AND member.id = $3 AND (
        ${power}.role = member.role OR ($4 AND ${power}.role = 0)
      )
    `,
    [table, col, requester, isOwn]
  );
  return db.oneOrNone(pq);
};

/*
  Define a function that returns a record if a member has a row right over
  a table, or null if not, given whether the row is the member’s own.
*/
const hasRow = (requester, power, table, isOwn) => {
  const pq = new PQ(
    `
      SELECT ${power}.relation FROM ${power}, member
      WHERE ${power}.relation = $1 AND member.id = $2 AND (
        ${power}.role = member.role OR ($3 AND ${power}.role = 0)
      )
    `,
    [table, requester, isOwn]
  );
  return db.oneOrNone(pq);
};

module.exports = {hasRow, hasCol};
