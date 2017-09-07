const db = require('./db').db;
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns a record if a member has a column right
  over a table, or null if not, given whether the row is the member’s own.
*/
const hasCol = (requester, agent, table, col, isOwn) => {
  const pq = new PQ(
    `
      SELECT ${agent}.relation FROM ${agent}, member
      WHERE ${agent}.relation = $1
      AND ${agent}.col = $2
      AND member.id = $3 AND (
        ${agent}.role = member.role OR ($4 AND ${agent}.role = 0)
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
const hasRow = (requester, agent, table, isOwn) => {
  const pq = new PQ(
    `
      SELECT ${agent}.relation FROM ${agent}, member
      WHERE ${agent}.relation = $1 AND member.id = $2 AND (
        ${agent}.role = member.role OR ($3 AND ${agent}.role = 0)
      )
    `,
    [table, requester, isOwn]
  );
  return db.oneOrNone(pq);
};

module.exports = {hasRow, hasCol};
