// const db = require('./db').db;
//
// const insertRecord = (doer, tableName, values) => {
//   db.none(
//     `
//       INSERT INTO ${tableName} VALUES ($1, $2, $3, $4) RETURNING id
//     `, [values]
//   )
//   .then(idRow => {
//     db.logCreation(doer, 'member', idRow.id, [
//       'fullname', 'handle', 'phase', 'status'
//     ]);
//   })
//   .catch(error => error);
// };
//
// module.exports = {insertRecord};
