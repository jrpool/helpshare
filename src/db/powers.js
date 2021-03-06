const db = require('./db').db;
const PQ = require('pg-promise').ParameterizedQuery;

// Define a function that returns the ID of an action.
const actionID = actionName => {
  const actionIDs = {
    insert: 1,
    delete: 2,
    update: 3,
    select: 4
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
    report: 'member',
    log: 'member'
  };
  return memberCols[table];
};

/*
  Define a function that returns whether a member has the column-agnostic
  power to select all rows of a table, as a promise’s resolution value.
*/
const selectAll = (requester, table) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.id) > 0 AS has_power
      FROM power, badge
      WHERE power.action = $1
      AND power.object = $2
      AND power.property IS NULL
      AND badge.role = power.role
      AND badge.member = $3
    `,
    [actionID('select'), table, requester]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has the column-agnostic
  power to select 1 row of a table, as a promise’s resolution value.
*/
const select1Row = (requester, table, id) => {
  const memberColName = memberCol(table);
  const queryOptions = {
    elseClause: 'false', values: [actionID('select'), table, requester]
  };
  if (memberColName) {
    queryOptions.elseClause = `(
      SELECT COUNT(power.id) > 0
      FROM power, badge, ${table}
      WHERE power.action = $1
      AND power.object = $2
      AND power.property IS NULL
      AND power.role IS NULL
      AND ${table}.${memberColName} = $3
      AND ${table}.id = $4
    )`;
    queryOptions.values.push(id);
  }
  const pq = new PQ(
    `
      SELECT
        CASE WHEN (
          SELECT COUNT(power.id) > 0
          FROM power, badge
          WHERE power.action = $1
          AND power.object = $2
          AND power.property IS NULL
          AND badge.role = power.role
          AND badge.member = $3
        ) THEN
          true
        ELSE
          ${queryOptions.elseClause}
        END
      AS has_power
    `,
    queryOptions.values
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has the column-agnostic
  or column-specific power to select 1 column of all rows of a table, as
  a promise’s resolution value.
*/
const select1Col = (requester, table, col) => {
  const pq = new PQ(
    `
      SELECT COUNT(power.id) > 0 AS has_power
      FROM power, badge
      WHERE power.action = $1
      AND power.object = $2
      AND (
        power.property = $3
        OR power.property IS NULL
      )
      AND badge.role = power.role
      AND badge.member = $4
    `,
    [actionID('select'), table, col, requester]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has the column-agnostic
  power to insert rows into a table, as a promise’s resolution value.
*/
const insertRows = (requester, table, specs) => {
  const memberSpec = specs[memberCol(table)];
  const elseClause = memberSpec ? `(
    SELECT COUNT(power.id) > 0
    FROM power, badge
    WHERE power.action = $1
    AND power.object = $2
    AND power.property IS NULL
    AND power.role IS NULL
    AND ${memberSpec} = $3
  )` : 'false';
  const pq = new PQ(
    `
    SELECT
      CASE WHEN (
        SELECT COUNT(power.id) > 0
        FROM power, badge
        WHERE power.action = $1
        AND power.object = $2
        AND power.property IS NULL
        AND badge.role = power.role
        AND badge.member = $3
      ) THEN
        true
      ELSE
        ${elseClause}
      END
    AS has_power
    `,
    [actionID('insert'), table, requester]
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a member has the power to delete
  a row from a table, as a promise’s resolution value.
*/
const delete1Row = (requester, table, id) => {
  const memberColName = memberCol(table);
  const queryOptions = {
    elseClause: 'false', values: [actionID('delete'), table, requester]
  };
  if (memberColName) {
    queryOptions.elseClause = `(
      SELECT COUNT(power.id) > 0
      FROM power, badge
      WHERE power.action = $1
      AND power.object = $2
      AND power.property IS NULL
      AND power.role IS NULL
      AND (
        SELECT COUNT(id) > 0
        FROM ${table}
        WHERE ${table}.${memberColName} = $3
        AND id = $4
      )
    )`;
    queryOptions.values.push(id);
  }
  const pq = new PQ(
    `
      SELECT
        CASE WHEN (
          SELECT COUNT(power.id) > 0
          FROM power, badge
          WHERE power.action = $1
          AND power.object = $2
          AND power.property IS NULL
          AND badge.role = power.role
          AND badge.member = $3
        ) THEN
          true
        ELSE
          ${queryOptions.elseClause}
        END
      AS has_power
    `,
    queryOptions.values
  );
  return db.one(pq);
};

/*
  Define a function that returns whether a requester has the column-agnostic
  or column-specific power to update a column of a row of a table, as a
  promise’s resolution value.
*/
const update1Value = (requester, table, id, col) => {
  const memberColName = memberCol(table);
  const queryOptions = {
    elseClause: 'false', values: [actionID('update'), table, col, requester]
  };
  if (memberColName) {
    queryOptions.elseClause = `(
      SELECT COUNT(power.id) > 0
      FROM power, badge
      WHERE power.action = $1
      AND power.object = $2
      AND (
        power.property = $3
        OR power.property IS NULL
      )
      AND power.role IS NULL
      AND (
        SELECT COUNT(id) > 0
        FROM ${table}
        WHERE ${table}.${memberColName} = $4
        AND id = $5
      )
    )`;
    queryOptions.values.push(id);
  }
  const pq = new PQ(
    `
      SELECT
        CASE WHEN (
          SELECT COUNT(power.id) > 0
          FROM power, badge
          WHERE power.action = $1
          AND power.object = $2
          AND (
            power.property = $3
            OR power.property IS NULL
          )
          AND badge.role = power.role
          AND badge.member = $4
        ) THEN
          true
        ELSE
          ${queryOptions.elseClause}
        END
      AS has_power
    `,
    queryOptions.values
  );
  return db.one(pq);
};

module.exports = {
  selectAll, select1Row, select1Col, insertRows, delete1Row, update1Value
};
