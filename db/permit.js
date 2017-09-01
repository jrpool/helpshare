const db = require('./db').db;

const getStatus = memberID => {
  return db.oneOrNone(`SELECT status FROM member WHERE id = ${memberID}`);
};

const getTablePermission = (doer, agentType, relation) => {
  return db.oneOrNone(`
    SELECT relation FROM ${agentType}
    WHERE relation = ${relation}
    AND (status = ${getStatus(doer)}
  `);
};

const getColPermission = (doer, agentType, relation, col) => {
  return db.oneOrNone(`
    SELECT relation FROM ${agentType}
    WHERE relation = ${relation}
    WHERE col = '${col}' `
    AND status = ${getStatusName(doer)}`
  `);
};

const hasPermission = (doer, operation, relation, col) => {
  getStatusName(doer)
  .then(statusName => {
    if (statusName) {
      if (col) {
      }
    }
  })
  .catch();
};

module.exports = {createMember, createPhase, createStatus};
