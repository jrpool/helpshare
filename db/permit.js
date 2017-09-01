// const db = require('./db').db;
//
// const getStatusName = memberID => {
//   return db.oneOrNone(`
//     SELECT status.description FROM member, status
//     WHERE id = ${memberID} AND status.id = member.status
//     `);
// };
//
// const hasPermission = (doer, operation, relname, col) => {
//   getStatusName(doer)
//   .then(statusName => {
//     if (statusName) {
//
//     }
//   })
//   .catch();
// };
//
// module.exports = {createMember, createPhase, createStatus};
