const db = require('./db').db;

const getStatus = memberID => {
  return db.oneOrNone(`SELECT status FROM member WHERE id = ${memberID}`);
};

const hasTablePermission = (doer, agentType, relation, ownRow) => {
  return db.oneOrNone(`
    SELECT relation FROM ${agentType}
    WHERE (relation = ${relation} AND (
      status = ${getStatus(doer)} OR (ownRow AND status = 0)
    )
  `);
};

const hasColPermission = (doer, agentType, relation, col, ownRow) => {
  return db.oneOrNone(`
    SELECT relation FROM ${agentType}
    WHERE (relation = ${relation} AND col = ${col} AND (
      status = ${getStatus(doer)} OR (ownRow AND status = 0)
    )
  `);
};

module.exports = {getStatus, hasTablePermission, hasColPermission};
