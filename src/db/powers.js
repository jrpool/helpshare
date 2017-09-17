const db = require('./db').db;
const PQ = require('pg-promise').ParameterizedQuery;

// /*
//   Define a function that returns whether a requester has a power over a column
//   of a table, given whether the target is 1 row that has a member column with
//   the requester as its value.
// */
// const hasCol = (requester, action, table, col, isOwn) => {
//   const pq = new PQ(
//     `
//       SELECT COUNT(power.id) > 0 AS has_power
//       FROM power, member, badge
//       WHERE power.action = $1
//       AND power.object = $2
//       AND power.property = $3
//       AND member.id = $4
//       AND (
//         ($5 AND power.role IS NULL)
//         OR (badge.role = power.role AND member.id = badge.member)
//       )
//     `,
//     [action, table, col, requester, isOwn]
//   );
//   return db.one(pq);
// };
//
// /*
//   Define a function that returns whether a member has a power over a row
//   of a table, given whether the row is the member’s own.
// */
// const hasRow = (requester, action, table, isOwn) => {
//   const pq = new PQ(
//     `
//       SELECT COUNT(power.id) > 0 AS has_power
//       FROM action, power, member, badge
//       WHERE power.action = $1
//       AND power.object = $2
//       AND member.id = $3
//       AND (
//         ($4 AND power.role IS NULL)
//         OR (badge.role = power.role AND member.id = badge.member)
//       )
//     `,
//     [action, table, requester, isOwn]
//   );
//   return db.one(pq);
// };
//

// Define a function that returns the ID of an action.
const actionID = actionName => {
  const actionIDs = {
    _create: 1,
    _delete: 2,
    _update: 3,
    _read: 4
  };
  return actionIDs[actionName];
};

// Define a function that returns the name of the member column of a table.
const memberCol = table => {
  const memberCols = {
    member: 'id',
    badge: 'member',
    claim: 'member',
    call: 'member',
    offer: 'member',
    report: 'member'
  };
  return memberCols[table];
};

/*
  Define a function that returns whether a member has the power to insert
  a row into a table. The power may arise from a role of the member or from
  the member’s ID being the value of the member column of the row to be
  inserted.
*/
const _insert = (requester, table, args) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.id) > 0 AS has_power
      FROM power, member, badge
      WHERE power.action = $1
      AND power.object = $2
      AND member.id = $3
      AND (
        (power.role IS NULL AND $4)
        OR (badge.role = power.role AND badge.member = $3)
      )
    `,
    [actionID(_insert), table, requester, args[memberCol(table)] === requester]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has the power to delete
  a row from a table. The power may arise from a role of the member or from
  the member’s ID being the value of the member column of the row to be
  deleted.
*/
const _delete = (requester, table, id) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.id) > 0 AS has_power
      FROM power, member, badge, ${table}
      WHERE power.action = $1
      AND power.object = $2
      AND member.id = $3
      AND (
        (power.role IS NULL AND ${table}.id = $4 AND ${table}.$5 = $3)
        OR (badge.role = power.role AND badge.member = $3)
      )
    `,
    [actionID(_delete), table, requester, id, memberCol(table)]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a requester has the power to update
  a column of a row of a table. The power may arise from a role of the member
  or from the member’s ID being the value of the member column of the row to
  be updated.
*/
const _update = (requester, table, col, id) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.id) > 0 AS has_power
      FROM power, member, badge, ${table}
      WHERE power.action = $1
      AND power.object = $2
      AND power.property = $3
      AND member.id = $4
      AND (
        (power.role IS NULL AND ${table}.id = $5 AND ${table}.$6 = $4)
        OR (badge.role = power.role AND badge.member = $4)
      )
    `,
    [actionID(_update), table, col, requester, id, memberCol(table)]
  );
  return db.one(pq);
};

module.exports = {actionID, _delete, _insert, _update};
