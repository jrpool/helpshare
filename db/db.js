const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/helpshare';
const db = pgp(connectionString);

const getStatusName = memberID => {
  return db.oneOrNone(`
    SELECT status.description FROM member, status
    WHERE id = ${memberID} AND status.id = member.status
    `);
};

const logChange = (doer, relname, id, changes) => {
  const lists = [];
  for (const change of changes) {
    lists.push(`(
      CURRENT_TIME, ${doer}, '${relname}', ${id},
      '${change.colname}', '${change.old}', '${change.new}'
    )`);
  }
  const query = `
    INSERT INTO change (time, member, relname, row, colname, old, new)
    VALUES ${lists.join(', ')}
  `;
  return db.none(query);
};

const logCreation = (doer, relname, id, object, colnames) => {
  const changes = [];
  for (const colname of colnames) {
    changes.push({colname: colname, old: null, new: object[colname]});
  }
  return logChange(doer, relname, id, changes);
};

module.exports = {db, getStatusName, logChange, logCreation};
