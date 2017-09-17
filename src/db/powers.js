const db = require('./db').db;
const PQ = require('pg-promise').ParameterizedQuery;

/*
  Define a function that returns whether a member has a power over a column
  of a table, given whether the row is the member’s own.
*/
const hasCol = (requester, action, object, property, isOwn) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.${object}) > 0 AS has_power
      FROM power, member, roleplay
      WHERE power.object = $1
      AND power.property = $2
      AND member.id = $3
      AND (
        ($4 AND power.role IS NULL)
        OR (roleplay.role = power.role AND member.id = roleplay.member)
      )
    `,
    [object, property, requester, isOwn]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has a power over a row
  of a table, given whether the row is the member’s own.
*/
const hasRow = (requester, action, object, isOwn) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.${object}) > 0 AS has_power
      FROM power, member, roleplay
      WHERE power.object = $1
      AND member.id = $2
      AND (
        ($3 AND power.role IS NULL)
        OR (roleplay.role = power.role AND member.id = roleplay.member)
      )
    `,
    [object, requester, isOwn]
  );
  return db.one(pq);
};

module.exports = {hasCol, hasRow};
