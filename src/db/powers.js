const db = require('./db').db;
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns whether a member has a column power (i.e.
  (change_col or read_col) over a column of a table, given whether the row
  is the member’s own.
*/
const hasCol = (requester, power, table, col, isOwn) => {
  const powerTable = `${power}_col`;
  const pq = new PQ(
    `
      SELECT COUNT(${powerTable}.relation) > 0 AS has_power
      FROM ${powerTable}, member, roleplay
      WHERE ${powerTable}.relation = $1
      AND ${powerTable}.col = $2
      AND member.id = $3
      AND (
        ($4 AND ${powerTable}.role = 0)
        OR (roleplay.role = ${powerTable}.role AND member.id = roleplay.member)
      )
    `,
    [table, col, requester, isOwn]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has a row power (i.e.
  add_row or kill_row) over a table, given whether the row is the member’s
  own.
*/
const hasRow = (requester, power, table, isOwn) => {
  const powerTable = `${power}_row`;
  const pq = new PQ(
    `
      SELECT COUNT(${powerTable}.relation) > 0 AS has_power
      FROM ${powerTable}, member
      WHERE ${powerTable}.relation = $1
      AND member.id = $2
      AND (
        ($3 AND ${powerTable}.role = 0)
        OR (roleplay.role = ${powerTable}.role AND member.id = roleplay.member)
      )
    `,
    [table, requester, isOwn]
  );
  return db.one(pq);
};

module.exports = {hasRow, hasCol};
