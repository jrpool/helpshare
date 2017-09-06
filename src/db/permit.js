const db = require('./db').db;

const getRole = memberID => {
  return db.oneOrNone(`SELECT role FROM member WHERE id = ${memberID}`);
};

const hasTablePermission = (requester, agentType, table, ownRow) => {
  return db.oneOrNone(`
    SELECT relation FROM ${agentType}
    WHERE (relation = ${table} AND (
      status = ${getRole(requester)} OR (${ownRow} AND role = 0)
    )
  `);
};

const hasColPermission = (requester, agentType, table, col, ownRow) => {
  return db.oneOrNone(`
    SELECT relation FROM ${agentType}
    WHERE (relation = ${table} AND col = ${col} AND (
      role = ${getRole(requester)} OR (${ownRow} AND role = 0)
    )
  `);
};

module.exports = {getRole, hasTablePermission, hasColPermission};
